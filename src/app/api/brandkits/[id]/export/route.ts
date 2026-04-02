import { NextRequest, NextResponse } from "next/server";
import { getBrandKitForExport } from "@/lib/dal/brandkits";
import {
    formatBrandKit,
    generateFilename,
    isValidExportFormat,
    CONTENT_TYPES,
    type ExportFormat,
} from "@/lib/brandkits/export";
import Responses from "@/lib/api/jsonResponses";

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/brandkits/[id]/export
 * 
 * Exports a brand kit in the specified format.
 * Requires authentication and ownership of the brand kit.
 * 
 * Query Parameters:
 * - format: "pdf" | "json" | "markdown" | "text" (required)
 * 
 * Returns:
 * - 200: File download with appropriate Content-Type and Content-Disposition headers
 * - 400: Invalid or missing format parameter, or invalid brand kit ID
 * - 401: User not authenticated
 * - 404: Brand kit not found or not owned by user or not completed
 * - 500: Server error during export
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id: brandKitId } = await params;
        const { searchParams } = new URL(request.url);
        const format = searchParams.get("format");

        // Validate brand kit ID is a valid MongoDB ObjectId format
        if (!/^[a-f\d]{24}$/i.test(brandKitId)) {
            return Responses.clientError.BadRequest("Invalid brand kit ID format");
        }

        // Validate format parameter
        if (!format) {
            return Responses.clientError.BadRequest("Format parameter is required");
        }

        if (!isValidExportFormat(format)) {
            return Responses.clientError.BadRequest({
                message: "Invalid export format",
                validFormats: ["pdf", "json", "markdown", "text"],
            });
        }

        // Fetch brand kit with ownership validation
        // Returns null if not found, not owned, or not completed
        const brandKit = await getBrandKitForExport(brandKitId);

        if (!brandKit) {
            return Responses.clientError.NotFound(
                "Brand kit not found, not accessible, or not ready for export"
            );
        }

        // Format the brand kit content
        const exportData = {
            id: brandKit.id,
            title: brandKit.title,
            outputs: brandKit.outputs as Array<{ title: string; content: string }>,
        };

        const content = formatBrandKit(exportData, format as ExportFormat);
        const filename = generateFilename(brandKit.title, format as ExportFormat);
        const contentType = CONTENT_TYPES[format as ExportFormat];

        // Create response with appropriate headers
        // Use RFC 5987 encoding for filename to handle special characters safely
        const encodedFilename = encodeURIComponent(filename);
        const responseHeaders = new Headers({
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
        });

        // Handle binary (PDF) vs text formats
        if (format === "pdf") {
            return new NextResponse(content as ArrayBuffer, {
                status: 200,
                headers: responseHeaders,
            });
        }

        return new NextResponse(content as string, {
            status: 200,
            headers: responseHeaders,
        });
    } catch (error) {
        // Handle authentication errors
        if (error instanceof Error && error.message === "Not authenticated") {
            return Responses.clientError.Unauthorized("Authentication required");
        }

        console.error("Export error:", error);
        return Responses.serverError.InternalServerError("Failed to export brand kit");
    }
}
