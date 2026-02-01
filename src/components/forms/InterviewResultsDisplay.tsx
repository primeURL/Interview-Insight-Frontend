import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info, Loader2 } from "lucide-react";

interface Question {
  set_type: string;
  category: string;
  difficulty: string;
  question: string;
  why_this_question: string;
  expected_depth: string;
  follow_ups: string[];
}

interface InterviewResultsDisplayProps {
  questions?: Question[];
  isLoading?: boolean;
}

const getDifficultyColor = (difficulty: string): string => {
  const lower = difficulty.toLowerCase();
  if (lower === "easy") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  if (lower === "medium") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
  if (lower === "hard") return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
};

const getCategoryColor = (category: string): string => {
  const colors = [
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  ];
  const hash = category.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const getSetTypeLabel = (setType: string): string => {
  return setType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function InterviewResultsDisplay({
  questions = [],
  isLoading = false,
}: InterviewResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium">Generating your interview questions...</p>
            <p className="text-sm text-muted-foreground">
              This may take a few moments
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Your Interview Questions</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {questions.length} personalized question{questions.length !== 1 ? "s" : ""} generated based on the interviewer's profile
        </p>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {questions.map((question, index) => (
          <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-3 pb-4">
              {/* Badges Row */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                  {getSetTypeLabel(question.set_type)}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
                  {question.category}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
              </div>

              {/* Question Text */}
              <CardTitle className="text-base sm:text-lg leading-snug">
                {question.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 pt-0">
              {/* Why This Question */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Why This Question
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {question.why_this_question}
                </p>
              </div>

              {/* Expected Depth */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Expected Depth
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {question.expected_depth}
                </p>
              </div>

              {/* Follow-up Questions */}
              {question.follow_ups && question.follow_ups.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Follow-up Questions
                  </p>
                  <ul className="space-y-2 pl-4">
                    {question.follow_ups.map((followUp, followUpIndex) => (
                      <li
                        key={followUpIndex}
                        className="text-sm text-muted-foreground leading-relaxed list-disc"
                      >
                        {followUp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
