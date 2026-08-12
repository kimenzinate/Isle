import './PrimaryButton.css';

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  variant = 'dark',
  fullWidth = true,
  className = '',
}) {
  return (
    <button
      type="button"
      className={`primary-btn primary-btn--${variant} ${fullWidth ? 'primary-btn--full' : ''} ${disabled ? 'primary-btn--disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
