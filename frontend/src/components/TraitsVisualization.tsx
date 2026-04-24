interface TraitsVisualizationProps {
  builder: number;
  planner: number;
  speed: number;
  stability: number;
}

export function TraitsVisualization({
  builder,
  planner,
  speed,
  stability,
}: TraitsVisualizationProps) {
  return (
    <div className="traits">
      <div className="trait-item">
        <strong>Builder</strong>
        <div className="trait-bar">
          <div style={{ width: `${builder}%` }}></div>
        </div>
        <span className="trait-value">{builder}</span>
      </div>

      <div className="trait-item">
        <strong>Planner</strong>
        <div className="trait-bar">
          <div style={{ width: `${planner}%` }}></div>
        </div>
        <span className="trait-value">{planner}</span>
      </div>

      <div className="trait-item">
        <strong>Speed</strong>
        <div className="trait-bar">
          <div style={{ width: `${speed}%` }}></div>
        </div>
        <span className="trait-value">{speed}</span>
      </div>

      <div className="trait-item">
        <strong>Stability</strong>
        <div className="trait-bar">
          <div style={{ width: `${stability}%` }}></div>
        </div>
        <span className="trait-value">{stability}</span>
      </div>
    </div>
  );
}
