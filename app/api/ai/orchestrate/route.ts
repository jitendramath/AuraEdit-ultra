import { NextResponse } from "next/server";
import { AIOrchestrator } from "@/lib/ai/orchestrator";
import { buildInitialQueue } from "@/lib/project/fileQueue";

/**
 * POST /api/ai/orchestrate
 * Starts AI build with a DEMO file list so users see instant results
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      projectName,
      appGoal,
      techStack
    } = body;

    if (!projectName || !appGoal || !techStack) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    // 🔥 DEMO FILE LIST (visible immediately)
    const demoFiles = [
      {
        path: "README.md",
        purpose: "Project overview, setup instructions, and description"
      },
      {
        path: "app/page.tsx",
        purpose: "Main landing page for the generated application"
      }
    ];

    const queue = buildInitialQueue(demoFiles);

    const orchestrator = new AIOrchestrator(queue, {
      projectName,
      appGoal,
      techStack,
      folderTree: `
/
├── app/
│   └── page.tsx
└── README.md
      `,
      systemPrompt:
        "You are AuraEdit AI. Follow the one-file-per-message rule strictly."
    });

    // Fire-and-forget build
    orchestrator.start().catch(err => {
      console.error("[AI BUILD FAILED]", err);
    });

    return NextResponse.json({
      status: "started",
      totalFiles: demoFiles.length
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to start AI build" },
      { status: 500 }
    );
  }
}
