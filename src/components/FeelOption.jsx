import { assets } from '../assets';
import './FeelOption.css';

const feelConfig = {
  calm: {
    title: 'Calm',
    desc: 'I want to slow down.',
    icon: assets.feelCalm,
    iconBg: 'rgba(168,197,200,0.27)',
    selectedBg: '#e5eeef',
    selectedBorder: '#a8c5c8',
    checkBg: '#a8c5c8',
  },
  warm: {
    title: 'Warm',
    desc: 'I want to feel close to home.',
    icon: assets.feelWarm,
    iconBg: 'rgba(232,149,106,0.3)',
    selectedBg: '#f8dfd2',
    selectedBorder: '#e8956a',
    checkBg: '#e8956a',
  },
  held: {
    title: 'Held',
    desc: 'I want to feel less alone.',
    icon: assets.feelHeld,
    iconBg: 'rgba(155,184,155,0.27)',
    selectedBg: '#e1eae1',
    selectedBorder: '#9bb89b',
    checkBg: '#9bb89b',
  },
  light: {
    title: 'Light',
    desc: 'I want to feel a little brighter.',
    icon: assets.feelLight,
    iconBg: 'rgba(232,201,106,0.27)',
    selectedBg: '#f8efd2',
    selectedBorder: '#e8c96a',
    checkBg: '#e8c96a',
  },
};

export default function FeelOption({ id, selected, onSelect }) {
  const config = feelConfig[id];

  return (
    <button
      type="button"
      className={`feel-option ${selected ? 'feel-option--selected' : ''}`}
      style={
        selected
          ? {
              background: config.selectedBg,
              borderColor: config.selectedBorder,
            }
          : undefined
      }
      onClick={() => onSelect(id)}
    >
      <span className="feel-option__icon" style={{ background: config.iconBg }}>
        <img src={config.icon} alt="" />
      </span>
      <span className="feel-option__text">
        <strong>{config.title}</strong>
        <span>{config.desc}</span>
      </span>
      {selected && (
        <span className="feel-option__check" style={{ background: config.checkBg }}>
          <img src={assets.feelCheck} alt="" />
        </span>
      )}
    </button>
  );
}

export { feelConfig };
