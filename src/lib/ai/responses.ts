import { BrandFramework } from "@/generated/prisma";
import { OPENAI_MODEL } from "@/lib/ai/const";
import { createBrandKitPrompt } from "@/lib/ai/prompts";
import { BrandKitInput, BrandKitOutput } from "@/lib/ai/types";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import z from "zod";
import { createStructuredOutputResponse } from "@/lib/ai/openai";

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

export const generateBrandKit = async (
    framework: BrandFramework,
    inputs: BrandKitInput[]
): Promise<BrandKitOutput> => {

    // Validate inputs
    if (!inputs.length) {
        throw new Error("No inputs provided for brand kit generation");
    }

    if (!framework.outputSections.length) {
        throw new Error("Framework has no output sections defined");
    }

    const responseSchema = createBrandKitResponseSchema(framework);
    const prompt = createBrandKitPrompt(framework, inputs);

    console.log("Generating brand kit with prompt:", prompt);

    const format = zodTextFormat(responseSchema, "brand_kit");

    try {

        const response = await createStructuredOutputResponse<BrandKitOutput>(
            OPENAI_MODEL,
            prompt,
            format
        );

        return response;

    } catch (error) {
        console.error("OpenAI generation error:", error);
        throw new Error(`Failed to generate brand kit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}