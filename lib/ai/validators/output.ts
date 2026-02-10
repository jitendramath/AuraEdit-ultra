/**

 * OUTPUT VALIDATOR

 * Ensures AI follows:

 * - One file only

 * - Correct file path

 * - Proper boundaries

 */

export type ValidatedFile = {

  filePath: string;

  content: string;

};

const FILE_PATH_REGEX = /^FILE_PATH:\s*(.+)$/m;

export function validatePerFileOutput(

  rawOutput: string,

  expectedFilePath: string

): ValidatedFile {

  if (!rawOutput || typeof rawOutput !== "string") {

    throw new Error("AI output is empty or invalid");

  }

  const pathMatch = rawOutput.match(FILE_PATH_REGEX);

  if (!pathMatch) {

    throw new Error("Missing FILE_PATH header");

  }

  const filePath = pathMatch[1].trim();

  if (filePath !== expectedFilePath) {

    throw new Error(

      `File path mismatch. Expected "${expectedFilePath}", got "${filePath}"`

    );

  }

  const beginIndex = rawOutput.indexOf("<BEGIN_FILE>");

  const endIndex = rawOutput.indexOf("<END_FILE>");

  if (beginIndex === -1 || endIndex === -1) {

    throw new Error("Missing <BEGIN_FILE> or <END_FILE> markers");

  }

  if (endIndex <= beginIndex) {

    throw new Error("Invalid file boundary order");

  }

  const content = rawOutput

    .slice(beginIndex + "<BEGIN_FILE>".length, endIndex)

    .trim();

  if (!content) {

    throw new Error("Generated file content is empty");

  }

  return {

    filePath,

    content

  };

}