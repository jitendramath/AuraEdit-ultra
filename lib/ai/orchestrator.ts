import { runGeminiCascade } from "./cascade";
import { buildPerFilePrompt } from "./prompts/per-file";
import { buildRecoveryPrompt } from "./prompts/recovery";
import { validatePerFileOutput } from "./validators/output";
import {
  BuildState,
  INITIAL_BUILD_STATE,
  transitionState,
  markFileCompleted,
  canRetry
} from "./state";
import { FileQueue } from "@/lib/project/fileQueue";
import { writeFileSafe, fileExists } from "@/lib/project/storage";
import {
  setBuildState,
  resetBuildState
} from "@/lib/project/runtimeState";

type OrchestratorConfig = {
  projectName: string;
  appGoal: string;
  techStack: string;
  folderTree: string;
  systemPrompt: string;
};

export class AIOrchestrator {
  private state: BuildState;
  private queue: FileQueue;
  private config: OrchestratorConfig;

  constructor(
    filesQueue: FileQueue,
    config: OrchestratorConfig
  ) {
    this.queue = filesQueue;
    this.config = config;
    this.state = {
      ...INITIAL_BUILD_STATE,
      remainingFiles: filesQueue.snapshot().map(f => f.path)
    };

    resetBuildState();
    setBuildState({
      status: "initializing",
      totalFiles: this.state.remainingFiles.length,
      completedFiles: 0,
      remainingFiles: this.state.remainingFiles.length
    });
  }

  async start() {
    this.state = transitionState(this.state, {
      phase: "INITIALIZING"
    });

    setBuildState({ status: "building" });

    while (!this.queue.isEmpty()) {
      const task = this.queue.next();
      if (!task) break;

      if (fileExists(task.path)) {
        this.state = markFileCompleted(this.state, task.path);
        this.syncRuntimeState();
        continue;
      }

      this.state = transitionState(this.state, {
        phase: "GENERATING_FILE",
        currentFile: task.path
      });

      try {
        await this.generateSingleFile(task.path, task.purpose);
        this.state = markFileCompleted(this.state, task.path);
        this.syncRuntimeState();
      } catch (err: any) {
        if (!canRetry(this.state)) {
          setBuildState({ status: "failed" });
          throw err;
        }

        this.state = transitionState(this.state, {
          phase: "RECOVERING",
          retries: this.state.retries + 1
        });

        setBuildState({ status: "recovering" });

        await this.recoverAndRetry(task.path, task.purpose);
        this.state = markFileCompleted(this.state, task.path);
        this.syncRuntimeState();
      }
    }

    setBuildState({ status: "completed" });
  }

  private syncRuntimeState() {
    setBuildState({
      completedFiles: this.state.completedFiles.length,
      remainingFiles: this.state.remainingFiles.length
    });
  }

  private async generateSingleFile(
    filePath: string,
    purpose: string
  ) {
    const prompt = buildPerFilePrompt({
      projectName: this.config.projectName,
      appGoal: this.config.appGoal,
      techStack: this.config.techStack,
      folderTree: this.config.folderTree,
      completedFiles: this.state.completedFiles,
      targetFilePath: filePath,
      filePurpose: purpose
    });

    const result = await runGeminiCascade(
      prompt,
      this.config.systemPrompt
    );

    const validated = validatePerFileOutput(
      result.text,
      filePath
    );

    writeFileSafe(validated.filePath, validated.content);
  }

  private async recoverAndRetry(
    filePath: string,
    purpose: string
  ) {
    const recoveryPrompt = buildRecoveryPrompt({
      projectName: this.config.projectName,
      appGoal: this.config.appGoal,
      techStack: this.config.techStack,
      folderTree: this.config.folderTree,
      completedFiles: this.state.completedFiles,
      remainingFiles: this.state.remainingFiles,
      lastSuccessfulFile:
        this.state.completedFiles[
          this.state.completedFiles.length - 1
        ]
    });

    const perFilePrompt = buildPerFilePrompt({
      projectName: this.config.projectName,
      appGoal: this.config.appGoal,
      techStack: this.config.techStack,
      folderTree: this.config.folderTree,
      completedFiles: this.state.completedFiles,
      targetFilePath: filePath,
      filePurpose: purpose
    });

    const combinedPrompt =
      recoveryPrompt + "\n\n" + perFilePrompt;

    const result = await runGeminiCascade(
      combinedPrompt,
      this.config.systemPrompt
    );

    const validated = validatePerFileOutput(
      result.text,
      filePath
    );

    writeFileSafe(validated.filePath, validated.content);
  }
      }
