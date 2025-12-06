import { OpenAIModel } from "@/lib/ai/types";

export interface ModelPricing {
  inputCostPer1M: number; // Cost per 1M input tokens
  cachedInputCostPer1M: number; // Cached cost per 1M input tokens (if applicable)
  outputCostPer1M: number; // Cost per 1M output tokens
}

export const MODEL_PRICING: Record<OpenAIModel, ModelPricing> = {
    "gpt-5-mini-2025-08-07": {
        inputCostPer1M: 0.25,
        cachedInputCostPer1M: 0.025,
        outputCostPer1M: 2.0,
    },
    "gpt-5-nano-2025-08-07": {
        inputCostPer1M: 0.05,
        cachedInputCostPer1M: 0.005,
        outputCostPer1M: 0.4,
    },
    "gpt-5.1-2025-11-13": {
        inputCostPer1M: 1.25,
        cachedInputCostPer1M: 0.125,
        outputCostPer1M: 10.0
    }
}

export const calculateTokenCost = (
    model: OpenAIModel,
    inputTokens: number,
    cachedInputTokens: number,
    outputTokens: number
) => {

    const pricing = MODEL_PRICING[model];
    if (!pricing) {
        throw new Error(`Pricing not found for model: ${model}`);
    }

    const inputCost = ((inputTokens - cachedInputTokens) / 1_000_000) * pricing.inputCostPer1M;
    const cachedInputCost = (cachedInputTokens / 1_000_000) * pricing.cachedInputCostPer1M;
    const outputCost = (outputTokens / 1_000_000) * pricing.outputCostPer1M;

    return inputCost + outputCost + cachedInputCost;

}