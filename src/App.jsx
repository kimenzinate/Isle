import { useState, useCallback } from 'react';
import { moodLabels } from './components/MoodSelector';
import { assets } from './assets';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import {
  CheckInStep1,
  CheckInStep2,
  CheckInStep3,
  CheckInComplete,
} from './screens/CheckInScreens';
import {
  IslandScreen,
  IslandCreateType,
  IslandCreateBackground,
  IslandCreateComfort,
  IslandCreateUploadPhoto,
  IslandCreatePhotoPicker,
  IslandCreatePhotoComplete,
  IslandCreateUploadSound,
  IslandCreateSoundPicker,
  IslandCreateSoundComplete,
  IslandCreateComplete,
  IslandDetailScreen,
  IslandDetailInfoScreen,
  ComfortThingsScreen,
} from './screens/IslandScreens';
import { JournalScreen, RecommendActivitiesScreen } from './screens/JournalScreens';
import SettingsScreen from './screens/SettingsScreen';

const TAB_SCREENS = ['home', 'island', 'journal', 'settings'];

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [history, setHistory] = useState([]);
  const [hasIsland, setHasIsland] = useState(false);

  const [checkIn, setCheckIn] = useState({
    mood: 2,
    feel: null,
    miss: [],
  });

  const [islandDraft, setIslandDraft] = useState({
    type: 'home',
    background: null,
    title: '',
    comfortThings: [],
    photoDraft: {
      image: assets.uploadFamilyPhoto,
      title: '',
      note: '',
    },
    soundDraft: {
      title: '',
      note: '',
      duration: '0:42',
    },
  });

  const navigate = useCallback((next) => {
    setHistory((prev) => [...prev, screen]);
    setScreen(next);
  }, [screen]);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      const next = [...prev];
      const previous = next.pop() || 'home';
      setScreen(previous);
      return next;
    });
  }, []);

  const goToTab = useCallback((tab) => {
    if (TAB_SCREENS.includes(tab)) {
      setHistory([]);
      setScreen(tab);
    }
  }, []);

  const checkInData = {
    mood: checkIn.mood,
    moodLabel: moodLabels[checkIn.mood],
    feel: checkIn.feel,
    miss: checkIn.miss,
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onGetStarted={() => navigate('home')} />;

      case 'home':
        return (
          <HomeScreen
            onNavigate={goToTab}
            onCheckIn={() => navigate('checkIn1')}
          />
        );

      case 'checkIn1':
        return (
          <CheckInStep1
            mood={checkIn.mood}
            onMoodChange={(mood) => setCheckIn((c) => ({ ...c, mood }))}
            onBack={goBack}
            onNext={() => navigate('checkIn2')}
          />
        );

      case 'checkIn2':
        return (
          <CheckInStep2
            selectedFeel={checkIn.feel}
            onSelectFeel={(feel) => setCheckIn((c) => ({ ...c, feel }))}
            onBack={goBack}
            onNext={() => navigate('checkIn3')}
          />
        );

      case 'checkIn3':
        return (
          <CheckInStep3
            selectedMiss={checkIn.miss}
            onToggleMiss={(id) =>
              setCheckIn((c) => ({
                ...c,
                miss: c.miss.includes(id)
                  ? c.miss.filter((m) => m !== id)
                  : [...c.miss, id],
              }))
            }
            onBack={goBack}
            onComplete={() => navigate('checkInComplete')}
          />
        );

      case 'checkInComplete':
        return (
          <CheckInComplete
            checkInData={checkInData}
            onCreateIsland={() => navigate('islandCreateType')}
            onBackHome={() => goToTab('home')}
          />
        );

      case 'island':
        return (
          <IslandScreen
            hasIslands={hasIsland}
            onNavigate={(target) => {
              if (TAB_SCREENS.includes(target)) goToTab(target);
              else navigate(target);
            }}
            onCreateIsland={() => navigate('islandCreateType')}
          />
        );

      case 'islandCreateType':
        return (
          <IslandCreateType
            onBack={goBack}
            onNext={(type) => {
              setIslandDraft((d) => ({ ...d, type }));
              navigate('islandCreateBackground');
            }}
          />
        );

      case 'islandCreateBackground':
        return (
          <IslandCreateBackground
            islandType={islandDraft.type}
            title={islandDraft.title}
            onTitleChange={(title) => setIslandDraft((d) => ({ ...d, title }))}
            onBack={goBack}
            onNext={(background) => {
              setIslandDraft((d) => ({ ...d, background }));
              navigate('islandCreateComfort');
            }}
          />
        );

      case 'islandCreateComfort':
        return (
          <IslandCreateComfort
            islandType={islandDraft.type}
            comfortThings={islandDraft.comfortThings}
            onBack={goBack}
            onUploadPhoto={() => navigate('islandCreateUploadPhoto')}
            onUploadSound={() => navigate('islandCreateUploadSound')}
            onShowAll={() => navigate('comfortThings')}
            onCreateIsland={() => {
              setHasIsland(true);
              setHistory([]);
              setScreen('islandCreateComplete');
            }}
          />
        );

      case 'islandCreateComplete':
        return (
          <IslandCreateComplete
            onGoToIsland={() => {
              setHistory(['island']);
              setScreen('islandDetail');
            }}
            onBackHome={() => goToTab('home')}
          />
        );

      case 'islandCreateUploadPhoto':
        return (
          <IslandCreateUploadPhoto
            title={islandDraft.photoDraft.title}
            note={islandDraft.photoDraft.note}
            onTitleChange={(title) =>
              setIslandDraft((d) => ({ ...d, photoDraft: { ...d.photoDraft, title } }))
            }
            onNoteChange={(note) =>
              setIslandDraft((d) => ({ ...d, photoDraft: { ...d.photoDraft, note } }))
            }
            onBack={goBack}
            onOpenPicker={() => navigate('islandCreatePhotoPicker')}
          />
        );

      case 'islandCreatePhotoPicker':
        return (
          <IslandCreatePhotoPicker
            onCancel={goBack}
            onUpload={() => {
              setIslandDraft((d) => ({
                ...d,
                photoDraft: {
                  ...d.photoDraft,
                  image: assets.uploadFamilyPhoto,
                  title: d.photoDraft.title || 'Family Photo',
                  note: d.photoDraft.note || 'Family photo from when I was young. We took it outside my grandparents\' house. I remember learning to ride a bike there—it felt safe, comforting and peaceful.',
                },
              }));
              navigate('islandCreatePhotoComplete');
            }}
          />
        );

      case 'islandCreatePhotoComplete':
        return (
          <IslandCreatePhotoComplete
            image={islandDraft.photoDraft.image}
            title={islandDraft.photoDraft.title}
            note={islandDraft.photoDraft.note}
            onTitleChange={(title) =>
              setIslandDraft((d) => ({ ...d, photoDraft: { ...d.photoDraft, title } }))
            }
            onNoteChange={(note) =>
              setIslandDraft((d) => ({ ...d, photoDraft: { ...d.photoDraft, note } }))
            }
            onBack={goBack}
            onChangePhoto={() => navigate('islandCreateUploadPhoto')}
            onSave={() => {
              setIslandDraft((d) => ({
                ...d,
                comfortThings: [
                  {
                    id: 'family-photo',
                    type: 'photo',
                    title: d.photoDraft.title || 'Family Photo',
                    image: assets.comfortThumbFamilyPhoto,
                    note: d.photoDraft.note,
                  },
                ],
              }));
              setHistory((prev) => {
                const comfortIdx = prev.indexOf('islandCreateComfort');
                return comfortIdx >= 0 ? prev.slice(0, comfortIdx) : prev;
              });
              setScreen('islandCreateComfort');
            }}
          />
        );

      case 'islandCreateUploadSound':
        return (
          <IslandCreateUploadSound
            title={islandDraft.soundDraft.title}
            note={islandDraft.soundDraft.note}
            onTitleChange={(title) =>
              setIslandDraft((d) => ({ ...d, soundDraft: { ...d.soundDraft, title } }))
            }
            onNoteChange={(note) =>
              setIslandDraft((d) => ({ ...d, soundDraft: { ...d.soundDraft, note } }))
            }
            onBack={goBack}
            onOpenPicker={() => navigate('islandCreateSoundPicker')}
          />
        );

      case 'islandCreateSoundPicker':
        return (
          <IslandCreateSoundPicker
            onCancel={goBack}
            onUpload={() => {
              setIslandDraft((d) => ({
                ...d,
                soundDraft: {
                  ...d.soundDraft,
                  title: d.soundDraft.title || "Parents' say good bye",
                  note:
                    d.soundDraft.note ||
                    "When I come to the UK, my parents dropped me off at the airport and say good bye before I leave. I missed that moment!",
                },
              }));
              navigate('islandCreateSoundComplete');
            }}
          />
        );

      case 'islandCreateSoundComplete':
        return (
          <IslandCreateSoundComplete
            title={islandDraft.soundDraft.title}
            note={islandDraft.soundDraft.note}
            duration={islandDraft.soundDraft.duration}
            onTitleChange={(title) =>
              setIslandDraft((d) => ({ ...d, soundDraft: { ...d.soundDraft, title } }))
            }
            onNoteChange={(note) =>
              setIslandDraft((d) => ({ ...d, soundDraft: { ...d.soundDraft, note } }))
            }
            onBack={goBack}
            onChangeSound={() => navigate('islandCreateUploadSound')}
            onSave={() => {
              setIslandDraft((d) => {
                const soundTitle =
                  d.soundDraft.title === "Parents' say good bye"
                    ? 'At the airport'
                    : d.soundDraft.title || 'At the airport';
                return {
                  ...d,
                  comfortThings: [
                    ...d.comfortThings,
                    {
                      id: 'airport-sound',
                      type: 'sound',
                      title: soundTitle,
                      image: assets.uploadSoundIcon,
                      note: d.soundDraft.note,
                    },
                  ],
                };
              });
              setHistory((prev) => {
                const comfortIdx = prev.indexOf('islandCreateComfort');
                return comfortIdx >= 0 ? prev.slice(0, comfortIdx) : prev;
              });
              setScreen('islandCreateComfort');
            }}
          />
        );

      case 'islandDetail':
        return (
          <IslandDetailScreen
            onBack={goBack}
            onShowAll={() => navigate('comfortThings')}
            onComfortLibrary={() => navigate('comfortThings')}
            onXrHelp={() => navigate('islandDetailInfo')}
          />
        );

      case 'islandDetailInfo':
        return (
          <IslandDetailInfoScreen
            onBack={goBack}
            onEnterXr={goBack}
          />
        );

      case 'comfortThings':
        return <ComfortThingsScreen onBack={goBack} />;

      case 'journal':
        return (
          <JournalScreen
            onNavigate={goToTab}
            onRecommend={() => navigate('recommendActivities')}
          />
        );

      case 'recommendActivities':
        return (
          <RecommendActivitiesScreen
            onBack={goBack}
            onIslandDetail={() => navigate('islandDetail')}
          />
        );

      case 'settings':
        return <SettingsScreen onNavigate={goToTab} />;

      default:
        return <SplashScreen onGetStarted={() => navigate('home')} />;
    }
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">{renderScreen()}</div>
    </div>
  );
}
