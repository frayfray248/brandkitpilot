import { BrandFramework } from "@/generated/prisma";
import { OPENAI_MODEL } from "@/lib/ai/const";
import { AIResponse, BrandKitInput, BrandKitOutput, OpenAIPrompt } from "@/lib/ai/types";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import z from "zod";
import { createStructuredOutputResponse } from "@/lib/ai/openai";
import { calculateTokenCost } from "@/lib/ai/utils";
import { createBrandKitPrompt } from "@/lib/ai/prompts";

// Creates dynamic Zod schema based on the framework's output sections
export const createBrandKitResponseSchema = (framework: BrandFramework) => {

    const sectionSchemas = framework.outputSections.reduce((acc, section) => {
        acc[section.title] = z.string().describe(section.description || section.title);
        return acc;
    }, {} as Record<string, z.ZodString>);

    return z.object({
        title: z.string().describe("The title of the brand kit"),
        sections: z.object(sectionSchemas)
    });

}

export const createBrandKitResponse = async (
    framework: BrandFramework,
    inputs: BrandKitInput[]
): Promise<AIResponse<BrandKitOutput>> => {

    // Validate inputs
    if (!inputs.length) {
        throw new Error("No inputs provided for brand kit generation");
    }

    if (!framework.outputSections.length) {
        throw new Error("Framework has no output sections defined");
    }

    const responseSchema = createBrandKitResponseSchema(framework);

    const prompt: OpenAIPrompt = createBrandKitPrompt({
        frameworkName: framework.name,
        context: framework.promptContext || "",
        outputSections: framework.outputSections.map(s => s.title).join(', '),
        userInputs: JSON.stringify(inputs),
    })

    console.log("Generating brand kit with prompt:", prompt);

    const format = zodTextFormat(responseSchema, "brand_kit");

    const model = OPENAI_MODEL;

    try {

        const response = await createStructuredOutputResponse<BrandKitOutput>(
            prompt,
            format
        );

        if (!response.output_parsed) {
            throw new Error("No parsed output received from OpenAI");
        }

        if (!response.usage) {
            throw new Error("No usage data received from OpenAI");
        }

        console.log("OpenAI Usage:", JSON.stringify(response.usage, null, 2));

        const cost = calculateTokenCost(
            model,
            response.usage.input_tokens,
            response.usage.input_tokens_details.cached_tokens,
            response.usage.output_tokens
        );

        console.log(`OpenAI Cost for this request: $${cost.toFixed(6)}`);

        return {
            output: response.output_parsed,
            cost
        }

    } catch (error) {
        console.error("OpenAI generation error:", error);
        throw new Error(`Failed to generate brand kit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}