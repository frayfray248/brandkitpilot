"use client"

import React, { useState } from "react";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import InputField from "@/components/form/InputField/InputField";
import Button from "@/components/Button/Button";
import clientSignin from "@/lib/auth/client/signin";
import Text from '@/components/typography/Text/Text'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {

            await clientSignin(email);

            setSuccess(true);

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message);
            }
            else {

                setError("An unexpected error occurred. Please try again.");

            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <FormGroup
                label="Email address"
                required
                errorMessage={error || undefined}
                helperText={success ? "Magic link sent! Check your email." : undefined}
            >
                <InputField
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    fullWidth
                    placeholder="you@example.com"
                    autoComplete="email"
                />
            </FormGroup>
            <Button type="submit" disabled={loading || !email} className="w-full">
                {loading ? "Sending..." : "Send Magic Link"}
            </Button>
            <Text>Don&apos;t have an account? <Text as="a" color="primary" href="/signup">Sign up</Text></Text>
        </form>
    );
};

export default LoginForm;
