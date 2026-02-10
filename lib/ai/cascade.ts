import { GoogleGenerativeAI } from "@google/generative-ai";

/**

 * AI CASCADE CONFIG

 * - 5 API keys

 * - Primary + Backup model per key

 * - Deterministic failover

 */

type GeminiConfig = {

  id: string;

  apiKey: string;

  primaryModel: string;

  backupModel: string;

};

const GEMINI_CONFIGS: GeminiConfig[] = [

  {

    id: "KEY_1",

    apiKey: process.env.GEMINI_API_KEY_1!,

    primaryModel: process.env.GEMINI_PRIMARY_MODEL!,

    backupModel: process.env.GEMINI_BACKUP_MODEL!

  },

  {

    id: "KEY_2",

    apiKey: process.env.GEMINI_API_KEY_2!,

    primaryModel: process.env.GEMINI_PRIMARY_MODEL!,

    backupModel: process.env.GEMINI_BACKUP_MODEL!

  },

  {

    id: "KEY_3",

    apiKey: process.env.GEMINI_API_KEY_3!,

    primaryModel: process.env.GEMINI_PRIMARY_MODEL!,

    backupModel: process.env.GEMINI_BACKUP_MODEL!

  },

  {

    id: "KEY_4",

    apiKey: process.env.GEMINI_API_KEY_4!,

    primaryModel: process.env.GEMINI_PRIMARY_MODEL!,

    backupModel: process.env.GEMINI_BACKUP_MODEL!

  },

  {

    id: "KEY_5",

    apiKey: process.env.GEMINI_API_KEY_5!,

    primaryModel: process.env.GEMINI_PRIMARY_MODEL!,

    backupModel: process.env.GEMINI_BACKUP_MODEL!

  }

];

type CascadeResult = {

  text: string;

  modelId: string;

};

/**

 * Core cascade executor

 * Tries:

 *  KEY1(primary → backup) → KEY2(primary → backup) → ... → KEY5

 */

export async function runGeminiCascade(

  prompt: string,

  systemPrompt: string

): Promise<CascadeResult> {

  const maxRetries = Number(process.env.AI_MAX_RETRIES || 10);

  let attempts = 0;

  for (const config of GEMINI_CONFIGS) {

    if (!config.apiKey) continue;

    const genAI = new GoogleGenerativeAI(config.apiKey);

    // Try primary then backup

    const models = [config.primaryModel, config.backupModel];

    for (const modelName of models) {

      attempts++;

      if (attempts > maxRetries) {

        throw new Error("AI_MAX_RETRIES exceeded");

      }

      try {

        const model = genAI.getGenerativeModel({

          model: modelName,

          systemInstruction: systemPrompt

        });

        const result = await model.generateContent(prompt);

        const text =

          result.response.text()?.trim() ||

          "";

        if (!text) {

          throw new Error("Empty AI response");

        }

        return {

          text,

          modelId: `${config.id}:${modelName}`

        };

      } catch (err) {

        console.warn(

          `[AI CASCADE] Failed on ${config.id} → ${modelName}`,

          err

        );

        // silently continue to next model/key

      }

    }

  }

  throw new Error("All Gemini models failed in cascade");

}