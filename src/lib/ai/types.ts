export type OpenAIModel = 
    | "gpt-5.1-2025-11-13"
    | "gpt-5-mini-2025-08-07"
    | "gpt-5-nano-2025-08-07"

export type BrandKitInput = {
    label: string;
    value: string;
};

export type BrandKitOutput = {
    title: string;
    sections: Record<string, string>;
};

export type AIResponse<T> = {
    output: T;
    cost: number;
}
