interface Choice {
  id: string;
  text: string;
}

interface QuestionCardProps {
  questionId: string;
  text: string;
  choices: Choice[];
  selectedChoiceId?: string;
  onSelect: (choiceId: string) => void;
}

export function QuestionCard({
  text,
  choices,
  selectedChoiceId,
  onSelect,
}: QuestionCardProps) {
  return (
    <article className="question-card">
      <div className="question-title">{text}</div>
      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className={`choice-button ${selectedChoiceId === choice.id ? "selected" : ""}`}
            onClick={() => onSelect(choice.id)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </article>
  );
}
