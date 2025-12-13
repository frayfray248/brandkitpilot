import { createBrandKitResponse } from "@/lib/ai/responses";
import { getFrameworkBySlug } from "@/lib/dal/brandFrameworks";
import { completeBrandKitWithTokenDeduction, updateBrandKitById } from "@/lib/dal/brandkits";
import { deductTokensFromUser, TOKENS_PER_USD } from "@/lib/dal/tokens";
import { BrandKitRequestData } from "@/lib/queue/schemas";

export interface ProcessBrandKitJobData extends BrandKitRequestData {
    brandKitId: string;
}

export interface ProcessingResult {
    success: boolean;
    brandKitId: string;
    duration: number;
    error?: string;
}

export const processBrandKitJob = async (data: ProcessBrandKitJobData): Promise<ProcessingResult> => {
    const startTime = Date.now();

    try {
        console.log(`🔄 Processing BrandKit: ${data.brandKitId}`);

        // Validate required data
        if (!data.brandKitId) {
            throw new Error("Missing brandKitId in job data");
        }

        // Get framework
        const framework = await getFrameworkBySlug(data.frameworkSlug);
        if (!framework) {
            throw new Error(`Framework not found: ${data.frameworkSlug}`);
        }

        // Generate brand kit content
        const response = await createBrandKitResponse(framework, data.inputs);

        if (!response.output.sections) {
            throw new Error("Invalid response from AI generation");
        }

        // Prepare outputs
        const brandKitOutputs = Object.entries(response.output.sections).map(([title, content]) => ({
            title,
            content
        }));

        const tokensConsumed = Math.ceil(response.cost * TOKENS_PER_USD);

        // Complete brand kit with token deduction transaction
        const [updatedBrandKit, updatedUser, tokenTransaction] = await completeBrandKitWithTokenDeduction(
            data.brandKitId,
            brandKitOutputs,
            data.userId,
            tokensConsumed
        );

        const duration = Date.now() - startTime;
        console.log(`BrandKit completed: ${data.brandKitId} in ${duration}ms, Tokens used: ${tokensConsumed}, Token Transaction ID: ${tokenTransaction.id}`);

        return {
            success: true,
            brandKitId: data.brandKitId,
            duration
        };

    } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        console.error(`❌ BrandKit failed: ${data.brandKitId} (${duration}ms)`, errorMessage);

        // Update brand kit status to failed
        try {
            await updateBrandKitById(data.brandKitId, { status: "FAILED" });
        } catch (updateError) {
            console.error('Failed to update BrandKit status to FAILED:', updateError);
        }

        return {
            success: false,
            brandKitId: data.brandKitId,
            duration,
            error: errorMessage
        };
    }
}