import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { QuizHeader } from "./components/QuizHeader";
import { ProgressBar } from "./components/ProgressBar";
import { QuestionCard } from "./components/QuestionCard";
import { ResultCard } from "./components/ResultCard";
import { LoadingState } from "./components/LoadingState";

type Choice = { id: string; text: string };
type Question = { id: string; text: string; choices: Choice[] };
type QuizResponse = {
  quiz: { title: string; description: string };
  questions: Question[];
};
type AIResult = {
  result: {
    typeCode: string;
    title: string;
    subtitle: string;
    summary: string;
    strengths: string[];
    risks: string[];
    shareText: string;
  };
  traits: {
    builder: number;
    planner: number;
    speed: number;
    stability: number;
  };
  meta: {
    provider: string;
    responseCount: number;
  };
};

type QuizStep = "loading" | "quiz" | "result" | "error";

const API_BASE = import.meta.env.DEV ? "http://127.0.0.1:8000" : "";

function App() {
  // 데이터 상태
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [result, setResult] = useState<AIResult | null>(null);

  // UI 상태
  const [quizStep, setQuizStep] = useState<QuizStep>("loading");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnswersModal, setShowAnswersModal] = useState(false);

  // 초기 로드: 퀴즈 데이터 가져오기
  useEffect(() => {
    const controller = new AbortController();

    async function loadQuiz() {
      setQuizStep("loading");
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/api/quiz/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Quiz API error: ${response.status}`);
        }

        const payload: QuizResponse = await response.json();
        setQuiz(payload);
        setQuizStep("quiz");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(
            "백엔드에서 퀴즈를 불러오지 못했습니다. 서버가 실행 중인지 확인하세요.",
          );
          setQuizStep("error");
        }
      }
    }

    loadQuiz();

    return () => controller.abort();
  }, []);

  // 진행률 계산
  const progress = useMemo(() => {
    if (!quiz) return 0;
    return Object.keys(answers).length;
  }, [answers, quiz]);

  // 모든 질문을 답했는지 확인
  const isAllAnswered = useMemo(() => {
    if (!quiz) return false;
    return quiz.questions.every((q) => answers[q.id]);
  }, [answers, quiz]);

  // 현재 질문 객체
  const current = quiz?.questions[currentQuestion];

  // 답변 선택
  const handleSelectAnswer = (choiceId: string) => {
    if (!current) return;
    setAnswers((prev) => ({
      ...prev,
      [current.id]: choiceId,
    }));
  };

  // 이전 질문으로
  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  // 다음 질문으로
  const handleNextQuestion = () => {
    if (!quiz) return;
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // 결과 제출
  const handleSubmitAnswers = async () => {
    if (!quiz) return;
    if (!isAllAnswered) {
      setError("모든 질문에 답해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        answers: quiz.questions.map((question) => ({
          questionId: question.id,
          choiceId: answers[question.id],
        })),
      };

      const response = await fetch(`${API_BASE}/api/submissions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Submission failed: ${response.status}\n${errorBody}`);
      }

      const responseBody: AIResult = await response.json();
      setResult(responseBody);
      setQuizStep("result");
    } catch (err) {
      setError(
        "결과를 생성하는 데 실패했습니다. 백엔드 서버 또는 AI 환경을 확인하세요.",
      );
      setQuizStep("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 다시 테스트
  const handleRetry = () => {
    setQuizStep("quiz");
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setError(null);
  };

  // 결과 공유
  const handleShare = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.result.shareText);
    alert("공유 텍스트가 복사되었습니다!");
  };

  // 로딩 상태
  if (quizStep === "loading") {
    return <LoadingState message="퀴즈를 불러오는 중입니다..." />;
  }

  // 에러 상태
  if (quizStep === "error" || !quiz) {
    return (
      <main className="app-shell">
        <div className="error-banner">{error || "오류가 발생했습니다."}</div>
        <button
          onClick={() => {
            setQuizStep("loading");
            window.location.reload();
          }}
          className="error-retry-btn"
        >
          다시 시도
        </button>
      </main>
    );
  }

  // 결과 화면
  if (quizStep === "result" && result) {
    return (
      <main className="app-shell">
        <ResultCard
          result={result.result}
          traits={result.traits}
          onRetry={handleRetry}
          onShare={handleShare}
          onViewAnswers={() => setShowAnswersModal(!showAnswersModal)}
        />

        {/* 답변 모달 */}
        {showAnswersModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowAnswersModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>내 답변</h2>
              <ul className="answers-list">
                {quiz.questions.map((q) => {
                  const choiceText = q.choices.find(
                    (c) => c.id === answers[q.id],
                  )?.text;
                  return (
                    <li key={q.id}>
                      <strong>{q.text}</strong>
                      <p>{choiceText}</p>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() => setShowAnswersModal(false)}
                className="modal-close-btn"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  // 퀴즈 화면 (페이지네이션)
  return (
    <main className="app-shell">
      <QuizHeader title={quiz.quiz.title} description={quiz.quiz.description} />

      <ProgressBar current={progress + 1} total={quiz.questions.length} />

      {error && <div className="error-banner">{error}</div>}

      {current && (
        <section className="quiz-container">
          <div className="question-counter">
            {currentQuestion + 1} / {quiz.questions.length}
          </div>

          <QuestionCard
            questionId={current.id}
            text={current.text}
            choices={current.choices}
            selectedChoiceId={answers[current.id]}
            onSelect={handleSelectAnswer}
          />

          {/* 네비게이션 버튼 */}
          <div className="pagination-controls">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="btn btn-secondary"
            >
              ← 이전
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmitAnswers}
                disabled={!isAllAnswered || isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? "제출 중..." : "결과 보기"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="btn btn-primary"
              >
                다음 →
              </button>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
