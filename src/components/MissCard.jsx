import { assets } from '../assets';

const missConfig = {
  someone: {
    title: 'Someone',
    desc: 'A person I want to feel close to.',
    icon: assets.missSomeone,
    iconBg: 'rgba(232,149,106,0.27)',
    selectedBg: '#f8dfd2',
    selectedBorder: '#e8956a',
    width: '159px',
  },
  place: {
    title: 'Place',
    desc: 'Somewhere that feels familiar.',
    icon: assets.missPlace,
    iconBg: 'rgba(168,197,200,0.27)',
    selectedBg: '#e5eeef',
    selectedBorder: '#a8c5c8',
    width: '155px',
  },
  routine: {
    title: 'Routine',
    desc: 'A small habit from home.',
    icon: assets.missRoutine,
    iconBg: 'rgba(197,168,200,0.27)',
    selectedBg: '#eee5ef',
    selectedBorder: '#c5a8c8',
    width: '154px',
  },
  sound: {
    title: 'Sound',
    desc: ['A familiar music,', 'or voice.'],
    icon: assets.missSound,
    iconBg: 'rgba(155,184,155,0.27)',
    selectedBg: '#e1eae1',
    selectedBorder: '#9bb89b',
    width: '154px',
  },
  object: {
    title: 'Object',
    desc: 'Something I used to keep near me.',
    icon: assets.missObject,
    iconBg: 'rgba(200,184,155,0.27)',
    selectedBg: '#efeae1',
    selectedBorder: '#c8b89b',
    width: '155px',
  },
  food: {
    title: 'Food',
    desc: 'A taste or mealtime memory.',
    icon: assets.missFood,
    iconBg: 'rgba(232,215,106,0.27)',
    selectedBg: '#f9f4d7',
    selectedBorder: '#c7ad00',
    width: '155px',
  },
};

export default function MissCard({ id, selected, onToggle }) {
  const config = missConfig[id];

  return (
    <button
      type="button"
      className={`miss-card ${selected ? 'miss-card--selected' : ''}`}
      style={{
        ...(selected
          ? {
              background: config.selectedBg,
              borderColor: config.selectedBorder,
            }
          : undefined),
        width: config.width,
      }}
      onClick={() => onToggle(id)}
    >
      <span className="miss-card__icon" style={{ background: config.iconBg }}>
        <img src={config.icon} alt="" />
      </span>
      <strong>{config.title}</strong>
      {Array.isArray(config.desc) ? (
        <span className="miss-card__desc miss-card__desc--multiline">
          {config.desc.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      ) : (
        <span>{config.desc}</span>
      )}
    </button>
  );
}

export { missConfig };
