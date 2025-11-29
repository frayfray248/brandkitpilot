import { BrandFramework } from "@/generated/prisma";
import { BrandKitInput } from "@/lib/ai/types";

export const createBrandKitPrompt = (
    framework: BrandFramework,
    inputs: BrandKitInput[]
): string => {

    return `Generate comprehensive brand messaging content (brand kit) based on the provided inputs. Use the ${framework.name} branding framework.

    ${framework.promptContext || ""}

    Create content for each of the following sections: ${framework.outputSections.map(s => s.title).join(', ')}. Also provide a suitable title for the brand kit.
    
    User inputs: ${JSON.stringify(inputs)}
    
    For each section, provide detailed, actionable content that aligns with the brand strategy and the user's specific inputs.`;

}