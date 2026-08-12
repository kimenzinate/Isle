import { assets } from '../assets';
import './BackButton.css';

export default function BackButton({ className = '', onClick }) {
  return (
    <button
      type="button"
      className={['back-button', className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label="Back"
    >
      <span className="back-button__icon-wrap" aria-hidden="true">
        <img src={assets.chevronLeft} alt="" className="back-button__icon" />
      </span>
    </button>
  );
}
