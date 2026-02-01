# Interview Results Display Component

## Overview

The `InterviewResultsDisplay` component is a React component that displays personalized interview questions in a responsive, card-based layout. It's designed to work with the Interview Preparation Platform and displays questions generated based on an interviewer's LinkedIn profile.

## Features

- **Responsive Grid Layout**: Automatically adjusts from 1 column (mobile) to 2 columns (tablet) to 3 columns (desktop)
- **Color-Coded Badges**: Visual indicators for difficulty levels and categories
- **Loading State**: Animated spinner with descriptive text during question generation
- **Comprehensive Question Display**: Shows all question details including:
  - Set type (e.g., "Interviewer Experience", "Candidate Skills")
  - Category (e.g., "Performance", "System Design")
  - Difficulty level (Easy, Medium, Hard)
  - Main question text
  - Explanation of why this question is relevant
  - Expected depth of answer
  - Follow-up questions

## Usage

### Basic Usage

```tsx
import { InterviewResultsDisplay } from '@/components/forms/InterviewResultsDisplay';

const questions = [
  {
    set_type: "interviewer_experience",
    category: "Performance",
    difficulty: "Hard",
    question: "How would you optimize a React application?",
    why_this_question: "Based on the interviewer's experience...",
    expected_depth: "Discuss React.memo, useMemo, useCallback...",
    follow_ups: ["Can you explain the difference between React.memo and useMemo?"]
  }
];

<InterviewResultsDisplay questions={questions} />
```

### Loading State

```tsx
<InterviewResultsDisplay isLoading={true} />
```

### Empty State

```tsx
<InterviewResultsDisplay questions={[]} />
// Returns null - no display
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `questions` | `Question[]` | `[]` | Array of question objects to display |
| `isLoading` | `boolean` | `false` | Shows loading spinner when true |

## Question Object Structure

```typescript
interface Question {
  set_type: string;        // Type of question set (e.g., "interviewer_experience")
  category: string;        // Question category (e.g., "Performance")
  difficulty: string;      // Difficulty level: "Easy", "Medium", or "Hard"
  question: string;        // Main question text
  why_this_question: string;  // Explanation of relevance
  expected_depth: string;  // What's expected in the answer
  follow_ups: string[];    // Array of follow-up questions
}
```

## Styling

The component uses:
- **shadcn/ui Card components** for consistent card styling
- **Tailwind CSS** for responsive layout and utilities
- **lucide-react icons** (Info, Loader2)
- **Dark mode support** via Tailwind's dark mode classes

### Color Coding

**Difficulty Badges:**
- Easy: Green (`bg-green-100 text-green-800`)
- Medium: Yellow (`bg-yellow-100 text-yellow-800`)
- Hard: Red (`bg-red-100 text-red-800`)

**Category Badges:**
- Dynamically colored based on category name hash
- Uses blue, purple, pink, indigo, and cyan variants

## Responsive Breakpoints

- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: Two column grid
- **Desktop (≥ 1024px)**: Three column grid

## Demo

Visit `/interview-results-demo` to see the component in action with sample data.

## Dependencies

- React 19+
- shadcn/ui components (Card, CardContent, CardHeader, CardTitle, CardDescription)
- lucide-react (Info, Loader2 icons)
- Tailwind CSS

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- Color contrast meets WCAG AA standards
- Responsive typography for readability
- Icon with descriptive context (Info icon for "Expected Depth")

## Future Enhancements

- Add filtering/sorting by category or difficulty
- Add search functionality
- Add export to PDF feature
- Add bookmark/favorite questions
- Add progress tracking for answered questions
