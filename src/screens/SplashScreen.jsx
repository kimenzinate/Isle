import { useEffect, useRef, useState } from 'react';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import { assets } from '../assets';
import './SplashScreen.css';

const SPLASH_REVEAL_MS = 2000;

export default function SplashScreen({ onGetStarted }) {
  const [phase, setPhase] = useState('splash');
  const videoRef = useRef(null);
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    const revealSplash2 = () => {
      if (hasRevealedRef.current) return;
      hasRevealedRef.current = true;
      setPhase('splash2');
    };

    const video = videoRef.current;
    const onTimeUpdate = () => {
      if (video && video.currentTime * 1000 >= SPLASH_REVEAL_MS) {
        revealSplash2();
      }
    };

    if (video) {
      video.addEventListener('timeupdate', onTimeUpdate);
    }

    const fallbackTimer = window.setTimeout(revealSplash2, SPLASH_REVEAL_MS + 250);

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', onTimeUpdate);
      }
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className={`screen splash-screen splash-screen--${phase}`}>
      <video
        ref={videoRef}
        className="splash-screen__bg"
        src={assets.splashVideo}
        autoPlay
        muted
        playsInline
        loop
        aria-hidden="true"
      />
      <StatusBar light transparent />
      <div className="splash-screen__hero">
        <img src={assets.isleLogo} alt="Isle" className="splash-screen__logo" />
        <div className="splash-screen__tagline">
          <p>Your island,</p>
          <p>always with you.</p>
        </div>
      </div>
      <div className="splash-screen__footer">
        <button type="button" className="splash-screen__cta" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
      <HomeIndicator light bare />
    </div>
  );
}
