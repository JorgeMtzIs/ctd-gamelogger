import styles from './GameCard.module.css';

function GameCard({ title, year, platform, completionState }) {
  return (
    <div className={styles.gameCard}>
      <h2>{title}</h2>
      <ul className={styles.gameCardProperties}>
        <li>Year released: {year}</li>
        <li>Platform: {platform}</li>
        <li>Status: {completionState}</li>
      </ul>
    </div>
  );
}

export default GameCard;
