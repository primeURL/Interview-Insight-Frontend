import * as React from "react";
import { InterviewPrepForm } from "./InterviewPrepForm";
import { InterviewResultsDisplay } from "./InterviewResultsDisplay";
import { InterviewPrepErrorDisplay } from "./InterviewPrepErrorDisplay";

interface FormData {
  interviewer_details: {
    linkedin_url: string;
    about: string;
    mock: boolean;
  };
  candidate_details: {
    position: string;
    skills: string;
    experience: string;
  };
}

interface Question {
  set_type: string;
  category: string;
  difficulty: string;
  question: string;
  why_this_question: string;
  expected_depth: string;
  follow_ups: string[];
}

interface ErrorDetails {
  code?: string;
  message: string;
  details?: string;
  retry_allowed?: boolean;
}

interface ApiErrorResponse {
  detail?: {
    code?: string;
    message?: string;
  } | string;
}

type ViewState = "form" | "loading" | "results" | "error";

/**
 * API client function to call the backend generate-questions endpoint
 */
async function generateQuestions(formData: FormData): Promise<Question[]> {
  // Get the API base URL from environment or use default
  const apiBaseUrl = import.meta.env.PUBLIC_API_URL || "http://localhost:8000";
  const endpoint = `${apiBaseUrl}/api/generate-questions`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // Parse error response
    let errorData: ApiErrorResponse;
    try {
      errorData = await response.json();
    } catch {
      // If JSON parsing fails, create a generic error
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Extract error details
    let code = "UNKNOWN_ERROR";
    let message = "An unexpected error occurred";

    if (typeof errorData.detail === "object" && errorData.detail !== null) {
      code = errorData.detail.code || code;
      message = errorData.detail.message || message;
    } else if (typeof errorData.detail === "string") {
      message = errorData.detail;
    }

    // Create error with code and message
    const error = new Error(message) as Error & { code?: string; status?: number };
    error.code = code;
    error.status = response.status;
    throw error;
  }

  // Parse successful response
  const questions: Question[] = await response.json();
  return questions;
}

/**
 * Container component that manages API integration and state
 */
export function InterviewPrepContainer() {
  const [viewState, setViewState] = React.useState<ViewState>("form");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [error, setError] = React.useState<ErrorDetails | null>(null);
  const [preservedInput, setPreservedInput] = React.useState<FormData | null>(null);

  const handleSubmit = async (formData: FormData) => {
    // Save input for potential retry
    setPreservedInput(formData);
    
    // Set loading state
    setViewState("loading");
    setError(null);

    try {
      // Call API
      const result = await generateQuestions(formData);
      
      // Update state with results
      setQuestions(result);
      setViewState("results");
    } catch (err) {
      // Handle error
      const error = err as Error & { code?: string; status?: number };
      
      let errorDetails: ErrorDetails = {
        code: error.code || "UNKNOWN_ERROR",
        message: error.message || "An unexpected error occurred",
        retry_allowed: true,
      };

      // Add user-friendly messages based on error code
      if (error.code === "PROFILE_NOT_ACCESSIBLE") {
        errorDetails.message = "LinkedIn profile not accessible. Please verify the URL and profile privacy settings.";
      } else if (error.code === "RATE_LIMITED") {
        errorDetails.message = "Temporarily unable to access LinkedIn. Please try again in a few minutes.";
      } else if (error.code === "NETWORK_ERROR") {
        errorDetails.message = "Connection issue detected. Please check your internet connection and retry.";
      } else if (error.code === "GENERATION_ERROR") {
        errorDetails.message = "Unable to generate questions. Please try again or contact support if the issue persists.";
      } else if (error.code === "SCRAPING_ERROR") {
        errorDetails.message = "Unable to extract profile information. The profile structure may have changed.";
      } else if (error.code === "INVALID_INPUT") {
        errorDetails.message = "Invalid input provided. Please check your entries and try again.";
      }

      setError(errorDetails);
      setViewState("error");
    }
  };

  const handleRetry = () => {
    // Reset to form view to allow retry
    setViewState("form");
    setError(null);
  };

  const handleNewSearch = () => {
    // Reset everything for a new search
    setViewState("form");
    setQuestions([]);
    setError(null);
    setPreservedInput(null);
  };

  return (
    <div className="space-y-8">
      {/* Show form when in form or loading state */}
      {(viewState === "form" || viewState === "loading") && (
        <InterviewPrepForm
          onSubmit={handleSubmit}
          isLoading={viewState === "loading"}
        />
      )}

      {/* Show loading state */}
      {viewState === "loading" && (
        <InterviewResultsDisplay isLoading={true} />
      )}

      {/* Show results */}
      {viewState === "results" && (
        <div className="space-y-6">
          <InterviewResultsDisplay questions={questions} />
          <div className="flex justify-center">
            <button
              onClick={handleNewSearch}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Generate New Questions
            </button>
          </div>
        </div>
      )}

      {/* Show error */}
      {viewState === "error" && error && (
        <InterviewPrepErrorDisplay
          error={error}
          preservedInput={preservedInput || undefined}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
