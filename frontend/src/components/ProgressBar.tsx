interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  const percentageText = Math.round(percentage);

  return (
    <div className="progress-container">
      {/* 상단: 진행 정보 */}
      <div className="progress-info">
        <span className="progress-text">
          {current} / {total} 완료
        </span>
        <span className="progress-percentage">{percentageText}%</span>
      </div>

      {/* 중단: 진행률 바 */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>

      {/* 하단: 마일스톤 (선택) */}
      <div className="progress-milestones">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <div
            key={index}
            className={`milestone ${index < current ? "completed" : ""} ${
              index === current ? "active" : ""
            }`}
            title={`질문 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
