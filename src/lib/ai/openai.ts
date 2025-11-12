import { BrandFramework } from "@/generated/prisma";
import { MAX_TOKENS, OPENAI_MODEL, TEMPERATURE } from "@/lib/ai/const";
import serverEnv from "@/lib/env/serverEnv";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import z from "zod";

export const openaiClient = new OpenAI({ apiKey: serverEnv.OPENAI_API_KEY });

export const generateSlogan = async (businessName: string): Promise<string> => {

    const openai = openaiClient;

    const prompt = `Generate a catchy slogan for a business named "${businessName}". Keep it under 10 words.`;

    console.log("Generating slogan with prompt:", prompt);

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a creative marketing assistant." },
            { role: "user", content: prompt }
        ],
        max_tokens: 50,
        temperature: 0.7,
    });

    console.log("Slogan generated:", response.choices[0].message.content);

    return response.choices[0].message.content || "";

}


export const generateBrandKit = async (
    framework: BrandFramework, 
    inputs: { label: string, value: string }[]
): Promise<{title: string, sections: Record<string, string>}> => {

    const openai = openaiClient;

    // Validate inputs
    if (!inputs.length) {
        throw new Error("No inputs provided for brand kit generation");
    }

    if (!framework.outputSections.length) {
        throw new Error("Framework has no output sections defined");
    }

    // Create dynamic Zod schema based on the framework's output sections
    const sectionSchemas = framework.outputSections.reduce((acc, section) => {
        acc[section.title] = z.string().describe(section.description || section.title);
        return acc;
    }, {} as Record<string, z.ZodString>);

    const BrandKitResponseSchema = z.object({
        title: z.string().describe("The title of the brand kit"),
        sections: z.object(sectionSchemas)
    });

    const prompt = `Generate comprehensive brand messaging content (brand kit) based on the provided inputs. Use the ${framework.name} branding framework.
    Create content for each of the following sections: ${framework.outputSections.map(s => s.title).join(', ')}. Also provide a suitable title for the brand kit.
    
    User inputs: ${JSON.stringify(inputs)}
    
    For each section, provide detailed, actionable content that aligns with the brand strategy and the user's specific inputs.`;

    console.log("Generating brand kit with prompt:", prompt);

    try {
        const response = await openai.responses.parse({
            model: OPENAI_MODEL,
            input: [
                { role: "system", content: "You are a branding expert." },
                { role: "user", content: prompt }
            ],
            text: {
                format: zodTextFormat(BrandKitResponseSchema, "brand_kit")
            }
        });

        if (!response.output_parsed) {
            throw new Error("No parsed output received from OpenAI");
        }

        return response.output_parsed;
        
    } catch (error) {
        console.error("OpenAI generation error:", error);
        throw new Error(`Failed to generate brand kit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}