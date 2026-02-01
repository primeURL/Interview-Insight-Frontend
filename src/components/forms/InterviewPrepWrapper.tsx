import * as React from "react";
import { InterviewPrepContainer } from "./InterviewPrepContainer";

type ViewState = "form" | "loading" | "results" | "error";

export function InterviewPrepWrapper() {
  const [viewState, setViewState] = React.useState<ViewState>("form");

  const showHeaderAndInstructions = viewState === "form" || viewState === "error";

  return (
    <>
      {/* Page Header - Hidden when showing results or loading */}
      {showHeaderAndInstructions && (
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-in fade-in duration-500">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
            Interview Preparation Platform
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Get personalized interview questions tailored to your interviewer's background and your target role. 
            Simply provide the interviewer's LinkedIn profile and your candidate details to receive customized questions 
            with learning resources.
          </p>
        </div>
      )}

      {/* Instructions - Hidden when showing results or loading */}
      {showHeaderAndInstructions && (
        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
            How It Works
          </h2>
          <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold">
                1
              </span>
              <span className="pt-0.5">
                Enter your interviewer's LinkedIn profile URL to analyze their background and expertise
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold">
                2
              </span>
              <span className="pt-0.5">
                Provide your candidate details including position, skills, and experience level
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold">
                3
              </span>
              <span className="pt-0.5">
                Receive personalized interview questions with explanations, expected depth, and learning resources
              </span>
            </li>
          </ol>
        </div>
      )}

      {/* Main Content - Interview Prep Form and Results */}
      <div className="max-w-6xl mx-auto">
        <InterviewPrepContainer onViewStateChange={setViewState} />
      </div>
    </>
  );
}
