import './HomeIndicator.css';

export default function HomeIndicator({ light = false, bare = false }) {
  return (
    <div className={`home-indicator ${bare ? '' : 'screen-chrome__home-indicator'}`}>
      <div className={`home-indicator__bar ${light ? 'home-indicator__bar--light' : ''}`} />
    </div>
  );
}
