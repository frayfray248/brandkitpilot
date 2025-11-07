import serverEnv from "@/lib/env/serverEnv";
import OpenAI from "openai";

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