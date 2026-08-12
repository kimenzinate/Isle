import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import TabBar from '../components/TabBar';
import { assets } from '../assets';
import './SettingsScreen.css';

const settingsItems = ['Profile', 'Notifications', 'Appearance', 'Privacy', 'Help & feedback'];

export default function SettingsScreen({ onNavigate }) {
  return (
    <div className="screen settings-screen">
      <StatusBar />
      <div className="settings-screen__scroll screen-scroll">
        <h1 className="serif-title-sm">Settings</h1>
        <div className="settings-screen__list">
          {settingsItems.map((item) => (
            <div key={item} className="settings-row">
              <span>{item}</span>
              <img src={assets.settingsChevron} alt="" />
            </div>
          ))}
        </div>
      </div>
      <TabBar active="settings" onNavigate={onNavigate} />
      <HomeIndicator />
    </div>
  );
}
