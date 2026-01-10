import { startGenerateBrandKitJob } from '@/lib/queue/actions';
import { test, expect } from '../fixtures';

const data = [
    {
        "userId": "Ag5KRNMCj9K4z2Y1Gt9kpJU2RgQ1BoDz",
        "frameworkSlug": "storybrand",
        "inputs": [
            { "label": "Character", "value": "Small business owners struggling to provide the right brand messaging to attract customers" },
            { "label": "Problem", "value": "Struggling with coming up with meaningful non-generic branding" },
            { "label": "Guide", "value": "An online BrandKit generator application" },
            { "label": "Plan", "value": "A simple process where business owners input their business information and the customers they want to attract, and the application generates personable eye-catching and non-generic BrandKit messaging tailored their business" },
            { "label": "Call to Action", "value": "Generate BrandKit Now!" },
            { "label": "Success", "value": "The business owners have a unique BrandKit that doesn't drive away customers" },
            { "label": "Transformation", "value": "The business owners have a unique BrandKit that attracts their customers and helps them grow their business" }
        ]
    }
]

test.describe('AI Response', () => {


    test('should generate AI responses for brand kit', async () => {

        await startGenerateBrandKitJob(data[0]);

    });

})