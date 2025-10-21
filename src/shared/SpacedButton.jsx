import styles from './SpacedButton.module.css';

function SpacedButton({ disabled, onClick, text }) {
  return (
    <button
      className={styles.spacedButton}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default SpacedButton;
