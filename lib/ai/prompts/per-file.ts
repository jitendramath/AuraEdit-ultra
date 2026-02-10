/**

 * PER-FILE GENERATION PROMPT

 * RULE: ONE MESSAGE = ONE FILE

 * Any deviation = INVALID OUTPUT

 */

export function buildPerFilePrompt(params: {

  projectName: string;

  appGoal: string;

  techStack: string;

  folderTree: string;

  completedFiles: string[];

  targetFilePath: string;

  filePurpose: string;

}) {

  const {

    projectName,

    appGoal,

    techStack,

    folderTree,

    completedFiles,

    targetFilePath,

    filePurpose

  } = params;

  return `

YOU ARE A PRODUCTION-GRADE SOFTWARE ENGINEER.

PROJECT:

- Name: ${projectName}

- Goal: ${appGoal}

- Tech Stack: ${techStack}

IMPORTANT CONTEXT:

- This project is being generated FILE BY FILE.

- You must generate ONLY the requested file.

- Do NOT reference future files.

- Do NOT repeat completed files.

- Do NOT explain anything.

------------------------------------

PROJECT FOLDER STRUCTURE:

${folderTree}

------------------------------------

FILES ALREADY COMPLETED:

${completedFiles.length ? completedFiles.join("\n") : "NONE"}

------------------------------------

YOUR CURRENT TASK:

- Generate EXACTLY ONE FILE

- File path: ${targetFilePath}

- Purpose of this file:

  ${filePurpose}

------------------------------------

STRICT OUTPUT FORMAT (NO EXCEPTIONS):

FILE_PATH: ${targetFilePath}

<BEGIN_FILE>

[WRITE COMPLETE, PRODUCTION-READY CODE HERE]

<END_FILE>

------------------------------------

CRITICAL RULES:

- Do NOT add markdown

- Do NOT add comments outside the code

- Do NOT explain

- Do NOT generate multiple files

- If unsure, FAIL instead of guessing

START NOW.

`;

}