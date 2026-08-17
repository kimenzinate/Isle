import { useEffect, useState } from 'react';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import TopBar from '../components/TopBar';
import ProgressBar from '../components/ProgressBar';
import PrimaryButton from '../components/PrimaryButton';
import MoodSelector from '../components/MoodSelector';
import FeelOption from '../components/FeelOption';
import MissCard from '../components/MissCard';
import { useMultiSelectPopAnimation, useSelectPopAnimation } from '../hooks/useSelectPopAnimation';
import './CheckInScreens.css';

export function CheckInStep1({ onBack, onNext, mood, onMoodChange }) {
  return (
    <div className="screen checkin-screen">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="checkin-screen__header">
        <ProgressBar step={1} />
        <h1 className="checkin-screen__title">
          <span>How are you</span>
          <span>feeling right now?</span>
        </h1>
        <p className="checkin-screen__hint">Take a moment to notice what you need today.</p>
      </div>
      <MoodSelector value={mood} onChange={onMoodChange} />
      <div className="checkin-screen__footer screen-chrome__footer">
        <PrimaryButton onClick={onNext}>Next</PrimaryButton>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function CheckInStep2({ onBack, onNext, selectedFeel, onSelectFeel }) {
  const feels = ['calm', 'warm', 'held', 'light'];
  const popFeelId = useSelectPopAnimation(selectedFeel);

  return (
    <div className="screen checkin-screen">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="checkin-screen__body screen-scroll">
        <div className="checkin-screen__header checkin-screen__header--flow">
          <ProgressBar step={2} />
          <h1 className="checkin-screen__title">
            <span>How would you</span>
            <span>like to feel?</span>
          </h1>
          <p className="checkin-screen__hint">Choose how you&apos;d like your island to support you.</p>
        </div>
        <div className="checkin-screen__options checkin-screen__options--flow">
          {feels.map((feel) => (
            <FeelOption
              key={feel}
              id={feel}
              selected={selectedFeel === feel}
              selectPop={popFeelId === feel}
              onSelect={onSelectFeel}
            />
          ))}
        </div>
      </div>
      <div className="checkin-screen__footer screen-chrome__footer">
        <PrimaryButton onClick={onNext} disabled={!selectedFeel}>Next</PrimaryButton>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function CheckInStep3({ onBack, onComplete, selectedMiss, onToggleMiss }) {
  const popMissId = useMultiSelectPopAnimation(selectedMiss);
  const rows = [
    ['someone', 'place'],
    ['routine', 'sound'],
    ['object', 'food'],
  ];

  return (
    <div className="screen checkin-screen checkin-screen--step3">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="checkin-screen__progress-sticky">
        <ProgressBar step={3} />
      </div>
      <div className="checkin-screen__scroll screen-scroll">
        <div className="checkin-screen__header checkin-screen__header--compact">
          <h1 className="checkin-screen__title">
            <span>What do you miss</span>
            <span>most?</span>
          </h1>
          <p className="checkin-screen__hint">
            Choose all that apply. Your choices help tailor your island&apos;s recommendations.
          </p>
        </div>
        <div className="checkin-screen__grid">
          {rows.map((row) => (
            <div key={row.join('-')} className="checkin-screen__grid-row">
              {row.map((id) => (
                <MissCard
                  key={id}
                  id={id}
                  selected={selectedMiss.includes(id)}
                  selectPop={popMissId === id}
                  onToggle={onToggleMiss}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="checkin-screen__footer screen-chrome__footer">
        <PrimaryButton onClick={onComplete} disabled={selectedMiss.length === 0}>Complete</PrimaryButton>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function CheckInComplete({ checkInData, onCreateIsland, onBackHome }) {
  const feelLabels = { calm: 'Calm', warm: 'Warm', held: 'Held', light: 'Light' };
  const missLabels = {
    someone: 'Someone',
    place: 'a place',
    routine: 'a routine',
    sound: 'a sound',
    object: 'an object',
    food: 'food',
  };

  const missText = checkInData.miss.map((id) => missLabels[id]).join(', ');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [entranceActive, setEntranceActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const frame = requestAnimationFrame(() => {
      setEntranceActive(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  const screenClassName = [
    'screen',
    'checkin-complete',
    !prefersReducedMotion && (entranceActive ? 'checkin-complete--entrance' : 'checkin-complete--pre-entrance'),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={screenClassName}>
      <StatusBar />
      <div className="checkin-complete__content">
        <div className="checkin-complete__icon-wrap checkin-complete__enter-icon">
          <img src="/assets/check-complete-icon.svg" alt="" />
        </div>
        <h1 className="serif-title-md checkin-complete__enter-headline">Your check-in is complete!</h1>
        <p className="checkin-complete__sub checkin-complete__enter-sub">Your island is ready to support you today.</p>

        <div className="checkin-complete__summary">
          <div className="checkin-complete__row checkin-complete__enter-row">
            <span className="checkin-complete__row-icon" style={{ background: 'rgba(168,197,200,0.27)' }}>
              <img src="/assets/check-feel-now.svg" alt="" />
            </span>
            <span>
              <strong>How you feel now</strong>
              <span>{checkInData.moodLabel}</span>
            </span>
          </div>
          <div className="checkin-complete__row checkin-complete__enter-row">
            <span className="checkin-complete__row-icon" style={{ background: 'rgba(232,149,106,0.3)' }}>
              <img src="/assets/check-feel-want.svg" alt="" />
            </span>
            <span>
              <strong>How you&apos;d like to feel</strong>
              <span>{feelLabels[checkInData.feel]}</span>
            </span>
          </div>
          <div className="checkin-complete__row checkin-complete__enter-row">
            <span className="checkin-complete__row-icon" style={{ background: 'rgba(232,215,106,0.27)' }}>
              <img src="/assets/check-miss.svg" alt="" />
            </span>
            <span>
              <strong>What you miss</strong>
              <span>{missText}</span>
            </span>
          </div>
        </div>

        <PrimaryButton variant="charcoal" className="checkin-complete__create checkin-complete__enter-create" onClick={onCreateIsland}>
          Create my island
        </PrimaryButton>
        <button type="button" className="checkin-complete__back" onClick={onBackHome}>
          Back to home
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}
