// src/lib/api/report.ts
// CRITICAL IMPORT: Import the apiClient to reuse its authorization and URL logic
import { apiClient } from "@/lib/api";
// NOTE: We do NOT use react-query hooks here, just the raw function for file download

interface ExportApiPayload {
  inspectionIds: string[];
  format: "pdf" | "excel" | "csv";
}

/**
 * Handles the secure GET request to the file export endpoint, receiving a file BLOB.
 * This function handles binary response (PDF/Excel) and uses apiClient's auth mechanism.
 */
export const downloadInspectionReport = async (payload: ExportApiPayload) => {
  // 1. Prepare URL and Authorization
  const idString = payload.inspectionIds.join(",");
  const queryParams = new URLSearchParams({
    inspectionIds: idString,
    format: payload.format,
  });

  const endpoint = `/reports/export?${queryParams.toString()}`;
  // NOTE: Assuming NEXT_PUBLIC_API_URL is correctly set
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  // 2. Execute GET request using standard fetch, but reusing apiClient's headers
  const response = await fetch(apiUrl, {
    method: "GET",
    // Reuse the authorization logic from the apiClient
    headers: apiClient._getHeaders(),
  });

  // 3. Handle Errors (Crucial: Do NOT parse as JSON if we expect a file)
  if (response.status === 401) {
    // Delegate 401 handling to the existing logic for session cleanup/redirect
    await apiClient._handleResponse(response);
  }

  if (!response.ok) {
    // For non-file errors (like 400 or 500), the body might be JSON.
    // Try to parse JSON error first, if not, throw a generic error.
    try {
      const errorBody = await response.json();
      throw new Error(
        errorBody.error ||
          errorBody.message ||
          "API Error during report generation."
      );
    } catch {
      throw new Error(
        `Report API failed with status ${response.status}. Received non-JSON error.`
      );
    }
  }

  // 4. Extract filename from Content-Disposition header
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = `report.${payload.format}`;

  if (contentDisposition) {
    const matches = /filename\*?=['"]?([^"']*)/i.exec(contentDisposition);
    if (matches && matches[1]) {
      // Decode filename and clean up quotes/encoding markers
      let rawFilename = decodeURIComponent(
        matches[1].replace(/['"]/g, "").replace("UTF-8''", "")
      );

      // CRITICAL FIX: Ensure the extension is forced to .xlsx if the format was excel
      if (
        payload.format === "excel" &&
        !rawFilename.toLowerCase().endsWith(".xlsx")
      ) {
        filename = rawFilename.replace(/\.xls(x)?$/, "") + ".xlsx";
      } else {
        filename = rawFilename;
      }
    }
  }

  // 5. Return the Blob and the filename
  const blob = await response.blob();
  return { blob, filename };
};
