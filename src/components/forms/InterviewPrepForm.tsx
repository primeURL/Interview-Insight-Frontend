import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InterviewPrepFormProps {
  onSubmit?: (data: FormData) => void;
  isLoading?: boolean;
}

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

export function InterviewPrepForm({
  onSubmit,
  isLoading = false,
}: InterviewPrepFormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    interviewer_details: {
      linkedin_url: "",
      about: "",
      mock: false,
    },
    candidate_details: {
      position: "",
      skills: "",
      experience: "",
    },
  });

  const [errors, setErrors] = React.useState<{
    linkedin_url?: string;
    position?: string;
    skills?: string;
    experience?: string;
  }>({});

  const validateLinkedInUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i;
    return linkedInPattern.test(url);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.interviewer_details.linkedin_url.trim()) {
      newErrors.linkedin_url = "LinkedIn URL is required";
    } else if (!validateLinkedInUrl(formData.interviewer_details.linkedin_url)) {
      newErrors.linkedin_url = "Please enter a valid LinkedIn profile URL";
    }

    if (!formData.candidate_details.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.candidate_details.skills.trim()) {
      newErrors.skills = "Skills are required";
    }

    if (!formData.candidate_details.experience.trim()) {
      newErrors.experience = "Experience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | boolean,
    section: "interviewer_details" | "candidate_details"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl sm:text-3xl">
          Interview Preparation Platform
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Generate personalized interview questions based on your interviewer's
          background and your target role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Interviewer Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Interviewer Details</h3>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">
                LinkedIn Profile URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="linkedin_url"
                type="url"
                placeholder="https://www.linkedin.com/in/username"
                value={formData.interviewer_details.linkedin_url}
                onChange={(e) =>
                  handleInputChange(
                    "linkedin_url",
                    e.target.value,
                    "interviewer_details"
                  )
                }
                disabled={isLoading}
                className={errors.linkedin_url ? "border-destructive" : ""}
              />
              {errors.linkedin_url && (
                <p className="text-sm text-destructive">{errors.linkedin_url}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About (Optional)</Label>
              <Textarea
                id="about"
                placeholder="Additional information about the interviewer..."
                value={formData.interviewer_details.about}
                onChange={(e) =>
                  handleInputChange("about", e.target.value, "interviewer_details")
                }
                disabled={isLoading}
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mock"
                checked={formData.interviewer_details.mock}
                onCheckedChange={(checked) =>
                  handleInputChange("mock", checked === true, "interviewer_details")
                }
                disabled={isLoading}
              />
              <Label
                htmlFor="mock"
                className="text-sm font-normal cursor-pointer"
              >
                Enable mock mode (for testing)
              </Label>
            </div>
          </div>

          {/* Candidate Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Candidate Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">
                  Position <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="position"
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={formData.candidate_details.position}
                  onChange={(e) =>
                    handleInputChange(
                      "position",
                      e.target.value,
                      "candidate_details"
                    )
                  }
                  disabled={isLoading}
                  className={errors.position ? "border-destructive" : ""}
                />
                {errors.position && (
                  <p className="text-sm text-destructive">{errors.position}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">
                  Experience <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="experience"
                  type="text"
                  placeholder='e.g., "3.6" or "fresher"'
                  value={formData.candidate_details.experience}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      e.target.value,
                      "candidate_details"
                    )
                  }
                  disabled={isLoading}
                  className={errors.experience ? "border-destructive" : ""}
                />
                {errors.experience && (
                  <p className="text-sm text-destructive">{errors.experience}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">
                Skills <span className="text-destructive">*</span>
              </Label>
              <Input
                id="skills"
                type="text"
                placeholder="e.g., React, Node, Python, AWS, LLMs (comma-separated)"
                value={formData.candidate_details.skills}
                onChange={(e) =>
                  handleInputChange("skills", e.target.value, "candidate_details")
                }
                disabled={isLoading}
                className={errors.skills ? "border-destructive" : ""}
              />
              {errors.skills && (
                <p className="text-sm text-destructive">{errors.skills}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Enter skills separated by commas
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto sm:min-w-[200px]"
              size="lg"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Questions...
                </>
              ) : (
                "Generate Interview Questions"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
