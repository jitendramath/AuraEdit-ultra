import { NextResponse } from "next/server";

import { AIOrchestrator } from "@/lib/ai/orchestrator";

import { buildInitialQueue } from "@/lib/project/fileQueue";

/**

 * POST /api/ai/orchestrate

 * Starts a full AI project build

 */

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {

      projectName,

      appGoal,

      techStack,

      folderTree,

      files

    } = body;

    if (

      !projectName ||

      !appGoal ||

      !techStack ||

      !folderTree ||

      !Array.isArray(files)

    ) {

      return NextResponse.json(

        { error: "Invalid request payload" },

        { status: 400 }

      );

    }

    const queue = buildInitialQueue(files);

    const orchestrator = new AIOrchestrator(queue, {

      projectName,

      appGoal,

      techStack,

      folderTree,

      systemPrompt:

        "You are AuraEdit AI. Follow all rules strictly."

    });

    // Fire-and-forget style execution

    orchestrator.start().catch(err => {

      console.error("[AI BUILD FAILED]", err);

    });

    return NextResponse.json({

      status: "started",

      totalFiles: files.length

    });

  } catch (err: any) {

    console.error(err);

    return NextResponse.json(

      { error: "Failed to start AI build" },

      { status: 500 }

    );

  }

}