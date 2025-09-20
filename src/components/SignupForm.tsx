"use client"
import React, { useState } from "react";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import InputField from "@/components/form/InputField/InputField";
import Button from "@/components/Button/Button";
import clientSignin from "@/lib/auth/client/signin";
import createUser from "@/lib/auth/server/createUser";

const SignupForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {

            await createUser(name, email);
            await clientSignin(email);

            setSuccess(true);
            setEmail("");
            setName("");

        } catch (error) {

            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("Something went wrong. Please try again later.");
            }

        } finally {
            setLoading(false);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <h2 className="text-xl font-bold mb-2">Sign Up</h2>
            <FormGroup
                label="Create Account"
                required
                errorMessage={error || undefined}
                helperText={success ? "Signup successful. Please check your email for a sign-in link." : undefined}
            >
                <InputField
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    fullWidth
                    placeholder="Your Name"
                    autoComplete="name"
                />
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

            <Button type="submit" disabled={loading || !email || !name} className="w-full">
                {loading ? "Signing up..." : "Sign Up"}
            </Button>
        </form>
    );
};

export default SignupForm;
