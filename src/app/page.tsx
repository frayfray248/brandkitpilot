'use client';

import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import InputField from "@/components/InputField/InputField";
import Radio from "@/components/Radio/Radio";
import Stack from "@/components/Stack/Stack";
import Text from "@/components/Text/Text";
import { useRef } from "react";

export default function Home() {
    
    const ref = useRef<HTMLInputElement>(null)
    
    return (
        <main >
            <Stack ref={ref}>d</Stack>
        </main>
    );
}

