import { assets } from '../assets';
import './MoodSelector.css';

const moodLabels = [
  "I'm struggling.",
  "I'm not feeling great.",
  "I'm okay.",
  "I'm feeling better.",
  "I'm feeling good.",
];

const moodFaces = [
  assets.moodFace1,
  assets.moodFace2,
  assets.moodFace3,
  assets.moodFace4,
  assets.moodFace5,
];

const moodTracks = [
  assets.mood1,
  assets.mood2,
  assets.mood3,
  assets.mood4,
  assets.mood5,
];

const facePositions = [
  { inset: 17, size: 150 },
  { inset: 12.88, size: 158.242 },
  { inset: 8.92, size: 166.141 },
  { inset: 6.98, size: 170.031 },
  { inset: 4.91, size: 174.172 },
];

export default function MoodSelector({ value = 2, onChange }) {
  const face = facePositions[value];

  return (
    <div className="mood-selector" role="group" aria-label="Mood">
      <div className="mood-selector__face">
        <img
          src={moodFaces[value]}
          alt=""
          className="mood-selector__face-img"
          style={{
            left: `${face.inset}px`,
            top: `${face.inset}px`,
            width: `${face.size}px`,
            height: `${face.size}px`,
          }}
        />
      </div>
      <div className="mood-selector__controls">
        <div className="mood-selector__slider-wrap">
          <img src={moodTracks[value]} alt="" className="mood-selector__track" />
          <div className="mood-selector__segments">
            {moodTracks.map((_, index) => (
              <button
                key={index}
                type="button"
                className="mood-selector__segment"
                aria-label={moodLabels[index]}
                aria-pressed={value === index}
                onClick={() => onChange(index)}
              />
            ))}
          </div>
        </div>
        <p className="mood-selector__label" aria-live="polite">
          {moodLabels[value]}
        </p>
      </div>
    </div>
  );
}

export { moodLabels };
