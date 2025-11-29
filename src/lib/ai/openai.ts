import { OpenAIModel } from "@/lib/ai/types";
import serverEnv from "@/lib/env/serverEnv";
import OpenAI from "openai";
import { AutoParseableTextFormat } from "openai/lib/parser";

export const openai = new OpenAI({ apiKey: serverEnv.OPENAI_API_KEY });

export const createStructuredOutputResponse = async <T>(
    model: OpenAIModel,
    prompt: string,
    format: AutoParseableTextFormat<T>,
) => {

    const response = await openai.responses.parse({
        model: model,
        input: prompt,
        text: {
            format: format
        }
    });

    if (!response.output_parsed) {
        throw new Error("No parsed output received from OpenAI");
    }
    

    return response.output_parsed;

}