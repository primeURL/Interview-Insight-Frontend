import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorDetails {
  code?: string;
  message: string;
  details?: string;
  retry_allowed?: boolean;
}

interface PreservedInput {
  interviewer_details?: {
    linkedin_url?: string;
    about?: string;
    mock?: boolean;
  };
  candidate_details?: {
    position?: string;
    skills?: string;
    experience?: string;
  };
}

interface InterviewPrepErrorDisplayProps {
  error: ErrorDetails;
  preservedInput?: PreservedInput;
  onRetry?: () => void;
  className?: string;
}

export function InterviewPrepErrorDisplay({
  error,
  preservedInput,
  onRetry,
  className = "",
}: InterviewPrepErrorDisplayProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto space-y-4 ${className}`}>
      {/* Error Alert */}
      <Alert variant="destructive" className="relative">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-base sm:text-lg">
          {getErrorTitle(error.code)}
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p className="text-sm sm:text-base">{error.message}</p>
          {error.details && (
            <p className="text-xs sm:text-sm opacity-90 mt-2">
              {error.details}
            </p>
          )}
        </AlertDescription>
      </Alert>

      {/* Preserved Input Display */}
      {preservedInput && (
        <div className="bg-muted/50 rounded-lg border p-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            Your Input (Preserved for Retry)
          </h4>
          <div className="space-y-2 text-sm">
            {preservedInput.interviewer_details?.linkedin_url && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  LinkedIn URL:
                </span>
                <span className="text-foreground break-all">
                  {preservedInput.interviewer_details.linkedin_url}
                </span>
              </div>
            )}
            {preservedInput.interviewer_details?.about && (
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  About:
                </span>
                <span className="text-foreground wrap-break-word">
                  {preservedInput.interviewer_details.about}
                </span>
              </div>
            )}
            {preservedInput.candidate_details?.position && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  Position:
                </span>
                <span className="text-foreground">
                  {preservedInput.candidate_details.position}
                </span>
              </div>
            )}
            {preservedInput.candidate_details?.skills && (
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  Skills:
                </span>
                <span className="text-foreground wrap-break-word">
                  {preservedInput.candidate_details.skills}
                </span>
              </div>
            )}
            {preservedInput.candidate_details?.experience && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium text-muted-foreground min-w-[140px]">
                  Experience:
                </span>
                <span className="text-foreground">
                  {preservedInput.candidate_details.experience}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Retry Button */}
      {(error.retry_allowed === undefined || error.retry_allowed) && onRetry && (
        <div className="flex justify-center sm:justify-start">
          <Button
            onClick={onRetry}
            variant="default"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[200px]"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Get user-friendly error title based on error code
 */
function getErrorTitle(code?: string): string {
  if (!code) return "Error";

  const errorTitles: Record<string, string> = {
    INVALID_URL: "Invalid LinkedIn URL",
    PROFILE_NOT_ACCESSIBLE: "Profile Not Accessible",
    RATE_LIMITED: "Rate Limit Exceeded",
    NETWORK_ERROR: "Connection Error",
    VALIDATION_ERROR: "Validation Error",
    GENERATION_ERROR: "Question Generation Failed",
    SCRAPING_ERROR: "Profile Scraping Failed",
    INTERNAL_ERROR: "Internal Server Error",
  };

  return errorTitles[code] || "Error Occurred";
}
