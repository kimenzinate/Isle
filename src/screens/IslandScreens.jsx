import { useState } from 'react';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import TopBar from '../components/TopBar';
import TabBar from '../components/TabBar';
import PrimaryButton from '../components/PrimaryButton';
import { assets } from '../assets';
import './IslandScreens.css';

export function IslandScreen({ onNavigate, onCreateIsland, hasIslands = false }) {
  const suggestedIslands = hasIslands
    ? [{ id: 'warm-home', title: 'Warm home', desc: 'A familiar place to feel close to home', image: assets.islandWarmHome }]
    : [
        { id: 'warm-home', title: 'Warm home', desc: 'A familiar place to feel close to home', image: assets.islandWarmHome },
        { id: 'blue-sky', title: 'Blue Sky Isle', desc: 'Isolation and sounds that heal spirits', image: assets.islandBlueSky },
      ];

  return (
    <div className="screen island-screen">
      <StatusBar />
      <div className="island-screen__header">
        <div>
          <h1 className="serif-title-xl">Island</h1>
          <p className="body-sm">Different spaces for different comforts</p>
        </div>
        <button type="button" className="island-screen__plus" onClick={onCreateIsland}>
          <img src={assets.islandPlus} alt="" />
        </button>
      </div>

      <div className="island-screen__scroll screen-scroll">
        <div className="island-screen__section">
          <div className="island-screen__label">
            <img src={assets.islandSparkle} alt="" />
            <span>SUGGESTED FOR TODAY</span>
          </div>
          {suggestedIslands.map((item) => (
            <div key={item.id} className="island-card island-card--static">
              <img src={item.image} alt="" className="island-card__thumb" />
              <span className="island-card__text">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </span>
              <img src={assets.islandCaret} alt="" className="island-card__caret" />
            </div>
          ))}
        </div>

        <PrimaryButton variant="charcoal" className="island-screen__create-btn" onClick={onCreateIsland}>
          <img src={assets.islandCreatePlus} alt="" className="island-screen__create-icon" />
          Create new island
        </PrimaryButton>

        <div className="island-screen__empty">
          <h2>
            Your islands <span>{hasIslands ? '1' : '0'}</span>
          </h2>
          {!hasIslands ? (
            <p>
              You don&apos;t have comfort things yet.
              <br />
              Please upload your things to make your island!
            </p>
          ) : (
            <button type="button" className="island-card island-card--owned" onClick={() => onNavigate('islandDetail')}>
              <img src={assets.islandOwnedHeaven} alt="" className="island-card__thumb" />
              <span className="island-card__text">
                <strong>Heaven</strong>
                <span>02.09.2026</span>
              </span>
              <img src={assets.islandCaret} alt="" className="island-card__caret" />
            </button>
          )}
        </div>
      </div>

      <TabBar active="island" onNavigate={onNavigate} />
      <HomeIndicator />
    </div>
  );
}

export function IslandCreateType({ onBack, onNext }) {
  const [selectedType, setSelectedType] = useState(null);

  const types = [
    { id: 'home', title: ['A place that', 'feels like home'], image: assets.islandCreateHome },
    { id: 'calm', title: ['A calm place', 'to rest'], image: assets.islandCreateCalm },
    { id: 'voice', title: ['A voice-tuned', 'island'], image: assets.islandCreateVoice },
    { id: 'memory', title: ['A place from', 'memory'], image: assets.islandCreateMemory },
  ];

  return (
    <div className="screen island-create">
      <StatusBar />
      <TopBar onBack={onBack} />
      <h1 className="serif-title-xl island-create__title">Create your island</h1>
      <p className="body-sm island-create__subtitle">What kind of place do you need today?</p>
      <div className="island-create__grid">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`island-type-card ${selectedType === type.id ? 'island-type-card--selected' : ''}`}
            onClick={() => setSelectedType(type.id)}
          >
            <span className="island-type-card__image-wrap">
              <img src={type.image} alt="" className="island-type-card__image" />
            </span>
            <span className="island-type-card__label">
              {type.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
      {selectedType && (
        <div className="island-create__footer screen-chrome__footer">
          <PrimaryButton onClick={() => onNext(selectedType)}>Next</PrimaryButton>
        </div>
      )}
      <HomeIndicator />
    </div>
  );
}

