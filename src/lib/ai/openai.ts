import { OpenAIModel, OpenAIPrompt } from "@/lib/ai/types";
import { calculateTokenCost } from "@/lib/ai/utils";
import serverEnv from "@/lib/env/serverEnv";
import OpenAI from "openai";
import { AutoParseableTextFormat } from "openai/lib/parser";

export const openai = new OpenAI({ apiKey: serverEnv.OPENAI_API_KEY });

export const createStructuredOutputResponse = async <T>(
    prompt: OpenAIPrompt,
    format: AutoParseableTextFormat<T>,
) => {

    const response = await openai.responses.parse({
        prompt: prompt,
        text: {
            format: format
        }
    });

    return response;



}