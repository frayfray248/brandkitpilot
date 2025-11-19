"use client";
import { authClient } from '@/auth/authClient';
import Button from '@/components/Button/Button';
import FormGroup from '@/components/form/FormGroup/FormGroup';
import InputField from '@/components/form/InputField/InputField';
import Stack from '@/components/layout/Stack/Stack';
import { startGenerateBrandKitJob } from '@/lib/queue/actions';
import { useRouter } from 'next/navigation';
import React from 'react'
import { BrandFramework } from '../../generated/prisma';
import { BrandKitRequestData } from '@/lib/queue/schemas';

export type NewBrandKitFormProps = {
    frameworks: BrandFramework[];
}

function getInputType(fieldType: string): 'text' | 'textarea' | 'number' {
    switch (fieldType) {
        case 'TEXT':
            return 'text';
        case 'TEXTAREA':
            return 'textarea';
        case 'NUMBER':
            return 'number';
        default:
            return 'text';
    }
}

const NewBrandKitForm = ({ frameworks }: NewBrandKitFormProps) => {

    const router = useRouter();

    const { data: session } = authClient.useSession()


    // state
    const [selectedFramework, setSelectedFramework] = React.useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = e.target.selectedIndex - 1; // Adjust for placeholder option
        setSelectedFramework(index >= 0 ? index : null);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        
        try {

            if (selectedFramework === null) {
                setError('Please select a branding framework');
                return;
            }

            if (!session) {
                router.push('/login');
                return;
            }

            const formData = new FormData(e.currentTarget);

            // Get field data with labels and values
            const fieldData = frameworks[selectedFramework].inputFields.map((field) => {
                const value = formData.get(field.fieldId);
                return {
                    label: field.label,
                    value: typeof value === 'string' ? value : ''
                };
            });

            // Validate that required fields are filled
            const emptyFields = fieldData.filter(field => !field.value.trim());
            if (emptyFields.length > 0) {
                setError(`Please fill in all fields: ${emptyFields.map(f => f.label).join(', ')}`);
                return;
            }

            const requestData: BrandKitRequestData = {
                userId: session.user.id,
                frameworkSlug: frameworks[selectedFramework].slug,
                inputs: fieldData
            }

            const createdBrandKitId = await startGenerateBrandKitJob(requestData);

            router.push(`/results/${createdBrandKitId}`)

        } catch (error) {
            console.error("Error submitting form:", error);
            setError('Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="4">
                {error && (
                    <div className="bg-error text-error-content px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                <FormGroup
                    label="Branding Framework"
                    helperText="Choose a framework to guide your brand strategy"
                    required
                >
                    <select
                        onChange={handleFrameworkChange}
                        className="w-full rounded border border-base-300 bg-base-100 text-base-content placeholder:text-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-base-300 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-base"
                        required
                    >
                        <option value="">Select a framework...</option>
                        {frameworks.map((framework) => (
                            <option key={framework.slug} value={framework.slug}>
                                {framework.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>
                {
                    selectedFramework !== null && (
                        frameworks[selectedFramework].inputFields.map((field) => (
                            <FormGroup
                                key={field.fieldId}
                                label={field.label}
                                helperText={field.helpText || undefined}
                            >
                                <InputField
                                    name={field.fieldId}
                                    type={getInputType(field.type)}
                                    placeholder={field.placeholder}
                                    fullWidth
                                />
                            </FormGroup>
                        ))
                    )
                }

                <Button
                    variant="primary"
                    size="lg"
                    className="w-full mt-4"
                    type="submit"
                    disabled={isSubmitting || selectedFramework === null}
                >
                    {isSubmitting ? 'Generating...' : 'Generate Brand Kit'}
                </Button>
            </Stack>
        </form>
    )
}

export default NewBrandKitForm