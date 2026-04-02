import { jsPDF } from "jspdf";

/**
 * Export format types supported by the application
 */
export type ExportFormat = "pdf" | "json" | "markdown" | "text";

/**
 * Brand kit data structure for export operations
 */
export interface BrandKitExportData {
    id: string;
    title: string;
    outputs: Array<{ title: string; content: string }>;
}

/**
 * Content type mappings for each export format
 */
export const CONTENT_TYPES: Record<ExportFormat, string> = {
    pdf: "application/pdf",
    json: "application/json",
    markdown: "text/markdown",
    text: "text/plain",
};

/**
 * File extension mappings for each export format
 */
export const FILE_EXTENSIONS: Record<ExportFormat, string> = {
    pdf: "pdf",
    json: "json",
    markdown: "md",
    text: "txt",
};

/**
 * Sanitizes a filename by removing or replacing invalid characters
 * @param filename - The original filename
 * @returns A sanitized filename safe for download
 */
export const sanitizeFilename = (filename: string): string => {
    return filename
        .replace(/[<>:"/\\|?*\x00-\x1f]/g, "") // Remove invalid characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single
        .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
        .substring(0, 200) // Limit length
        .toLowerCase();
};

/**
 * Generates a download filename for the brand kit export
 * @param title - The brand kit title
 * @param format - The export format
 * @returns A formatted filename with extension
 */
export const generateFilename = (title: string, format: ExportFormat): string => {
    const sanitized = sanitizeFilename(title) || "brandkit";
    return `${sanitized}.${FILE_EXTENSIONS[format]}`;
};

/**
 * Formats brand kit data as JSON
 * @param brandKit - The brand kit data to format
 * @returns JSON string representation
 */
export const formatAsJson = (brandKit: BrandKitExportData): string => {
    return JSON.stringify(
        {
            title: brandKit.title,
            sections: brandKit.outputs.map((section) => ({
                title: section.title,
                content: section.content,
            })),
            exportedAt: new Date().toISOString(),
        },
        null,
        2
    );
};

/**
 * Formats brand kit data as Markdown
 * @param brandKit - The brand kit data to format
 * @returns Markdown string representation
 */
export const formatAsMarkdown = (brandKit: BrandKitExportData): string => {
    const lines: string[] = [];

    // Title as H1
    lines.push(`# ${brandKit.title}`);
    lines.push("");

    // Each section as H2 with content
    for (const section of brandKit.outputs) {
        lines.push(`## ${section.title}`);
        lines.push("");
        lines.push(section.content);
        lines.push("");
    }

    // Footer with export date
    lines.push("---");
    lines.push(`*Exported from BrandKitPilot on ${new Date().toLocaleDateString()}*`);

    return lines.join("\n");
};

/**
 * Formats brand kit data as plain text
 * @param brandKit - The brand kit data to format
 * @returns Plain text string representation
 */
export const formatAsPlaintext = (brandKit: BrandKitExportData): string => {
    const lines: string[] = [];

    // Title with underline
    lines.push(brandKit.title.toUpperCase());
    lines.push("=".repeat(brandKit.title.length));
    lines.push("");

    // Each section with title and content
    for (const section of brandKit.outputs) {
        lines.push(section.title);
        lines.push("-".repeat(section.title.length));
        lines.push("");
        lines.push(section.content);
        lines.push("");
        lines.push("");
    }

    // Footer
    lines.push(`Exported from BrandKitPilot on ${new Date().toLocaleDateString()}`);

    return lines.join("\n");
};

/**
 * Formats brand kit data as PDF
 * @param brandKit - The brand kit data to format
 * @returns PDF as ArrayBuffer
 * @throws Error if PDF generation fails
 */
export const formatAsPdf = (brandKit: BrandKitExportData): ArrayBuffer => {
    try {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Helper to check if we need a new page
    const checkPageBreak = (requiredHeight: number) => {
        if (yPosition + requiredHeight > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
        }
    };

    // Title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(brandKit.title, contentWidth);
    checkPageBreak(titleLines.length * 10);
    doc.text(titleLines, margin, yPosition);
    yPosition += titleLines.length * 10 + 5;

    // Underline
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Sections
    for (const section of brandKit.outputs) {
        // Section title
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        const sectionTitleLines = doc.splitTextToSize(section.title, contentWidth);
        checkPageBreak(sectionTitleLines.length * 7 + 15);
        doc.text(sectionTitleLines, margin, yPosition);
        yPosition += sectionTitleLines.length * 7 + 5;

        // Section content
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const contentLines = doc.splitTextToSize(section.content, contentWidth);

        for (const line of contentLines) {
            checkPageBreak(6);
            doc.text(line, margin, yPosition);
            yPosition += 6;
        }

        yPosition += 10;
    }

    // Footer
    checkPageBreak(15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(128, 128, 128);
    doc.text(
        `Exported from BrandKitPilot on ${new Date().toLocaleDateString()}`,
        margin,
        pageHeight - 10
    );

        return doc.output("arraybuffer");
    } catch (error) {
        throw new Error(
            `Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
};

/**
 * Formats brand kit data in the specified format
 * @param brandKit - The brand kit data to format
 * @param format - The export format
 * @returns Formatted content as string or ArrayBuffer (for PDF)
 * @throws Error if brand kit has no content or export fails
 */
export const formatBrandKit = (
    brandKit: BrandKitExportData,
    format: ExportFormat
): string | ArrayBuffer => {
    // Validate brand kit has content to export
    if (!brandKit.outputs || brandKit.outputs.length === 0) {
        throw new Error("Brand kit has no content to export");
    }

    switch (format) {
        case "pdf":
            return formatAsPdf(brandKit);
        case "json":
            return formatAsJson(brandKit);
        case "markdown":
            return formatAsMarkdown(brandKit);
        case "text":
            return formatAsPlaintext(brandKit);
        default:
            throw new Error(`Unsupported export format: ${format}`);
    }
};

/**
 * Validates that the provided format is a valid export format
 * @param format - The format string to validate
 * @returns True if valid, false otherwise
 */
export const isValidExportFormat = (format: string): format is ExportFormat => {
    return ["pdf", "json", "markdown", "text"].includes(format);
};
