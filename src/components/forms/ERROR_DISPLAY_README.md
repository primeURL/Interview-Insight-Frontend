# Interview Prep Error Display Component

## Overview

The `InterviewPrepErrorDisplay` component is a reusable React component for displaying error messages in the Interview Preparation Platform. It uses shadcn/ui's Alert component with Tailwind CSS for styling and is fully responsive across all device sizes.

## Features

- ✅ Uses shadcn Alert component with destructive variant
- ✅ Displays error code, message, and optional details
- ✅ Preserves and displays user input for easy retry
- ✅ Includes retry button (optional)
- ✅ Fully responsive (mobile-first design)
- ✅ Accessible with proper ARIA attributes
- ✅ User-friendly error titles based on error codes

## Usage

### Basic Usage

```tsx
import { InterviewPrepErrorDisplay } from "@/components/forms/InterviewPrepErrorDisplay";

<InterviewPrepErrorDisplay
  error={{
    code: "PROFILE_NOT_ACCESSIBLE",
    message: "LinkedIn profile not accessible. Please verify the URL and profile privacy settings.",
    retry_allowed: true,
  }}
  onRetry={() => handleRetry()}
/>
```

### With Preserved Input

```tsx
<InterviewPrepErrorDisplay
  error={{
    code: "RATE_LIMITED",
    message: "Temporarily unable to access LinkedIn. Please try again in a few minutes.",
    details: "We've made too many requests to LinkedIn.",
    retry_allowed: true,
  }}
  preservedInput={{
    interviewer_details: {
      linkedin_url: "https://www.linkedin.com/in/john-doe",
      about: "Senior engineer",
      mock: false,
    },
    candidate_details: {
      position: "Software Engineer",
      skills: "React, Node.js, Python",
      experience: "3.6",
    },
  }}
  onRetry={() => handleRetry()}
/>
```

### Without Retry Button

```tsx
<InterviewPrepErrorDisplay
  error={{
    code: "GENERATION_ERROR",
    message: "Unable to generate questions. Please contact support.",
    retry_allowed: false,
  }}
  preservedInput={formData}
/>
```

## Props

### `error` (required)

Object containing error information:

- `code?: string` - Error code (e.g., "PROFILE_NOT_ACCESSIBLE", "RATE_LIMITED")
- `message: string` - User-friendly error message
- `details?: string` - Optional technical details
- `retry_allowed?: boolean` - Whether retry is allowed (default: true)

### `preservedInput` (optional)

Object containing the user's form input to display for retry:

```typescript
{
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
```

### `onRetry` (optional)

Callback function called when the retry button is clicked. If not provided, the retry button will not be displayed.

### `className` (optional)

Additional CSS classes to apply to the container.

## Error Codes

The component recognizes the following error codes and displays appropriate titles:

| Error Code | Title |
|------------|-------|
| `INVALID_URL` | Invalid LinkedIn URL |
| `PROFILE_NOT_ACCESSIBLE` | Profile Not Accessible |
| `RATE_LIMITED` | Rate Limit Exceeded |
| `NETWORK_ERROR` | Connection Error |
| `VALIDATION_ERROR` | Validation Error |
| `GENERATION_ERROR` | Question Generation Failed |
| `SCRAPING_ERROR` | Profile Scraping Failed |
| `INTERNAL_ERROR` | Internal Server Error |

If no code is provided or the code is not recognized, it defaults to "Error".

## Responsive Design

The component is fully responsive with the following breakpoints:

- **Mobile (< 640px)**: Stacked layout, full-width button
- **Tablet (640px - 768px)**: Improved spacing, flexible layout
- **Desktop (> 768px)**: Side-by-side labels and values, auto-width button

## Integration Example

```tsx
import { InterviewPrepForm } from "@/components/forms/InterviewPrepForm";
import { InterviewPrepErrorDisplay } from "@/components/forms/InterviewPrepErrorDisplay";
import { useState } from "react";

function InterviewPrepPage() {
  const [error, setError] = useState(null);
  const [preservedInput, setPreservedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "error") {
        setError(data.error);
        setPreservedInput(data.preserved_input || formData);
      } else {
        // Handle success
      }
    } catch (err) {
      setError({
        code: "NETWORK_ERROR",
        message: "Connection issue detected. Please check your internet connection.",
      });
      setPreservedInput(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    // Optionally pre-fill form with preserved input
  };

  return (
    <div>
      {error ? (
        <InterviewPrepErrorDisplay
          error={error}
          preservedInput={preservedInput}
          onRetry={handleRetry}
        />
      ) : (
        <InterviewPrepForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </div>
  );
}
```

## Demo

View the component in action at `/error-display-demo` page.

## Requirements Satisfied

This component satisfies the following requirements:

- **1.3**: Display error message for invalid URLs and allow re-entry
- **3.3**: Display error message for empty job role information
- **7.5**: Display user-friendly error messages with guidance
- **8.1**: Display error for inaccessible LinkedIn profiles
- **8.2**: Display error for rate limiting
- **8.3**: Display error for question generation failures
- **8.4**: Display error for network connectivity issues
- **8.5**: Maintain candidate's input data for easy retry

## Styling

The component uses:

- **shadcn/ui Alert** component with destructive variant
- **shadcn/ui Button** component for retry action
- **Tailwind CSS** utility classes for responsive design
- **lucide-react** AlertCircle icon

All styling is responsive and follows mobile-first design principles.
