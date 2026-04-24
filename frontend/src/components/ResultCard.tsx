import { TraitsVisualization } from "./TraitsVisualization";

interface ResultData {
  typeCode: string;
  title: string;
  subtitle: string;
  summary: string;
  strengths: string[];
  risks: string[];
  shareText: string;
}

interface TraitsData {
  builder: number;
  planner: number;
  speed: number;
  stability: number;
}

interface ResultCardProps {
  result: ResultData;
  traits: TraitsData;
  onRetry: () => void;
  onShare: () => void;
  onViewAnswers: () => void;
}

export function ResultCard({
  result,
  traits,
  onRetry,
  onShare,
  onViewAnswers,
}: ResultCardProps) {
  return (
    <section className="result-card">
      {/* 상단: 타입코드 + 제목 */}
      <div className="result-header">
        <div className="type-badge">{result.typeCode}</div>
        <h2>{result.title}</h2>
        <p className="subtitle">{result.subtitle}</p>
      </div>

      {/* 중단: 요약 */}
      <div className="result-summary">
        <p>{result.summary}</p>
      </div>

      {/* 강점과 주의점 */}
      <div className="result-details">
        <div className="strengths-section">
          <h3>강점</h3>
          <ul>
            {result.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="risks-section">
          <h3>주의할 점</h3>
          <ul>
            {result.risks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 트레이트 시각화 */}
      <div className="result-traits">
        <h3>개발 성향 분석</h3>
        <TraitsVisualization
          builder={traits.builder}
          planner={traits.planner}
          speed={traits.speed}
          stability={traits.stability}
        />
      </div>

      {/* 공유 텍스트 */}
      <div className="result-share">
        <p className="share-text">{result.shareText}</p>
      </div>

      {/* 액션 버튼 */}
      <div className="result-actions">
        <button className="action-btn secondary" onClick={onViewAnswers}>
          내 답변 보기
        </button>
        <button className="action-btn secondary" onClick={onShare}>
          결과 공유
        </button>
        <button className="action-btn primary" onClick={onRetry}>
          다시 테스트
        </button>
      </div>
    </section>
  );
}
