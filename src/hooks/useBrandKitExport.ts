"use client";

import { useState, useCallback } from "react";

/**
 * Export format types supported for brand kit downloads
 */
export type ExportFormat = "pdf" | "json" | "markdown" | "text";

/**
 * Human-readable labels for each export format
 */
export const EXPORT_FORMAT_LABELS: Record<ExportFormat, string> = {
    pdf: "PDF Document",
    json: "JSON",
    markdown: "Markdown",
    text: "Plain Text",
};

interface UseBrandKitExportReturn {
    /**
     * Export the brand kit in the specified format
     * @param format - The export format
     * @returns Promise that resolves when download is triggered
     */
    exportBrandKit: (format: ExportFormat) => Promise<void>;
    /**
     * Whether an export is currently in progress
     */
    isExporting: boolean;
    /**
     * Error message if export failed, null otherwise
     */
    exportError: string | null;
    /**
     * Clear the error state
     */
    clearError: () => void;
}

/**
 * Custom hook for handling brand kit exports and downloads
 * 
 * @param brandKitId - The ID of the brand kit to export
 * @returns Object containing export function and state
 * 
 * @example
 * ```tsx
 * const { exportBrandKit, isExporting, exportError } = useBrandKitExport(brandKitId);
 * 
 * <button 
 *   onClick={() => exportBrandKit("pdf")}
 *   disabled={isExporting}
 * >
 *   {isExporting ? "Exporting..." : "Export as PDF"}
 * </button>
 * ```
 */
const useBrandKitExport = (brandKitId: string): UseBrandKitExportReturn => {
    const [isExporting, setIsExporting] = useState(false);
    const [exportError, setExportError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setExportError(null);
    }, []);

    const exportBrandKit = useCallback(async (format: ExportFormat): Promise<void> => {
        if (isExporting) return; // Prevent multiple concurrent exports

        setIsExporting(true);
        setExportError(null);

        try {
            const response = await fetch(
                `/api/brandkits/${brandKitId}/export?format=${format}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message || `Export failed: ${response.status} ${response.statusText}`
                );
            }

            // Get filename from Content-Disposition header or generate default
            const contentDisposition = response.headers.get("Content-Disposition");
            let filename = `brandkit.${format === "markdown" ? "md" : format === "text" ? "txt" : format}`;
            
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^";\n]+)"?/);
                if (filenameMatch?.[1]) {
                    filename = filenameMatch[1];
                }
            }

            // Create blob and trigger download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unexpected error occurred during export";
            setExportError(errorMessage);
            console.error("Export error:", error);
            throw error;
        } finally {
            setIsExporting(false);
        }
    }, [brandKitId, isExporting]);

    return { exportBrandKit, isExporting, exportError, clearError };
};

export default useBrandKitExport;
