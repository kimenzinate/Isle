import { assets } from '../assets';
import './StatusBar.css';

export default function StatusBar({ light = false, transparent = false }) {
  return (
    <div
      className={`status-bar screen-chrome__status ${light ? 'status-bar--light' : ''} ${transparent ? 'status-bar--transparent' : ''}`}
    >
      <span className="status-bar__time">9:02</span>
      <div className="status-bar__icons">
        <img src={assets.settingsSignal} alt="" className="status-bar__icon" />
        <img src={assets.settingsWifi} alt="" className="status-bar__icon" />
        <img src={assets.settingsBattery} alt="" className="status-bar__icon status-bar__icon--battery" />
      </div>
    </div>
  );
}
