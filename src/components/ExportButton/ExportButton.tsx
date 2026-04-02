"use client";

import { useState, useRef, useEffect, type ComponentPropsWithRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import useBrandKitExport, { type ExportFormat, EXPORT_FORMAT_LABELS } from "@/hooks/useBrandKitExport";

const exportButton = tv({
    base: "relative inline-flex items-center justify-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-colors",
    variants: {
        variant: {
            primary: "bg-primary text-primary-content hover:bg-primary/90 focus:ring-primary",
            secondary: "bg-secondary text-secondary-content hover:bg-secondary/90 focus:ring-secondary",
            base: "bg-base-200 text-base-content hover:bg-base-300 focus:ring-base-300",
        },
        size: {
            sm: "px-2 py-1 text-sm gap-1",
            md: "px-3 py-1.5 text-base gap-1.5",
            lg: "px-4 py-2 text-lg gap-2",
        },
    },
    defaultVariants: {
        variant: "secondary",
        size: "md",
    },
});

const dropdown = tv({
    base: "absolute z-50 mt-1 w-48 rounded-lg border border-base-300 bg-base-100 shadow-lg py-1 focus:outline-none",
    variants: {
        position: {
            bottom: "top-full left-0",
            top: "bottom-full left-0",
        },
    },
    defaultVariants: {
        position: "bottom",
    },
});

const dropdownItem = tv({
    base: "w-full px-4 py-2 text-left text-sm transition-colors focus:outline-none focus:bg-base-200",
    variants: {
        state: {
            default: "text-base-content hover:bg-base-200",
            disabled: "text-base-content/50 cursor-not-allowed",
        },
    },
    defaultVariants: {
        state: "default",
    },
});

// Download icon SVG
const DownloadIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
    </svg>
);

// Chevron icon SVG
const ChevronIcon = ({ className, isOpen }: { className?: string; isOpen: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${className} transition-transform ${isOpen ? "rotate-180" : ""}`}
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

// Loading spinner SVG
const LoadingSpinner = ({ className }: { className?: string }) => (
    <svg
        className={`${className} animate-spin`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

const EXPORT_FORMATS: ExportFormat[] = ["pdf", "json", "markdown", "text"];

const iconSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
};

export type ExportButtonVariants = VariantProps<typeof exportButton>;

export interface ExportButtonProps
    extends Omit<ComponentPropsWithRef<"div">, "children">,
        ExportButtonVariants {
    /**
     * The ID of the brand kit to export
     */
    brandKitId: string;
    /**
     * The title of the brand kit (used for display purposes)
     */
    brandKitTitle: string;
    /**
     * Whether the button should be disabled
     */
    disabled?: boolean;
    /**
     * Callback fired when export starts
     * @param format - The selected export format
     */
    onExportStart?: (format: ExportFormat) => void;
    /**
     * Callback fired when export succeeds
     * @param format - The exported format
     */
    onExportSuccess?: (format: ExportFormat) => void;
    /**
     * Callback fired when export fails
     * @param error - The error message
     */
    onExportError?: (error: string) => void;
}

/**
 * A dropdown button component for exporting brand kits in various formats.
 * 
 * Supports PDF, JSON, Markdown, and plain text exports. Shows a loading state
 * during export and handles errors gracefully.
 * 
 * @example
 * ```tsx
 * <ExportButton 
 *   brandKitId="abc123"
 *   brandKitTitle="My Brand"
 *   onExportSuccess={(format) => console.log(`Exported as ${format}`)}
 * />
 * ```
 */
export default function ExportButton({
    brandKitId,
    brandKitTitle,
    disabled,
    variant,
    size = "md",
    onExportStart,
    onExportSuccess,
    onExportError,
    className,
    ...props
}: ExportButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const { exportBrandKit, isExporting, exportError } = useBrandKitExport(brandKitId);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case "Escape":
                setIsOpen(false);
                setFocusedIndex(-1);
                buttonRef.current?.focus();
                break;
            case "ArrowDown":
                event.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setFocusedIndex(0);
                } else {
                    setFocusedIndex((prev) => (prev + 1) % EXPORT_FORMATS.length);
                }
                break;
            case "ArrowUp":
                event.preventDefault();
                if (isOpen) {
                    setFocusedIndex((prev) => (prev - 1 + EXPORT_FORMATS.length) % EXPORT_FORMATS.length);
                }
                break;
            case "Enter":
            case " ":
                if (isOpen && focusedIndex >= 0) {
                    event.preventDefault();
                    handleFormatSelect(EXPORT_FORMATS[focusedIndex]);
                }
                break;
        }
    };

    const handleFormatSelect = async (format: ExportFormat) => {
        setIsOpen(false);
        setFocusedIndex(-1);
        onExportStart?.(format);

        try {
            await exportBrandKit(format);
            onExportSuccess?.(format);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Export failed";
            onExportError?.(errorMessage);
        }
    };

    const toggleDropdown = () => {
        if (!disabled && !isExporting) {
            setIsOpen((prev) => !prev);
            if (!isOpen) {
                setFocusedIndex(-1);
            }
        }
    };

    const isDisabled = disabled || isExporting;

    return (
        <div
            ref={containerRef}
            className={`relative inline-block ${className || ""}`}
            onKeyDown={handleKeyDown}
            {...props}
        >
            <button
                ref={buttonRef}
                type="button"
                onClick={toggleDropdown}
                disabled={isDisabled}
                className={exportButton({ variant, size })}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`Export ${brandKitTitle}`}
            >
                {isExporting ? (
                    <LoadingSpinner className={iconSize[size || "md"]} />
                ) : (
                    <DownloadIcon className={iconSize[size || "md"]} />
                )}
                <span>{isExporting ? "Exporting..." : "Export"}</span>
                <ChevronIcon className={iconSize[size || "md"]} isOpen={isOpen} />
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className={dropdown()}
                    role="listbox"
                    aria-label="Export format options"
                    tabIndex={-1}
                >
                    {EXPORT_FORMATS.map((format, index) => (
                        <button
                            key={format}
                            type="button"
                            onClick={() => handleFormatSelect(format)}
                            className={dropdownItem({
                                state: focusedIndex === index ? "default" : "default",
                                className: focusedIndex === index ? "bg-base-200" : "",
                            })}
                            role="option"
                            aria-selected={focusedIndex === index}
                        >
                            {EXPORT_FORMAT_LABELS[format]}
                        </button>
                    ))}
                </div>
            )}

            {exportError && (
                <div className="absolute top-full left-0 mt-1 text-xs text-error" role="alert">
                    {exportError}
                </div>
            )}
        </div>
    );
}