export function IslandCreateBackground({ islandType, title, onTitleChange, onBack, onNext }) {
  const [selectedBg, setSelectedBg] = useState(null);

  const backgrounds = [
    { id: 'blue', label: 'Blue Sky', image: assets.bgBlueSky },
    { id: 'sea', label: 'Seaview', image: assets.bgSeaview },
    { id: 'warm', label: 'Warm Home', image: assets.bgWarmHome },
    { id: 'moon', label: 'Moon', image: assets.bgMoon },
  ];

  const typeLabels = {
    home: 'A place that feels like home',
    calm: 'A calm place to rest',
    voice: 'A voice-tuned island',
    memory: 'A place from memory',
  };

  return (
    <div className="screen island-create island-create--background">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-create__header">
        <h1 className="serif-title-xl">Choose a background</h1>
        <p className="body-sm">Start with a scene that feels familiar</p>
        <p className="island-create__choice">
          <img src={assets.bgChoiceSparkle} alt="" />
          <span>
            Based on your choice: <strong>{typeLabels[islandType]}</strong>
          </span>
        </p>
      </div>
      <div className="island-create__scroll screen-scroll">
        <p className="island-create__section-label">Preset backgrounds</p>
        <div className="island-create__bg-rows">
          <div className="island-create__bg-row">
            {backgrounds.slice(0, 2).map((bg, index) => (
              <button
                key={bg.id}
                type="button"
                className={`island-bg-card ${index === 0 ? 'island-bg-card--narrow' : ''} ${selectedBg === bg.id ? 'island-bg-card--selected' : ''}`}
                onClick={() => setSelectedBg(bg.id)}
              >
                <div className="island-bg-card__image-wrap">
                  <img src={bg.image} alt="" className="island-bg-card__image" />
                </div>
                <span className="island-bg-card__label">{bg.label}</span>
              </button>
            ))}
          </div>
          <div className="island-create__bg-row">
            {backgrounds.slice(2, 4).map((bg) => (
              <button
                key={bg.id}
                type="button"
                className={`island-bg-card ${selectedBg === bg.id ? 'island-bg-card--selected' : ''}`}
                onClick={() => setSelectedBg(bg.id)}
              >
                <div className="island-bg-card__image-wrap">
                  <img src={bg.image} alt="" className="island-bg-card__image" />
                </div>
                <span className="island-bg-card__label">{bg.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="island-create__title-field">
          <label className="island-create__field-label" htmlFor="island-title">Title</label>
          <input
            id="island-title"
            className="island-create__input"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
      </div>
      {selectedBg && (
        <div className="island-create__footer screen-chrome__footer">
          <PrimaryButton onClick={() => onNext(selectedBg)}>Next</PrimaryButton>
        </div>
      )}
      <HomeIndicator />
    </div>
  );
}

const islandTypeLabels = {
  home: 'A place that feels like home',
  calm: 'A calm place to rest',
  voice: 'A voice-tuned island',
  memory: 'A place from memory',
};

const uploadOptions = [
  { title: 'Photo', desc: 'A familiar memory', icon: assets.uploadPhotoIcon },
  { title: 'Video', desc: 'A moment in motion', icon: assets.uploadVideoIcon },
  { title: 'Object', desc: 'Something that feels like home', icon: assets.uploadObjectIcon },
  { title: 'Sound', desc: 'Music, ambience or a voice note', icon: assets.uploadSoundIcon },
];

export function IslandCreateComfort({
  islandType,
  comfortThings = [],
  onBack,
  onUploadPhoto,
  onUploadSound,
  onShowAll,
  onCreateIsland,
}) {
  const hasItems = comfortThings.length > 0;

  return (
    <div className={`screen island-create island-create--comfort ${hasItems ? 'island-create--comfort-has-items' : ''}`}>
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-create__comfort-content">
        <div className="island-create__comfort-header">
          <h1 className="serif-title-xl">Upload comfort things</h1>
          <p className="body-sm">Start with a scene that feels familiar</p>
          <p className="island-create__choice">
            <img src={assets.bgChoiceSparkle} alt="" />
            <span>
              Based on your choice: <strong>{islandTypeLabels[islandType]}</strong>
            </span>
          </p>
        </div>

        <div className="island-create__comfort-upload">
          <p className="island-create__section-label">Upload</p>
          <div className="island-upload-list">
            {uploadOptions.map((item) => (
              <button
                key={item.title}
                type="button"
                className={`island-upload-row ${item.title === 'Photo' || item.title === 'Sound' ? 'island-upload-row--interactive' : ''}`}
                onClick={
                  item.title === 'Photo'
                    ? onUploadPhoto
                    : item.title === 'Sound'
                      ? onUploadSound
                      : undefined
                }
              >
                <span className="island-upload-row__icon">
                  <img src={item.icon} alt="" />
                </span>
                <span className="island-upload-row__text">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="island-create__comfort-things">
          <div className="island-create__comfort-things-header">
            <h2>
              Your comfort things <span>{comfortThings.length}</span>
            </h2>
            {hasItems && (
              <button type="button" className="island-create__comfort-show-all" onClick={onShowAll}>
                Show all
              </button>
            )}
          </div>
          {hasItems ? (
            <div className="island-comfort-items">
              {comfortThings.map((item) => (
                <div key={item.id} className="island-comfort-item">
                  <span
                    className={`island-comfort-item__thumb ${
                      item.type === 'sound' ? 'island-comfort-item__thumb--sound' : 'island-comfort-item__thumb--photo'
                    }`}
                  >
                    <img
                      src={item.type === 'sound' ? assets.comfortVoiceWave : item.image}
                      alt=""
                    />
                  </span>
                  <strong>{item.title}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="island-create__comfort-empty-text">
              You don&apos;t have comfort things yet.
              <br />
              Please upload your things to make your island!
            </p>
          )}
        </div>
      </div>
      {hasItems && (
        <div className="island-create__footer screen-chrome__footer">
          <PrimaryButton onClick={onCreateIsland}>Create Island</PrimaryButton>
        </div>
      )}
      <HomeIndicator />
    </div>
  );
}

export function IslandCreateComplete({ onGoToIsland, onBackHome }) {
  return (
    <div className="screen island-create-complete">
      <StatusBar />
      <div className="island-create-complete__content">
        <div className="island-create-complete__hero">
          <img src={assets.islandCreateCompleteHero} alt="" />
        </div>
        <div className="island-create-complete__icon">
          <img src={assets.islandCreateCompleteCheck} alt="" />
        </div>
        <div className="island-create-complete__text">
          <h1>Your island is created!</h1>
          <p>Start your journey with your island.</p>
        </div>
        <button type="button" className="island-create-complete__cta" onClick={onGoToIsland}>
          Go to island
        </button>
        <button type="button" className="island-create-complete__home-link" onClick={onBackHome}>
          Back to home
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function IslandCreateUploadPhoto({ title, note, onTitleChange, onNoteChange, onBack, onOpenPicker }) {
  return (
    <div className="screen island-create island-create--upload-photo">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-create__upload-photo-content">
        <h1 className="serif-title-xl">Upload Photo</h1>
        <button type="button" className="island-upload-drop" onClick={onOpenPicker}>
          <span className="island-upload-drop__icon">
            <img src={assets.uploadPhotoAddIcon} alt="" />
          </span>
          <strong>Tap to add a photo</strong>
          <span>PNG, JPG up to 10 MB</span>
        </button>
        <div className="island-create__title-field">
          <label className="island-create__field-label" htmlFor="photo-title">Title</label>
          <input
            id="photo-title"
            className="island-create__input"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="island-create__note-field">
          <label className="island-create__field-label" htmlFor="photo-note">
            A short note <span className="island-create__field-optional">(optional)</span>
          </label>
          <textarea
            id="photo-note"
            className="island-create__textarea"
            placeholder="Enter a short note that you want to memorise."
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

const photoPickerGrid = [
  assets.photoGrid1, assets.photoGrid2, assets.photoGrid3,
  assets.photoGrid4, assets.photoGrid5, assets.photoGrid6,
  assets.photoGrid7, assets.photoGrid8, assets.photoGridFamily,
  assets.photoGrid9, assets.photoGrid1, assets.photoGrid2,
  assets.photoGrid3, assets.photoGrid4, assets.photoGrid5,
  assets.photoGrid6, assets.photoGrid7, assets.photoGrid8,
  assets.photoGrid9, assets.photoGrid3, assets.photoGrid4,
  assets.photoGrid5, assets.photoGrid6, assets.photoGrid7,
];

export function IslandCreatePhotoPicker({ onCancel, onUpload }) {
  const [selectedIndex, setSelectedIndex] = useState(8);

  return (
    <div className="screen photo-picker">
      <div className="photo-picker__top">
        <div className="photo-picker__top-bg" aria-hidden="true" />
        <p className="photo-picker__limit">Select up to 4 items.</p>
        <div className="photo-picker__nav">
          <button type="button" className="photo-picker__nav-btn" onClick={onCancel}>Cancel</button>
          <div className="photo-picker__segmented">
            <span className="photo-picker__segmented-option photo-picker__segmented-option--active">Photos</span>
            <span className="photo-picker__segmented-option">Albums</span>
          </div>
          <button type="button" className="photo-picker__nav-btn photo-picker__nav-btn--right" onClick={onUpload}>
            Upload
          </button>
        </div>
        <div className="photo-picker__search">
          <img src={assets.photoPickerSearch} alt="" className="photo-picker__search-icon" />
          <span className="photo-picker__search-placeholder">Photos, People, Places...</span>
          <img src={assets.photoPickerMic} alt="" className="photo-picker__search-mic" />
        </div>
      </div>
      <div className="photo-picker__grid">
        {photoPickerGrid.map((src, index) => (
          <button
            key={index}
            type="button"
            className={`photo-picker__cell ${selectedIndex === index ? 'photo-picker__cell--selected' : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={src} alt="" />
            {selectedIndex === index && (
              <img src={assets.photoPickerSelected} alt="" className="photo-picker__check" />
            )}
          </button>
        ))}
      </div>
      <div className="photo-picker__footer">
        <button type="button" className="photo-picker__show-selected">
          Show Selected (1)
        </button>
        <HomeIndicator />
      </div>
    </div>
  );
}

const soundWaveformActive = [19.8, 30.8, 44, 60.5, 41.8, 66, 52.8, 38.5, 57.2, 46.2, 33, 63.8];
const soundWaveformInactive = [44, 36, 50, 45, 62, 38, 28, 44, 56, 40, 32, 48, 60, 42, 50, 36, 28, 54];

const soundPickerFiles = [
  { id: 10, name: 'Voice note 10' },
  { id: 9, name: 'Voice note 9' },
  { id: 8, name: 'Voice note 8', blank: true },
  { id: 7, name: 'Voice note 7' },
  { id: 6, name: 'Voice note 6' },
  { id: 5, name: 'Voice note 5' },
  { id: 4, name: 'Voice note 4' },
  { id: 3, name: 'Voice note 3' },
  { id: 2, name: 'Voice note 2' },
];

export function IslandCreateUploadSound({ title, note, onTitleChange, onNoteChange, onBack, onOpenPicker }) {
  return (
    <div className="screen island-create island-create--upload-sound">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-create__upload-photo-content">
        <h1 className="serif-title-xl">Upload Sound</h1>
        <button type="button" className="island-upload-drop" onClick={onOpenPicker}>
          <span className="island-upload-drop__icon">
            <img src={assets.uploadSoundAddIcon} alt="" />
          </span>
          <strong>Tap to add a sound</strong>
          <span>mp3, mp4 up to 10 MB</span>
        </button>
        <div className="island-create__title-field">
          <label className="island-create__field-label" htmlFor="sound-title">Title</label>
          <input
            id="sound-title"
            className="island-create__input"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="island-create__note-field">
          <label className="island-create__field-label" htmlFor="sound-note">
            A short note <span className="island-create__field-optional">(optional)</span>
          </label>
          <textarea
            id="sound-note"
            className="island-create__textarea"
            placeholder="Enter a short note that you want to memorise."
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function IslandCreateSoundPicker({ onCancel, onUpload }) {
  const [selectedId, setSelectedId] = useState(9);

  return (
    <div className="screen sound-picker">
      <div className="sound-picker__sheet">
        <div className="sound-picker__toolbar">
          <button type="button" className="sound-picker__toolbar-btn" onClick={onCancel}>Cancel</button>
          <div className="sound-picker__folder-title">
            <span>Folder</span>
            <img src={assets.soundPickerChevronDown} alt="" />
          </div>
          <button type="button" className="sound-picker__toolbar-btn sound-picker__toolbar-btn--upload" onClick={onUpload}>
            Upload
          </button>
        </div>
        <div className="sound-picker__search">
          <img src={assets.photoPickerSearch} alt="" className="sound-picker__search-icon" />
          <span>Search</span>
        </div>
        <div className="sound-picker__list">
          <div className="sound-picker__item sound-picker__item--folder">
            <img src={assets.soundPickerFolderIcon} alt="" className="sound-picker__folder-icon" />
            <div className="sound-picker__item-text">
              <strong>Folder</strong>
              <span>22/05/24 — 1 item</span>
            </div>
          </div>
          {soundPickerFiles.map((file) => (
            <button
              key={file.id}
              type="button"
              className={`sound-picker__item ${selectedId === file.id ? 'sound-picker__item--selected' : ''}`}
              onClick={() => setSelectedId(file.id)}
            >
              <img
                src={selectedId === file.id ? assets.soundPickerCheckboxSelected : assets.soundPickerCheckbox}
                alt=""
                className="sound-picker__checkbox"
              />
              {file.blank ? (
                <span className="sound-picker__file-preview sound-picker__file-preview--blank" />
              ) : (
                <span className="sound-picker__file-preview">
                  <img src={assets.soundFileIconBg} alt="" className="sound-picker__file-bg" />
                  <img src={assets.soundFileIconFront} alt="" className="sound-picker__file-front" />
                  <span className="sound-picker__file-format">mp3</span>
                </span>
              )}
              <div className="sound-picker__item-text">
                <strong>{file.name}</strong>
                <span>22/05/24 — 1.5 MB</span>
              </div>
            </button>
          ))}
        </div>
        <div className="sound-picker__tabbar">
          <div className="sound-picker__tabbar-pill">
            <span>Recents</span>
            <span>Shared</span>
            <span className="sound-picker__tabbar-active">Browse</span>
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function IslandCreateSoundComplete({
  title,
  note,
  duration,
  onTitleChange,
  onNoteChange,
  onBack,
  onChangeSound,
  onSave,
}) {
  return (
    <div className="screen island-create island-create--sound-complete">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-create__upload-photo-content">
        <h1 className="serif-title-xl">Upload Sound</h1>
        <div className="island-sound-preview">
          <div className="island-sound-preview__player">
            <button type="button" className="island-sound-preview__play" aria-label="Play">
              <img src={assets.soundPlayIcon} alt="" />
            </button>
            <div className="island-sound-preview__waveform">
              {soundWaveformActive.map((height, index) => (
                <span
                  key={`active-${index}`}
                  className="island-sound-preview__bar island-sound-preview__bar--active"
                  style={{ height: `${height}px` }}
                />
              ))}
              {soundWaveformInactive.map((height, index) => (
                <span
                  key={`inactive-${index}`}
                  className="island-sound-preview__bar island-sound-preview__bar--inactive"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
          <p className="island-sound-preview__meta">Voice recording · {duration}</p>
          <button type="button" className="island-sound-preview__change" onClick={onChangeSound}>
            Change Voice
          </button>
        </div>
        <div className="island-create__title-field">
          <label className="island-create__field-label" htmlFor="sound-complete-title">Title</label>
          <input
            id="sound-complete-title"
            className="island-create__input"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="island-create__note-field">
          <label className="island-create__field-label" htmlFor="sound-complete-note">
            A short note <span className="island-create__field-optional">(optional)</span>
          </label>
          <textarea
            id="sound-complete-note"
            className="island-create__textarea"
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </div>
      </div>
      <div className="island-create__footer screen-chrome__footer">
        <PrimaryButton onClick={onSave}>Save</PrimaryButton>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function IslandCreatePhotoComplete({
  image,
  title,
  note,
  onTitleChange,
  onNoteChange,
  onBack,
  onChangePhoto,
  onSave,
}) {
  return (
    <div className="screen island-create island-create--photo-complete">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-create__upload-photo-content">
        <h1 className="serif-title-xl">Upload Photo</h1>
        <div className="island-photo-preview">
          <img src={image} alt="" />
          <button type="button" className="island-photo-preview__change" onClick={onChangePhoto}>
            Change Photo
          </button>
        </div>
        <div className="island-create__title-field">
          <label className="island-create__field-label" htmlFor="photo-complete-title">Title</label>
          <input
            id="photo-complete-title"
            className="island-create__input"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="island-create__note-field">
          <label className="island-create__field-label" htmlFor="photo-complete-note">
            A short note <span className="island-create__field-optional">(optional)</span>
          </label>
          <textarea
            id="photo-complete-note"
            className="island-create__textarea"
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </div>
      </div>
      <div className="island-create__footer screen-chrome__footer">
        <PrimaryButton onClick={onSave}>Save</PrimaryButton>
      </div>
      <HomeIndicator />
    </div>
  );
}

export function IslandDetailScreen({ onBack, onShowAll, onComfortLibrary, onXrHelp }) {
  const suggestions = [
    { title: 'Family photos', desc: 'Warm, visual comfort', icon: assets.detailFamilyIcon, bg: 'rgba(232,149,106,0.15)' },
    { title: "Dad's goodnight message", desc: 'A voice you miss', icon: assets.detailVoiceIcon, bg: 'rgba(155,184,155,0.2)' },
    { title: 'Rainy afternoon playlist', desc: 'Sounds of home', icon: assets.detailSoundIcon, bg: 'rgba(200,184,155,0.27)' },
  ];

  return (
    <div className="screen island-detail screen-scroll">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-detail__content">
        <div className="island-detail__header">
          <h1 className="serif-title-xl">Heaven Isle</h1>
          <p className="body-sm">02.09.2026</p>
        </div>

        <div className="island-detail__hero">
          <img src={assets.detailHero} alt="" />
          <button type="button" className="island-detail__xr">
            <img src={assets.detailXrIcon} alt="" />
            Enter to XR
          </button>
        </div>

        <button type="button" className="island-detail__xr-help" onClick={onXrHelp}>
          <span>How to use XR?</span>
          <img src={assets.detailXrCaret} alt="" />
        </button>

        <div className="island-detail__suggestions">
          <div className="island-screen__label">
            <img src={assets.islandSparkle} alt="" />
            <span>SUGGESTED FOR YOU</span>
          </div>

          {suggestions.map((item) => (
            <button key={item.title} type="button" className="island-detail__suggest">
              <span className="island-detail__suggest-icon" style={{ background: item.bg }}>
                <img src={item.icon} alt="" />
              </span>
              <span className="island-detail__suggest-text">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </span>
              <span className="island-detail__suggest-add">
                <img src={assets.detailPlus} alt="" />
              </span>
            </button>
          ))}
        </div>

        <button type="button" className="island-detail__add-item">
          <img src={assets.detailAddIcon} alt="" />
          Add another item
        </button>

        <div className="island-detail__comfort-section">
          <div className="island-detail__comfort-header">
            <h2>
              Your comfort things <span>2</span>
            </h2>
            <button type="button" onClick={onShowAll}>Show all</button>
          </div>

          <div className="island-detail__comfort-items">
            <button type="button" className="island-detail__comfort-item" onClick={onComfortLibrary}>
              <span className="island-detail__comfort-thumb island-detail__comfort-thumb--photo">
                <img src={assets.detailFamilyPhoto} alt="" />
              </span>
              <strong>Family Photo</strong>
            </button>
            <button type="button" className="island-detail__comfort-item">
              <span className="island-detail__comfort-thumb island-detail__comfort-thumb--sound">
                <img src={assets.detailVoiceWave} alt="" />
              </span>
              <strong>Parents&apos; say good bye</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IslandDetailInfoScreen({ onBack, onEnterXr }) {
  const steps = [
    {
      title: '01. Connect',
      desc: 'Make sure your XR device is connected to the app.',
      icon: assets.xrInfoIconConnect,
      iconBg: '#d8eae0',
      image: assets.xrInfoStepConnect,
      imageHeight: 100,
    },
    {
      title: '02. Get ready for XR',
      desc: 'Put on your device and adjust it comfortably.',
      icon: assets.xrInfoIconHeadset,
      iconBg: '#f5ddd5',
      image: assets.xrInfoStepHeadset,
      imageHeight: 106,
    },
    {
      title: '03. Enter your island',
      desc: 'Step into your island and explore familiar memories around you.',
      icon: assets.xrInfoIconSee,
      iconBg: '#f5edd0',
      image: assets.xrInfoStepIsland,
      imageHeight: 101,
    },
  ];

  return (
    <div className="screen island-detail-info">
      <StatusBar />
      <TopBar onBack={onBack} />
      <div className="island-detail-info__scroll screen-scroll">
        <div className="island-detail-info__content">
          <header className="island-detail-info__header">
            <h1 className="serif-title-xl">Ready for your island?</h1>
            <p className="body-sm">Before entering XR, here&apos;s what to know.</p>
          </header>

          <section className="island-detail-info__steps">
            <h2>How to do it</h2>
            <div className="island-detail-info__steps-list">
              {steps.map((step) => (
                <div key={step.title} className="island-detail-info__step">
                  <div className="island-detail-info__step-copy">
                    <div className="island-detail-info__step-heading">
                      <span className="island-detail-info__step-icon" style={{ background: step.iconBg }}>
                        <img src={step.icon} alt="" />
                      </span>
                      <strong>{step.title}</strong>
                    </div>
                    <p>{step.desc}</p>
                  </div>
                  <div className="island-detail-info__step-image-wrap" style={{ height: step.imageHeight }}>
                    <img src={step.image} alt="" className="island-detail-info__step-image" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="island-detail-info__footer">
        <PrimaryButton onClick={onEnterXr}>Enter to XR</PrimaryButton>
      </div>
      <HomeIndicator bare />
    </div>
  );
}

export function ComfortThingsScreen({ onBack }) {
  const filters = ['All', 'Photo', 'Video', 'Object', 'Sound'];
  const items = [
    { title: 'Family Photo', type: 'Photo', image: assets.libraryImg1 },
    { title: 'Travel to island', type: 'Photo', image: assets.libraryImg2 },
    { title: 'Dream Island', type: 'Video', image: assets.libraryImg3 },
    { title: "Parents' say good bye", type: 'Voice', voice: true },
    { title: 'Golden fields', type: 'Video', image: assets.libraryImg5 },
    { title: 'Garden lantern', type: 'Voice', voice: true },
  ];

  return (
    <div className="screen comfort-screen screen-scroll">
      <StatusBar />
      <button type="button" className="island-create__back" onClick={onBack}>
        <img src={assets.libraryChevronLeft} alt="" />
      </button>
      <div className="comfort-screen__header">
        <div>
          <h1 className="serif-title-xl">Library</h1>
          <p className="body-sm">The things that help you feel like you.</p>
        </div>
        <div className="comfort-screen__actions">
          <button type="button"><img src={assets.librarySearch} alt="" /></button>
          <button type="button"><img src={assets.libraryPlus} alt="" /></button>
        </div>
      </div>
      <div className="comfort-screen__filters">
        {filters.map((filter, i) => (
          <button key={filter} type="button" className={i === 0 ? 'active' : ''}>{filter}</button>
        ))}
      </div>
      <div className="comfort-screen__grid">
        {items.map((item) => (
          <div key={item.title} className="comfort-card">
            <div className="comfort-card__image">
              {item.voice ? (
                <>
                  <img src={assets.libraryVoiceBg} alt="" className="comfort-card__voice-bg" />
                  <span className="comfort-card__voice-overlay" aria-hidden="true" />
                  <img src={assets.libraryVoiceWave} alt="" className="comfort-card__voice-icon" />
                </>
              ) : (
                <img src={item.image} alt="" />
              )}
            </div>
            <strong>{item.title}</strong>
            <span>{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
