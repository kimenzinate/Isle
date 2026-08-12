import { assets } from '../assets';
import './TopBar.css';

export default function TopBar({ onBack, rightSlot }) {
  return (
    <div className="top-bar">
      {onBack ? (
        <button type="button" className="top-bar__back" onClick={onBack} aria-label="Back">
          <span className="top-bar__back-icon-wrap" aria-hidden="true">
            <img src={assets.chevronLeft} alt="" className="top-bar__back-icon" />
          </span>
        </button>
      ) : (
        <span className="top-bar__spacer" />
      )}
      {rightSlot || <span className="top-bar__spacer" />}
    </div>
  );
}
