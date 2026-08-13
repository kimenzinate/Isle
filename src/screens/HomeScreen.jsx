import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import TabBar from '../components/TabBar';
import { assets } from '../assets';
import './HomeScreen.css';

const recentItems = [
  { title: "Grandma's Kitchen", image: assets.recentImg1, clip: true },
  { title: 'Ocean by the fall', image: assets.recentImg2 },
  { title: 'Kyoto lanterns', image: assets.recentImg3 },
];

export default function HomeScreen({ onNavigate, onCheckIn }) {
  return (
    <div className="screen home-screen">
      <StatusBar />
      <div className="home-screen__scroll screen-scroll">
        <div className="home-screen__content">
          <div className="home-screen__top">
            <div className="home-screen__top-header">
              <div className="home-screen__greeting">
                <div className="home-screen__greeting-titles">
                  <p className="home-screen__hello">Good evening, Leo</p>
                  <h1 className="home-screen__title">You&apos;re home.</h1>
                </div>
                <p className="home-screen__subtitle">
                  Take a breath.
                  <br />
                  You&apos;re in a safe place.
                </p>
              </div>
              <div className="home-screen__notification" aria-hidden="true">
                <img src={assets.homeNotification} alt="" />
              </div>
            </div>
            <img src={assets.homeHero} alt="" className="home-screen__hero" />
          </div>

          <button type="button" className="home-screen__checkin" onClick={onCheckIn}>
            <span className="home-screen__checkin-label">Check in with how you&apos;re feeling</span>
            <span className="home-screen__checkin-icon">
              <img src={assets.homeCaret} alt="" />
            </span>
          </button>

          <div className="home-screen__reflection-wrap">
            <div className="home-screen__reflection">
              <p className="home-screen__reflection-label">Today&apos;s reflection</p>
              <p className="home-screen__reflection-quote">
                &quot;What small thing felt like home today?&quot;
              </p>
              <p className="home-screen__write-note">
                <span>Write a note</span>
                <span className="home-screen__write-note-icon">
                  <img src={assets.homeWriteNote} alt="" />
                </span>
              </p>
            </div>
          </div>

          <div className="home-screen__recent">
            <div className="home-screen__recent-header">
              <span className="home-screen__recent-label">Recently visited</span>
              <span className="home-screen__show-all">Show all</span>
            </div>
            <div className="home-screen__recent-row">
              {recentItems.map((item) => (
                <div key={item.title} className="home-screen__recent-card">
                  <div className="home-screen__recent-image-wrap">
                    <img
                      src={item.image}
                      alt=""
                      className={item.clip ? 'home-screen__recent-image home-screen__recent-image--clip' : 'home-screen__recent-image'}
                    />
                  </div>
                  <span className="home-screen__recent-title">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TabBar active="home" onNavigate={onNavigate} />
      <HomeIndicator />
    </div>
  );
}
