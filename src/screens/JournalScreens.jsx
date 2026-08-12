import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import TabBar from '../components/TabBar';
import BackButton from '../components/BackButton';
import { assets } from '../assets';
import './JournalScreens.css';

export function JournalScreen({ onNavigate, onRecommend }) {
  return (
    <div className="screen journal-screen">
      <StatusBar />

      <div className="journal-screen__scroll screen-scroll">
        <header className="journal-screen__header">
          <h1 className="journal-screen__title">Journal</h1>
          <p className="journal-screen__subtitle">Little step forward for your day.</p>
        </header>

        <div className="journal-tabs">
          <div className="journal-tabs__item journal-tabs__item--active">Memories</div>
          <div className="journal-tabs__item">Saved</div>
        </div>

        <article className="journal-entry">
          <div className="journal-entry__meta">
            <strong>Today</strong>
            <span>7:32PM</span>
          </div>
          <div className="journal-entry__body">
            <p>
              I couldn&apos;t sleep, so I came to my island. I looked at the blue sky and played a video from our summer trip. It made me feel grateful for those little memories, and I felt much better than before.
            </p>
            <img src={assets.journalThumb} alt="" />
          </div>
        </article>

        <article className="journal-insight">
          <div className="journal-insight__title">
            <img src={assets.journalInsight} alt="" />
            <strong>Today&apos;s insight</strong>
          </div>
          <p>
            Familiar visual memories and peaceful, open scenery seemed to help you move from restlessness towards gratitude and calm.
          </p>
        </article>

        <section className="journal-recommend">
          <h2>Recommended for you</h2>
          <button type="button" className="journal-recommend__card" onClick={onRecommend}>
            <div className="journal-recommend__top">
              <span className="journal-recommend__text">
                <strong>Memory Wind-Down</strong>
                <span>5 min bedtime reflection</span>
              </span>
              <span className="journal-recommend__arrow">
                <img src={assets.journalRecommendArrow} alt="" />
              </span>
            </div>
            <p>
              Revisit one calming memory, notice how it makes you feel, and end your time in the island with one grateful thought.
            </p>
          </button>
        </section>
      </div>

      <TabBar active="journal" onNavigate={onNavigate} />
      <HomeIndicator />
    </div>
  );
}

export function RecommendActivitiesScreen({ onBack, onIslandDetail }) {
  const steps = [
    'Take off the headset and dim the lights',
    'Take four slow breaths',
    'Recall one thing you felt grateful for',
    'Let your body rest without forcing sleep',
  ];

  return (
    <div className="screen recommend-screen screen-scroll">
      <StatusBar />
      <BackButton className="island-create__back" onClick={onBack} />

      <div className="recommend-screen__content">
        <div className="recommend-screen__title-row">
          <div>
            <h1 className="serif-title-xl">Memory Wind-Down</h1>
            <p className="body-sm">5 min offline wind-down</p>
          </div>
          <button type="button" className="recommend-screen__save">
            <img src={assets.recommendSave} alt="" />
          </button>
        </div>

        <img src={assets.recommendHero} alt="" className="recommend-screen__hero" />

        <div className="recommend-screen__why">
          <div className="island-screen__label">
            <img src={assets.recommendSparkle} alt="" />
            <span>WHY THIS WAS SUGGESTED</span>
          </div>
          <p>
            Revisiting a positive memory helped you feel calmer. A quiet, screen-free routine can help you carry that feeling into rest.
          </p>
        </div>

        <h2 className="recommend-screen__how-title">How to do it</h2>
        <div className="recommend-screen__steps">
          {steps.map((step, i) => (
            <div key={step} className="recommend-screen__step">
              <span>{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <button type="button" className="recommend-screen__pair" onClick={onIslandDetail}>
          <img src={assets.recommendPair} alt="" />
          <span>
            <small>Pair with</small>
            <strong>Heaven Isle</strong>
          </span>
          <span className="recommend-screen__pair-arrow">
            <img src={assets.recommendPairArrow} alt="" />
          </span>
        </button>
      </div>
    </div>
  );
}
