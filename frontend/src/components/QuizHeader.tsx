interface QuizHeaderProps {
  title: string;
  description: string;
}

export function QuizHeader({ title, description }: QuizHeaderProps) {
  return (
    <header className="quiz-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
