"use client";
import { authClient } from '@/auth/authClient';
import Button from '@/components/Button/Button';
import FormGroup from '@/components/form/FormGroup/FormGroup';
import InputField from '@/components/form/InputField/InputField';
import Stack from '@/components/layout/Stack/Stack';
import { startGenerateBrandKitJob } from '@/lib/queue/actions';
import { useRouter } from 'next/navigation';
import React from 'react'

const NewBrandKitForm = () => {

    const frameworkOptions = [
        { value: "storyBrand", label: "StoryBrand" },
        { value: "brandKey", label: "Brand Key" },
        { value: "brandPyramid", label: "Brand Pyramid" },
        { value: "brandPersonality", label: "Brand Personality" },
    ];

    const router = useRouter();
    const { data: session } = authClient.useSession()
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Handle form submission
        try {

            if (!session) {
                router.push('/login');
                return;
            }

            const createdBrandKitId = await startGenerateBrandKitJob(session.user.id, "New Brand Kit");

            router.push(`/results/${createdBrandKitId}`)

        } catch(error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="4">
                <FormGroup
                    label="Branding Framework"
                    helperText="Choose a framework to guide your brand strategy"
                    required
                >
                    <select
                        className="w-full rounded border border-base-300 bg-base-100 text-base-content placeholder:text-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-base-300 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base"
                        required
                    >
                        <option value="">Select a framework...</option>
                        {frameworkOptions.map((framework) => (
                            <option key={framework.value} value={framework.value}>
                                {framework.label}
                            </option>
                        ))}
                    </select>
                </FormGroup>

                <FormGroup
                    label="Business Name"
                    helperText="Enter your business or organization name"
                    required
                >
                    <InputField
                        type="text"
                        placeholder="Enter your business name"
                        fullWidth
                        required
                    />
                </FormGroup>

                <FormGroup
                    label="Business Description"
                    helperText="Describe what your business does and what makes it unique"
                    required
                >
                    <InputField
                        type="textarea"
                        placeholder="Describe your business, products, or services..."
                        fullWidth
                        required
                        rows={4}
                    />
                </FormGroup>

                <FormGroup
                    label="Target Audience"
                    helperText="Describe your ideal customers or target market"
                    required
                >
                    <InputField
                        type="textarea"
                        placeholder="Describe your target audience, their demographics, interests, and needs..."
                        fullWidth
                        required
                        rows={3}
                    />
                </FormGroup>

                <Button
                    variant="primary"
                    size="lg"
                    className="w-full mt-4"
                    type="submit"
                >
                    Generate Brand Kit
                </Button>
            </Stack>
        </form>
    )
}

export default NewBrandKitForm