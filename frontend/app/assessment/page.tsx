"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  INTEREST_QUESTIONS,
  STRENGTH_QUESTIONS,
  CAREER_QUESTIONS,
  BUDGET_QUESTIONS,
  CONTEXT_QUESTIONS,
} from "@/lib/options";

import { api } from "@/lib/api";
import { storeSessionId } from "@/lib/session";
import type { AssessmentAnswers } from "@/types";
import { useI18n } from "@/i18n/I18nProvider";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Step = 1 | 2 | 3 | 4 | 5;

type AnswerMap = Record<string, string>;

type MultiAnswerMap = Record<string, string[]>;


/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AssessmentPage() {
  const router = useRouter();
  const { lang } = useI18n();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * Interests:
   * Each question can have up to 3 selected options.
   *
   * Example:
   * {
   *   interest_1: ["mathematics", "technology"],
   *   interest_2: ["business"]
   * }
   */
  const [interestAnswers, setInterestAnswers] =
    useState<MultiAnswerMap>({});

  /*
   * Strengths:
   * Each question can have up to 2 selected options.
   */
  const [strengthAnswers, setStrengthAnswers] =
    useState<MultiAnswerMap>({});

  /*
   * Career:
   * One answer per question.
   */
  const [careerAnswers, setCareerAnswers] =
    useState<AnswerMap>({});

  /*
   * Budget:
   * One answer per question.
   */
  const [budgetAnswers, setBudgetAnswers] =
    useState<AnswerMap>({});

  /*
   * Context:
   * One answer per question.
   */
  const [contextAnswers, setContextAnswers] =
    useState<AnswerMap>({});

  /* ------------------------------------------------------------------------ */
  /* Step information                                                         */
  /* ------------------------------------------------------------------------ */

  const stepTitles = {
    1: {
      en: "Your Interests",
      km: "ចំណាប់អារម្មណ៍របស់អ្នក",
    },
    2: {
      en: "Your Strengths",
      km: "ចំណុចខ្លាំងរបស់អ្នក",
    },
    3: {
      en: "Your Career Goals",
      km: "គោលដៅអាជីពរបស់អ្នក",
    },
    4: {
      en: "Your Budget",
      km: "ថវិការបស់អ្នក",
    },
    5: {
      en: "Your Situation",
      km: "ស្ថានភាពរបស់អ្នក",
    },
  };

  const stepDescriptions = {
    1: {
      en: "Tell us what subjects, activities, and topics interest you.",
      km: "ប្រាប់យើងអំពីមុខវិជ្ជា សកម្មភាព និងប្រធានបទដែលអ្នកចាប់អារម្មណ៍។",
    },
    2: {
      en: "Tell us about the abilities you feel strongest in.",
      km: "ប្រាប់យើងអំពីសមត្ថភាពដែលអ្នកមានភាពរឹងមាំជាងគេ។",
    },
    3: {
      en: "Tell us what kind of career you want to explore.",
      km: "ប្រាប់យើងអំពីប្រភេទអាជីពដែលអ្នកចង់ស្វែងយល់។",
    },
    4: {
      en: "Tell us about your university budget and financial needs.",
      km: "ប្រាប់យើងអំពីថវិកាសម្រាប់សាកលវិទ្យាល័យ និងតម្រូវការផ្នែកហិរញ្ញវត្ថុរបស់អ្នក។",
    },
    5: {
      en: "Tell us a little about your current situation.",
      km: "ប្រាប់យើងបន្តិចអំពីស្ថានភាពបច្ចុប្បន្នរបស់អ្នក។",
    },
  };

  /* ------------------------------------------------------------------------ */
  /* Interest selection                                                       */
  /* ------------------------------------------------------------------------ */

  const toggleInterest = (
    questionId: string,
    value: string
  ) => {
    setInterestAnswers((previous) => {
      const current = previous[questionId] ?? [];

      /*
       * Remove the value if it is already selected.
       */
      if (current.includes(value)) {
        return {
          ...previous,
          [questionId]: current.filter((item) => item !== value),
        };
      }

      /*
       * Maximum 3 selections per question.
       */
      if (current.length >= 3) {
        return previous;
      }

      return {
        ...previous,
        [questionId]: [...current, value],
      };
    });
  };

  /* ------------------------------------------------------------------------ */
  /* Strength selection                                                       */
  /* ------------------------------------------------------------------------ */

  const toggleStrength = (
    questionId: string,
    value: string
  ) => {
    setStrengthAnswers((previous) => {
      const current = previous[questionId] ?? [];

      /*
       * Remove the value if already selected.
       */
      if (current.includes(value)) {
        return {
          ...previous,
          [questionId]: current.filter((item) => item !== value),
        };
      }

      /*
       * Maximum 2 selections per question.
       */
      if (current.length >= 2) {
        return previous;
      }

      return {
        ...previous,
        [questionId]: [...current, value],
      };
    });
  };

  /* ------------------------------------------------------------------------ */
  /* Single selection                                                         */
  /* ------------------------------------------------------------------------ */

  const selectCareer = (
    questionId: string,
    value: string
  ) => {
    setCareerAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  };

  const selectBudget = (
    questionId: string,
    value: string
  ) => {
    setBudgetAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  };

  const selectContext = (
    questionId: string,
    value: string
  ) => {
    setContextAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  };

  /* ------------------------------------------------------------------------ */
  /* Validation                                                               */
  /* ------------------------------------------------------------------------ */

  const isStepComplete = useMemo(() => {
    switch (step) {
      case 1:
        return INTEREST_QUESTIONS.every(
          (question) =>
            (interestAnswers[question.id] ?? []).length > 0
        );

      case 2:
        return STRENGTH_QUESTIONS.every(
          (question) =>
            (strengthAnswers[question.id] ?? []).length > 0
        );

      case 3:
        return CAREER_QUESTIONS.every(
          (question) =>
            Boolean(careerAnswers[question.id])
        );

      case 4:
        return BUDGET_QUESTIONS.every(
          (question) =>
            Boolean(budgetAnswers[question.id])
        );

      case 5:
        return CONTEXT_QUESTIONS.every(
          (question) =>
            Boolean(contextAnswers[question.id])
        );

      default:
        return false;
    }
  }, [
    step,
    interestAnswers,
    strengthAnswers,
    careerAnswers,
    budgetAnswers,
    contextAnswers,
  ]);

  /* ------------------------------------------------------------------------ */
  /* Count answers                                                            */
  /* ------------------------------------------------------------------------ */

  const countAnswers = () => {
    const interests = Object.values(interestAnswers).reduce(
      (total, answers) => total + answers.length,
      0
    );

    const strengths = Object.values(strengthAnswers).reduce(
      (total, answers) => total + answers.length,
      0
    );

    const careers = Object.values(careerAnswers).filter(Boolean)
      .length;

    const budgets = Object.values(budgetAnswers).filter(Boolean)
      .length;

    const context = Object.values(contextAnswers).filter(Boolean)
      .length;

    return interests + strengths + careers + budgets + context;
  };

  /* ------------------------------------------------------------------------ */
  /* Get most common answer                                                   */
  /* ------------------------------------------------------------------------ */

  const getMostCommonAnswer = (
    answers: AnswerMap
  ): string => {
    const values = Object.values(answers).filter(Boolean);

    if (!values.length) {
      return "";
    }

    const counts: Record<string, number> = {};

    for (const value of values) {
      counts[value] = (counts[value] ?? 0) + 1;
    }

    return Object.entries(counts).sort(
      ([, countA], [, countB]) => countB - countA
    )[0][0];
  };

  /* ------------------------------------------------------------------------ */
  /* Build API payload                                                        */
  /* ------------------------------------------------------------------------ */

  const buildAssessmentAnswers = (): AssessmentAnswers => {
    /*
     * Flatten all interest answers:
     *
     * {
     *   interest_1: ["mathematics", "technology"],
     *   interest_2: ["business"]
     * }
     *
     * becomes:
     *
     * ["mathematics", "technology", "business"]
     */
    const interests = Array.from(
      new Set(
        Object.values(interestAnswers).flat()
      )
    );

    /*
     * Same thing for strengths.
     */
    const strengths = Array.from(
      new Set(
        Object.values(strengthAnswers).flat()
      )
    );

    /*
     * Since the backend currently expects one career,
     * use the most frequently selected career.
     */
    const career = getMostCommonAnswer(careerAnswers);

    /*
     * The recommendation engine currently uses budget_1
     * as the student's budget.
     */
    const budget = budgetAnswers["budget_1"] ?? "";

    /*
     * The current options.ts has context_1 as location.
     */
    const location = contextAnswers["context_1"] ?? "";

    return {
      interests,
      strengths,
      career,
      budget,
      location,
    };
  };

  /* ------------------------------------------------------------------------ */
  /* Submit assessment                                                        */
  /* ------------------------------------------------------------------------ */

  const submitAssessment = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const answers = buildAssessmentAnswers();

      const result = await api.submitAssessment(answers);

      storeSessionId(result.session_id);

      router.push("/recommendations");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : lang === "en"
            ? "Something went wrong. Please try again."
            : "មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត។"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Navigation                                                                */
  /* ------------------------------------------------------------------------ */

  const goNext = async () => {
    if (!isStepComplete) {
      return;
    }

    if (step === 5) {
      await submitAssessment();
      return;
    }

    setStep((previous) =>
      Math.min(5, previous + 1) as Step
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    if (step === 1) {
      router.back();
      return;
    }

    setStep((previous) =>
      Math.max(1, previous - 1) as Step
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ------------------------------------------------------------------------ */
  /* Question groups                                                           */
  /* ------------------------------------------------------------------------ */

  const questions = {
    interests: INTEREST_QUESTIONS,
    strengths: STRENGTH_QUESTIONS,
    careers: CAREER_QUESTIONS,
    budgets: BUDGET_QUESTIONS,
    context: CONTEXT_QUESTIONS,
  };

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header className="sticky top-0 z-20 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-4 sm:px-6">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {lang === "en" ? "Back" : "ត្រឡប់ក្រោយ"}
          </button>

          <div className="ml-auto text-sm text-gray-500">
            {countAnswers()} {lang === "en" ? "answers" : "ចម្លើយ"}
          </div>

        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Progress                                                           */}
      {/* ------------------------------------------------------------------ */}

      <div className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-900">
              {lang === "en"
                ? `Step ${step} of 5`
                : `ជំហាន ${step} នៃ 5`}
            </span>

            <span className="text-gray-500">
              {Math.round((step / 5) * 100)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-300"
              style={{
                width: `${(step / 5) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                            */}
      {/* ------------------------------------------------------------------ */}

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-green-800">
            {stepTitles[step][lang]}
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {stepTitles[step][lang]}
          </h1>

          <p className="mt-2 max-w-2xl text-gray-600">
            {stepDescriptions[step][lang]}
          </p>
        </div>

        {/* ================================================================ */}
        {/* STEP 1 — INTERESTS                                               */}
        {/* ================================================================ */}

        {step === 1 && (
          <div className="space-y-8">
            {questions.interests.map((question, questionIndex) => {
              const selected =
                interestAnswers[question.id] ?? [];

              return (
                <QuestionCard
                  key={question.id}
                  number={questionIndex + 1}
                  question={question.question[lang]}
                  hint={
                      lang === "en"
                        ? `Select up to 3 · ${selected.length}/3 selected`
                        : `ជ្រើសរើសរហូតដល់ 3 · បានជ្រើសរើស ${selected.length}/3`
                    }
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const value = option.interests[0];
                      const isSelected =
                        selected.includes(value);

                      return (
                        <OptionButton
                          key={value}
                          selected={isSelected}
                          onClick={() =>
                            toggleInterest(
                              question.id,
                              value
                            )
                          }
                        >
                          {option.label[lang]}
                        </OptionButton>
                      );
                    })}
                  </div>
                </QuestionCard>
              );
            })}
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 2 — STRENGTHS                                               */}
        {/* ================================================================ */}

        {step === 2 && (
          <div className="space-y-8">
            {questions.strengths.map(
              (question, questionIndex) => {
                const selected =
                  strengthAnswers[question.id] ?? [];

                return (
                  <QuestionCard
                    key={question.id}
                    number={questionIndex + 1}
                    question={question.question[lang]}
                    hint={
                      lang === "en"
                        ? `Select up to 2 · ${selected.length}/2 selected`
                        : `ជ្រើសរើសរហូតដល់ 2 · បានជ្រើសរើស ${selected.length}/2`
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {question.options.map((option) => {
                        const value = option.strengths[0];

                        const isSelected =
                          selected.includes(value);

                        return (
                          <OptionButton
                            key={value}
                            selected={isSelected}
                            onClick={() =>
                              toggleStrength(
                                question.id,
                                value
                              )
                            }
                          >
                            {option.label[lang]}
                          </OptionButton>
                        );
                      })}
                    </div>
                  </QuestionCard>
                );
              }
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 3 — CAREER                                                  */}
        {/* ================================================================ */}

        {step === 3 && (
          <div className="space-y-8">
            {questions.careers.map(
              (question, questionIndex) => {
                const selected =
                  careerAnswers[question.id];

                return (
                  <QuestionCard
                    key={question.id}
                    number={questionIndex + 1}
                    question={question.question[lang]}
                    hint={
                      lang === "en"
                        ? "Select one answer"
                        : "ជ្រើសរើសចម្លើយមួយ"
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {question.options.map((option) => {
                        const value = option.career;

                        return (
                          <OptionButton
                            key={value}
                            selected={selected === value}
                            onClick={() =>
                              selectCareer(
                                question.id,
                                value
                              )
                            }
                          >
                            {option.label[lang]}
                          </OptionButton>
                        );
                      })}
                    </div>
                  </QuestionCard>
                );
              }
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 4 — BUDGET                                                  */}
        {/* ================================================================ */}

        {step === 4 && (
          <div className="space-y-8">
            {questions.budgets.map(
              (question, questionIndex) => {
                const selected =
                  budgetAnswers[question.id];

                return (
                  <QuestionCard
                    key={question.id}
                    number={questionIndex + 1}
                    question={question.question[lang]}
                    hint={
                      lang === "en"
                        ? "Select one answer"
                        : "ជ្រើសរើសចម្លើយមួយ"
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {question.options.map((option) => {
                        const value =
                          "budget" in option
                            ? option.budget
                            : option.budget_support;

                        return (
                          <OptionButton
                            key={value}
                            selected={selected === value}
                            onClick={() =>
                              selectBudget(
                                question.id,
                                value
                              )
                            }
                          >
                            {option.label[lang]}
                          </OptionButton>
                        );
                      })}
                    </div>
                  </QuestionCard>
                );
              }
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* STEP 5 — CONTEXT                                                 */}
        {/* ================================================================ */}

        {step === 5 && (
          <div className="space-y-8">
            {questions.context.map(
              (question, questionIndex) => {
                const selected =
                  contextAnswers[question.id];

                return (
                  <QuestionCard
                    key={question.id}
                    number={questionIndex + 1}
                    question={question.question[lang]}
                    hint={
                      lang === "en"
                        ? "Select one answer"
                        : "ជ្រើសរើសចម្លើយមួយ"
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {question.options.map((option) => {
                        const value = option.location;

                        return (
                          <OptionButton
                            key={value}
                            selected={selected === value}
                            onClick={() =>
                              selectContext(
                                question.id,
                                value
                              )
                            }
                          >
                            {option.label[lang]}
                          </OptionButton>
                        );
                      })}
                    </div>
                  </QuestionCard>
                );
              }
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Error                                                              */}
        {/* ------------------------------------------------------------------ */}

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Navigation                                                         */}
        {/* ------------------------------------------------------------------ */}

        <div className="mt-10 flex items-center justify-between border-t pt-6">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
            {lang === "en" ? "Previous" : "មុន"}
          </button>

          <button
            type="button"
            disabled={!isStepComplete || isSubmitting}
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? lang === "en"
                ? "Finding your matches..."
                : "កំពុងស្វែងរកជម្រើសសមស្រប..."
              : step === 5
                ? lang === "en"
                  ? "See My Recommendations"
                  : "មើលការណែនាំរបស់ខ្ញុំ"
                : lang === "en"
                  ? "Continue"
                  : "បន្ត"}

            {!isSubmitting && step !== 5 && (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* Question Card                                                              */
/* ========================================================================== */

function QuestionCard({
  number,
  question,
  hint,
  children,
}: {
  number: number;
  question: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <div className="mb-2 flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-semibold text-black-600">
            {number}
          </span>

          <h2 className="text-base font-semibold leading-7 text-gray-900 sm:text-lg">
            {question}
          </h2>
        </div>

        {hint && (
          <p className="ml-10 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

/* ========================================================================== */
/* Option Button                                                              */
/* ========================================================================== */

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "group relative flex min-h-14 w-full items-center rounded-xl border p-4 text-left text-sm transition",
        "focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
        selected
          ? "border-green-600 bg-green-50 text-green-900"
          : "border-gray-200 bg-white text-gray-700 hover:border-green-400 hover:bg-gray-50",
      ].join(" ")}
    >
      <span
        className={[
          "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition",
          selected
            ? "border-green-600 bg-green-600 text-white"
            : "border-gray-300 bg-white group-hover:border-green-400",
        ].join(" ")}
      >
        {selected && (
          <Check className="h-3.5 w-3.5" />
        )}
      </span>

      <span className="leading-6">
        {children}
      </span>
    </button>
  );
}