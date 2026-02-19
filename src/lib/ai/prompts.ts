import { OpenAIPrompt } from "@/lib/ai/types";
import serverEnv from "@/lib/env/serverEnv";

/**
 * Configuration options for creating a brand kit generation prompt.
 * 
 * @interface CreateBrandKitPromptOptions
 */
export type CreateBrandKitPromptOptions = {
    /** The name of the branding framework to use for generation */
    frameworkName: string;
    /** Optional contextual information to guide the AI generation */
    context?: string;
    /** Comma-separated list of output sections to be included in the brand kit */
    outputSections: string
    /** JSON string containing user inputs for the brand kit generation */
    userInputs: string
}

/**
 * Creates an OpenAI prompt configuration for brand kit generation.
 * 
 * This function constructs a prompt that uses a predefined template from the OpenAI dashboard
 * with dynamic variables based on the user's framework selection and inputs.
 * 
 * @param options - Configuration options for the brand kit prompt
 * @param options.frameworkName - The branding framework to use (e.g., "Brand Essence", "Brand Strategy")
 * @param options.context - Additional context to guide AI generation (optional, defaults to empty string)
 * @param options.outputSections - Comma-separated string of sections to include in output
 * @param options.userInputs - JSON string of user-provided inputs for personalization
 * 
 * @returns OpenAI prompt configuration with ID and variables ready for API call
 * 
 * @example
 * ```typescript
 * const prompt = createBrandKitPrompt({
 *   frameworkName: "Brand Essence",
 *   context: "Tech startup in AI space",
 *   outputSections: "Mission, Vision, Values",
 *   userInputs: JSON.stringify([{label: "Company Name", value: "TechCorp"}])
 * });
 * ```
 */
export const createBrandKitPrompt = ({ frameworkName, context="", outputSections, userInputs }: CreateBrandKitPromptOptions): OpenAIPrompt => {

    return {
        id: serverEnv.CREATE_BRANDKIT_PROMPT_ID,
        variables: {
            framework: frameworkName,
            context: context,
            outputsections: outputSections,
            userinputs: userInputs
        }
    }

}