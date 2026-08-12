import { assets } from '../assets';
import './TabBar.css';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    icon: assets.tabHome,
    iconActive: assets.tabHomeActive,
  },
  {
    id: 'island',
    label: 'Island',
    icon: assets.tabIsland,
    iconActive: assets.tabIslandActive,
  },
  {
    id: 'journal',
    label: 'Journal',
    icon: assets.tabJournal,
    iconActive: assets.tabJournalActive,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: assets.tabSettings,
    iconActive: assets.tabSettingsActive,
  },
];

export default function TabBar({ active, onNavigate }) {
  return (
    <>
      <div className="screen-chrome__bottom-chrome" aria-hidden="true" />
      <nav className="tab-bar screen-chrome__tab-bar">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`tab-bar__item ${isActive ? 'tab-bar__item--active' : ''}`}
            onClick={() => onNavigate(tab.id)}
          >
            <span className="tab-bar__icon-wrap">
              <img
                src={isActive ? tab.iconActive : tab.icon}
                alt=""
                className="tab-bar__icon"
              />
            </span>
            <span className={`tab-bar__label ${isActive ? 'tab-bar__label--active' : ''}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
    </>
  );
}
