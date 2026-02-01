import * as React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight, HelpCircle, Loader2 } from "lucide-react";

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

const getDifficultyOrder = (difficulty: string): number => {
  const lower = difficulty.toLowerCase();
  if (lower === "easy") return 1;
  if (lower === "medium") return 2;
  if (lower === "hard") return 3;
  return 4;
};

const getDifficultyStyles = (difficulty: string) => {
  const lower = difficulty.toLowerCase();
  if (lower === "easy") {
    return {
      badge: "bg-white text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-2 border-emerald-600 dark:border-emerald-500/20",
      glow: "shadow-emerald-500/20"
    };
  }
  if (lower === "medium") {
    return {
      badge: "bg-white text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-2 border-amber-600 dark:border-amber-500/20",
      glow: "shadow-amber-500/20"
    };
  }
  if (lower === "hard") {
    return {
      badge: "bg-white text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-2 border-rose-600 dark:border-rose-500/20",
      glow: "shadow-rose-500/20"
    };
  }
  return {
    badge: "bg-white text-slate-700 dark:bg-slate-500/20 dark:text-slate-400 border-2 border-slate-600 dark:border-slate-500/20",
    glow: "shadow-slate-500/20"
  };
};

const getSetTypeStyles = (setType: string) => {
  if (setType === "interviewer_experience") {
    return {
      gradient: "from-white via-white to-white dark:from-violet-500/10 dark:via-purple-500/10 dark:to-fuchsia-500/10",
      border: "border-slate-200 dark:border-violet-500/20",
      icon: "bg-gradient-to-br from-violet-500 to-purple-600",
      text: "text-slate-900 dark:text-violet-300"
    };
  }
  if (setType === "candidate_experience") {
    return {
      gradient: "from-white via-white to-white dark:from-blue-500/10 dark:via-cyan-500/10 dark:to-teal-500/10",
      border: "border-slate-200 dark:border-blue-500/20",
      icon: "bg-gradient-to-br from-blue-500 to-cyan-600",
      text: "text-slate-900 dark:text-blue-300"
    };
  }
  return {
    gradient: "from-white via-white to-white dark:from-pink-500/10 dark:via-rose-500/10 dark:to-orange-500/10",
    border: "border-slate-200 dark:border-pink-500/20",
    icon: "bg-gradient-to-br from-pink-500 to-rose-600",
    text: "text-slate-900 dark:text-pink-300"
  };
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
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    interviewer_experience: true,
    candidate_experience: true,
    mixed: true,
  });

  const [expandedFollowUps, setExpandedFollowUps] = React.useState<Record<string, boolean>>({});
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <Card className="w-full border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <div className="absolute inset-0 h-16 w-16 animate-ping text-primary/20">
                <Loader2 className="h-16 w-16" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">Generating your interview questions...</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Analyzing interviewer profile and crafting personalized questions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return null;
  }

  // Group and sort questions
  const groupedQuestions = questions.reduce((acc, question) => {
    const setType = question.set_type;
    if (!acc[setType]) {
      acc[setType] = [];
    }
    acc[setType].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  // Sort questions within each group by difficulty
  Object.keys(groupedQuestions).forEach((setType) => {
    groupedQuestions[setType].sort((a, b) => 
      getDifficultyOrder(a.difficulty) - getDifficultyOrder(b.difficulty)
    );
  });

  const toggleSection = (setType: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [setType]: !prev[setType]
    }));
  };

  const toggleFollowUps = (questionId: string) => {
    setExpandedFollowUps(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleTooltip = (questionId: string) => {
    setActiveTooltip(prev => prev === questionId ? null : questionId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Elegant Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 p-8 shadow-lg dark:shadow-xl">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Interview Questions Ready
            </span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:bg-gradient-to-br dark:from-slate-100 dark:via-slate-200 dark:to-slate-400 dark:bg-clip-text dark:text-transparent">
            Your Personalized Interview Prep
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-400 max-w-3xl">
            {questions.length} carefully crafted question{questions.length !== 1 ? "s" : ""} tailored to the interviewer's expertise and your profile
          </p>
        </div>
      </div>

      {/* Question Sections */}
      <div className="space-y-6">
        {Object.entries(groupedQuestions).map(([setType, setQuestions]) => {
          const styles = getSetTypeStyles(setType);
          const isExpanded = expandedSections[setType];

          return (
            <div key={setType} className="space-y-4">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(setType)}
                className="w-full group"
              >
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${styles.gradient} border-2 ${styles.border} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${styles.icon} p-3 rounded-lg shadow-lg`}>
                        <div className="h-6 w-6 text-white font-bold flex items-center justify-center">
                          {setQuestions.length}
                        </div>
                      </div>
                      <div className="text-left">
                        <h3 className={`text-2xl font-bold ${styles.text}`}>
                          {getSetTypeLabel(setType)}
                        </h3>
                        <p className="text-sm text-slate-900 dark:text-slate-400 mt-1 font-medium">
                          {setQuestions.length} question{setQuestions.length !== 1 ? "s" : ""} • 
                          {" "}{setQuestions.filter(q => q.difficulty.toLowerCase() === "easy").length} Easy • 
                          {" "}{setQuestions.filter(q => q.difficulty.toLowerCase() === "medium").length} Medium • 
                          {" "}{setQuestions.filter(q => q.difficulty.toLowerCase() === "hard").length} Hard
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                        <ChevronDown className="h-6 w-6 text-slate-900 dark:text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Questions List */}
              {isExpanded && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                  {setQuestions.map((question, index) => {
                    const questionId = `${setType}-${index}`;
                    const difficultyStyles = getDifficultyStyles(question.difficulty);
                    const hasFollowUps = question.follow_ups && question.follow_ups.length > 0;
                    const followUpsExpanded = expandedFollowUps[questionId];
                    const tooltipActive = activeTooltip === questionId;

                    return (
                      <Card 
                        key={questionId}
                        className="group relative overflow-hidden border-2 border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white dark:bg-slate-950"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <CardContent className="relative p-6 space-y-4">
                          {/* Question Header */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              {/* Badges */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 border-2 border-slate-900 dark:border-slate-700">
                                  Q{index + 1}
                                </span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${difficultyStyles.badge}`}>
                                  {question.difficulty}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-500/20">
                                  {question.category}
                                </span>
                              </div>

                              {/* Question Text */}
                              <div className="flex items-start gap-3">
                                <h4 className="text-lg font-semibold text-black dark:text-slate-100 leading-relaxed flex-1">
                                  {question.question}
                                </h4>
                                
                                {/* Tooltip Icon */}
                                <div className="relative">
                                  <button
                                    onClick={() => toggleTooltip(questionId)}
                                    className="flex-shrink-0 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 group/tooltip"
                                    aria-label="Why this question"
                                  >
                                    <HelpCircle className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover/tooltip:text-primary transition-colors" />
                                  </button>
                                  
                                  {/* Tooltip Content */}
                                  {tooltipActive && (
                                    <div className="absolute right-0 top-full mt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                      <div className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 rounded-lg shadow-2xl p-4 border border-slate-700 dark:border-slate-300">
                                        <div className="absolute -top-2 right-6 w-4 h-4 bg-slate-900 dark:bg-slate-100 border-l border-t border-slate-700 dark:border-slate-300 transform rotate-45" />
                                        <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400 dark:text-slate-600">
                                          Why This Question
                                        </p>
                                        <p className="text-sm leading-relaxed">
                                          {question.why_this_question}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Expected Depth */}
                          <div className="rounded-lg bg-white dark:bg-slate-900/50 p-4 border-2 border-slate-900 dark:border-slate-800">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-2">
                              Expected Depth
                            </p>
                            <p className="text-sm text-black dark:text-slate-300 leading-relaxed">
                              {question.expected_depth}
                            </p>
                          </div>

                          {/* Follow-up Questions */}
                          {hasFollowUps && (
                            <div className="space-y-2">
                              <button
                                onClick={() => toggleFollowUps(questionId)}
                                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/followup"
                              >
                                <div className={`transition-transform duration-200 ${followUpsExpanded ? "rotate-90" : ""}`}>
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                                <span>Follow-up Questions ({question.follow_ups.length})</span>
                              </button>

                              {followUpsExpanded && (
                                <div className="ml-6 space-y-2 animate-in slide-in-from-left-4 duration-300">
                                  {question.follow_ups.map((followUp, followUpIndex) => (
                                    <div
                                      key={followUpIndex}
                                      className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-primary/5 border-2 border-slate-900 dark:border-primary/10 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors duration-200"
                                    >
                                      <div className="flex-shrink-0 mt-0.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                      </div>
                                      <p className="text-sm text-black dark:text-slate-300 leading-relaxed">
                                        {followUp}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
