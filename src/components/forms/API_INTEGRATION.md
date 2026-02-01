# API Integration Documentation

## Overview

The Interview Preparation Platform frontend integrates with the FastAPI backend to generate personalized interview questions. This document explains the API integration implementation.

## Components

### InterviewPrepContainer.tsx

The main container component that manages:
- API calls to the backend
- State management (form, loading, results, error)
- Integration of form, results, and error display components

### API Client Function

```typescript
async function generateQuestions(formData: FormData): Promise<Question[]>
```

**Endpoint**: `POST /api/generate-questions`

**Request Body**:
```json
{
  "interviewer_details": {
    "linkedin_url": "https://www.linkedin.com/in/username",
    "about": "optional text",
    "mock": true/false
  },
  "candidate_details": {
    "position": "Software Engineer",
    "skills": "React,Node,Python,AWS,LLMs",
    "experience": "3.6"
  }
}
```

**Success Response** (200):
```json
[
  {
    "set_type": "interviewer_experience",
    "category": "Performance",
    "difficulty": "Hard",
    "question": "Main question text",
    "why_this_question": "Explanation",
    "expected_depth": "What's expected",
    "follow_ups": ["Follow-up 1", "Follow-up 2"]
  }
]
```

**Error Response** (4xx/5xx):
```json
{
  "detail": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `PROFILE_NOT_ACCESSIBLE` | 404 | LinkedIn profile is private or doesn't exist |
| `RATE_LIMITED` | 429 | LinkedIn rate limiting detected |
| `NETWORK_ERROR` | 502 | Connection issues |
| `SCRAPING_ERROR` | 502 | Profile scraping failed |
| `GENERATION_ERROR` | 500 | Question generation failed |
| `INVALID_INPUT` | 422 | Input validation failed |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## Configuration

### Environment Variables

Set the backend API URL in `.env`:

```bash
PUBLIC_API_URL=http://localhost:8000
```

For production, update to your deployed backend URL.

## State Flow

1. **Form State**: User fills out the form
2. **Loading State**: API request in progress, shows loading spinner
3. **Results State**: Questions displayed successfully
4. **Error State**: Error occurred, shows error message with retry option

## Features

- **Loading Indicators**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages with retry capability
- **Input Preservation**: User input saved on error for easy retry
- **Progress Feedback**: Loading states and status updates
- **Responsive Design**: Works on all screen sizes

## Usage

```tsx
import { InterviewPrepContainer } from '@/components/forms/InterviewPrepContainer';

// In your Astro page
<InterviewPrepContainer client:load />
```

## Testing

To test the integration:

1. Start the backend server: `cd backend && uvicorn main:app --reload`
2. Start the frontend dev server: `cd Frontend && npm run dev`
3. Navigate to `/interview-prep`
4. Fill out the form and submit

## Mock Mode

Enable mock mode in the form to test without making actual LinkedIn API calls. The backend will return mock data when `mock: true` is set.
