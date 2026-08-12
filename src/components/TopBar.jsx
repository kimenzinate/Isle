import BackButton from './BackButton';
import './TopBar.css';

export default function TopBar({ onBack, rightSlot }) {
  return (
    <div className="top-bar">
      {onBack ? <BackButton onClick={onBack} /> : <span className="top-bar__spacer" />}
      {rightSlot || <span className="top-bar__spacer" />}
    </div>
  );
}
