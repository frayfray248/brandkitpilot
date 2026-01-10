import { BrandFramework } from "@/generated/prisma";

const frameworks: Omit<BrandFramework, "createdAt" | "id">[] = [
    {
        slug: 'storybrand',
        name: 'StoryBrand',
        description: 'The StoryBrand framework helps businesses clarify their message by using a seven-part framework based on storytelling principles.',
        promptContext: `You are an expert copywriter skilled in the StoryBrand framework. Your task is to create clear, compelling, and customer-focused marketing messages that follow the StoryBrand structure. Use the provided input fields to craft each section of the output, ensuring that the language is engaging and resonates with the target audience. Focus on clarity, simplicity, and the emotional journey of the customer as they interact with the brand.`,
        inputFields: [
            { fieldId: "character", label: 'Character', type: 'TEXT', placeholder: 'A character who wants something', helpText: 'Define the main character of your story and what they desire.' },
            { fieldId: "problem", label: 'Problem', type: 'TEXT', placeholder: 'Has a problem', helpText: 'Identify the problem or challenge that the character faces.' },
            { fieldId: "guide", label: 'Guide', type: 'TEXT', placeholder: 'Meets a guide', helpText: 'Introduce a guide who helps the character overcome their problem.' },
            { fieldId: "plan", label: 'Plan', type: 'TEXT', placeholder: 'Who gives them a plan', helpText: 'Outline the plan that the guide provides to the character.' },
            { fieldId: "callToAction", label: 'Call to Action', type: 'TEXT', placeholder: 'And calls them to action', helpText: 'Describe the call to action that prompts the character to take steps towards resolving their problem.' },
            { fieldId: "success", label: 'Success', type: 'TEXT', placeholder: 'That helps them avoid failure', helpText: 'Explain how following the plan helps the character avoid failure.' },
            { fieldId: "transformation", label: 'Transformation', type: 'TEXT', placeholder: 'And ends in a success', helpText: 'Show the positive transformation or success that results from following the plan.' },
        ],
        outputSections: [
            {
                title: 'Headline',
                description: 'A clear and compelling headline that grabs attention and summarizes the main message.',
            },
            {
                title: 'Problem Statement',
                description: 'A concise statement that highlights the problem your audience is facing.',
            },
            {
                title: 'Value Proposition',
                description: 'A brief explanation of how your product or service solves the problem and the benefits it provides.',
            },
            {
                title: 'Call to Action',
                description: 'A clear and direct call to action that tells your audience what to do next.',
            },
            {
                title: 'Success Vision',
                description: 'A depiction of the positive outcome your audience will experience by following your call to action.',
            },
            {
                title: 'Failure Avoidance',
                description: 'An explanation of the negative consequences your audience will avoid by taking action.',
            },
            {
                title: 'Authority Statement',
                description: 'A statement that establishes your credibility and authority in solving the problem.',
            }
        ]
    },
    {
        slug: 'brand-key',
        name: 'Brand Key',
        description: 'The Brand Key framework helps define the essential elements of your brand including purpose, values, personality, and unique positioning in the market.',
        promptContext: `You are an expert brand strategist skilled in the Brand Key framework. Your task is to create a comprehensive brand profile that clearly defines the core elements of the brand. Use the provided input fields to develop each section of the output, ensuring that the language is precise, engaging, and reflective of the brand\'s identity. Focus on clarity, consistency, and alignment with the brand\'s mission and values.`,
        inputFields: [
            { fieldId: "purpose", label: 'Brand Purpose', type: 'TEXT', placeholder: 'Why does your brand exist?', helpText: 'Define the fundamental reason your brand exists beyond making money.' },
            { fieldId: "vision", label: 'Brand Vision', type: 'TEXT', placeholder: 'What future do you envision?', helpText: 'Describe the aspirational future state your brand is working towards.' },
            { fieldId: "mission", label: 'Brand Mission', type: 'TEXT', placeholder: 'How do you achieve your vision?', helpText: 'Explain how your brand will accomplish its vision and serve its purpose.' },
            { fieldId: "values", label: 'Brand Values', type: 'TEXT', placeholder: 'What principles guide your brand?', helpText: 'List the core values and principles that guide your brand decisions and behavior.' },
            { fieldId: "personality", label: 'Brand Personality', type: 'TEXT', placeholder: 'How would you describe your brand as a person?', helpText: 'Describe your brand as if it were a person - what traits and characteristics would it have?' },
            { fieldId: "promise", label: 'Brand Promise', type: 'TEXT', placeholder: 'What do you guarantee to deliver?', helpText: 'State the unique value and experience you promise to deliver to your customers.' },
            { fieldId: "positioning", label: 'Brand Positioning', type: 'TEXT', placeholder: 'How are you different from competitors?', helpText: 'Explain what makes your brand unique and how it stands out in the market.' },
            { fieldId: "audience", label: 'Target Audience', type: 'TEXT', placeholder: 'Who is your ideal customer?', helpText: 'Define your primary target audience and their key characteristics.' }
        ],
        outputSections: [
            {
                title: 'Brand Foundation',
                description: 'Core elements that define why your brand exists and what it stands for.',
            },
            {
                title: 'Brand Identity',
                description: 'The personality and characteristics that make your brand unique and recognizable.',
            },
            {
                title: 'Value Proposition',
                description: 'The unique value and promise your brand delivers to customers.',
            },
            {
                title: 'Market Position',
                description: 'How your brand differentiates itself and competes in the marketplace.',
            },
            {
                title: 'Brand Guidelines',
                description: 'Key principles and standards for maintaining brand consistency across all touchpoints.',
            },
            {
                title: 'Audience Profile',
                description: 'Detailed description of your target audience and how to connect with them.',
            }
        ]
    },
    {
        slug: 'brand-pyramid',
        name: 'Brand Pyramid',
        description: 'The Brand Pyramid framework organizes brand elements hierarchically, from functional attributes at the base to emotional and self-expressive benefits at the top, creating a comprehensive brand architecture.',
        promptContext: `You are an expert brand strategist skilled in the Brand Pyramid framework. Your task is to create a structured and hierarchical representation of the brand\'s key elements, from functional attributes to emotional and self-expressive benefits. Use the provided input fields to develop each section of the output, ensuring that the language is clear, engaging, and reflective of the brand\'s identity. Focus on clarity, coherence, and alignment with the brand\'s overall strategy and values.`,
        inputFields: [
            { fieldId: "attributes", label: 'Product Attributes', type: 'TEXT', placeholder: 'What are the key features of your product/service?', helpText: 'List the tangible, functional characteristics and features of your offering.' },
            { fieldId: "functionalBenefits", label: 'Functional Benefits', type: 'TEXT', placeholder: 'What practical benefits do you provide?', helpText: 'Describe the practical, utilitarian benefits customers gain from your attributes.' },
            { fieldId: "emotionalBenefits", label: 'Emotional Benefits', type: 'TEXT', placeholder: 'How do customers feel when using your brand?', helpText: 'Explain the emotional rewards and feelings customers experience with your brand.' },
            { fieldId: "selfExpressive", label: 'Self-Expressive Benefits', type: 'TEXT', placeholder: 'What does using your brand say about the customer?', helpText: 'Describe what customers communicate about themselves when they choose your brand.' },
            { fieldId: "brandEssence", label: 'Brand Essence', type: 'TEXT', placeholder: 'What is the core soul of your brand?', helpText: 'Capture the fundamental, timeless essence that defines your brand at its highest level.' },
            { fieldId: "brandPersonality", label: 'Brand Personality', type: 'TEXT', placeholder: 'If your brand were a person, what would they be like?', helpText: 'Describe the human characteristics and traits associated with your brand.' },
            { fieldId: "targetCustomer", label: 'Target Customer', type: 'TEXT', placeholder: 'Who is your ideal customer?', helpText: 'Define the specific customer segment this brand pyramid is designed for.' }
        ],
        outputSections: [
            {
                title: 'Brand Pyramid Visualization',
                description: 'A hierarchical representation of your brand elements from functional attributes to brand essence.',
            },
            {
                title: 'Brand Foundation (Attributes & Functional Benefits)',
                description: 'The foundational layer covering what you offer and the practical benefits it provides.',
            },
            {
                title: 'Brand Experience (Emotional Benefits)',
                description: 'The emotional layer describing how customers feel when engaging with your brand.',
            },
            {
                title: 'Brand Identity (Self-Expression)',
                description: 'The identity layer showing what customers communicate about themselves through your brand.',
            },
            {
                title: 'Brand Essence & Personality',
                description: 'The apex of your brand pyramid capturing its core essence and human characteristics.',
            },
            {
                title: 'Brand Strategy Summary',
                description: 'A comprehensive overview of how all pyramid levels work together to create brand value.',
            }
        ]
    }
]

export default frameworks;