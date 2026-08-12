import './ProgressBar.css';

export default function ProgressBar({ step, total = 3 }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__steps">
        {Array.from({ length: total }, (_, i) => {
          const num = i + 1;
          const isComplete = num <= step;
          return (
            <span key={num} className="progress-bar__group">
              {i > 0 && <span className="progress-bar__line" />}
              <span className={`progress-bar__dot ${isComplete ? 'progress-bar__dot--active' : ''}`}>
                {num}
              </span>
            </span>
          );
        })}
      </div>
      <span className="progress-bar__label">Step {step} of {total}</span>
    </div>
  );
}
