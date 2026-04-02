"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface UseClipboardOptions {
    /**
     * Duration in milliseconds before the copied state resets
     * @default 2000
     */
    resetDelay?: number;
}

interface UseClipboardReturn {
    /**
     * Copy text to clipboard
     * @param text - The text to copy
     * @returns Promise that resolves when copy is complete
     */
    copy: (text: string) => Promise<void>;
    /**
     * Whether the text was recently copied successfully
     */
    copied: boolean;
    /**
     * Error message if copy failed, null otherwise
     */
    error: string | null;
    /**
     * Reset the copied and error states
     */
    reset: () => void;
}

/**
 * Custom hook for clipboard operations with feedback state
 * 
 * @param options - Configuration options
 * @returns Object containing copy function and state
 * 
 * @example
 * ```tsx
 * const { copy, copied, error, reset } = useClipboard();
 * 
 * <button onClick={() => copy("Hello World")}>
 *   {copied ? "Copied!" : "Copy"}
 * </button>
 * ```
 */
const useClipboard = (options: UseClipboardOptions = {}): UseClipboardReturn => {
    const { resetDelay = 2000 } = options;
    
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const reset = useCallback(() => {
        setCopied(false);
        setError(null);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const copy = useCallback(async (text: string): Promise<void> => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        try {
            // Check if clipboard API is available
            if (!navigator?.clipboard?.writeText) {
                throw new Error("Clipboard API not supported");
            }

            await navigator.clipboard.writeText(text);
            setCopied(true);
            setError(null);

            // Auto-reset after delay
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, resetDelay);
        } catch (err) {
            setCopied(false);
            const errorMessage = err instanceof Error 
                ? err.message 
                : "Failed to copy to clipboard";
            setError(errorMessage);
            throw err;
        }
    }, [resetDelay]);

    return { copy, copied, error, reset };
};

export default useClipboard;
