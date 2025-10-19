import GameCard from './GameCard';
import styles from './GameInfoList.module.css';

function GameInfoList({ gameList, onUpdateGame }) {
  return gameList.length === 0 ? (
    <p>Press 'Add Game' above to get started</p>
  ) : (
    <ul className={styles.gameInfoList}>
      {gameList.map((game) => (
        <GameCard key={game.id} game={game} onUpdateGame={onUpdateGame} />
      ))}
    </ul>
  );
}

export default GameInfoList;
