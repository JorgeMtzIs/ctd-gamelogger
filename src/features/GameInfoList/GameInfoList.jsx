import GameCard from './GameCard';
import styles from './GameInfoList.module.css';

function GameInfoList({ gameList, onUpdateGame, onFavoriteGame }) {
  return gameList.length === 0 ? (
    <p>Press 'Add Game' above to get started</p>
  ) : (
    <ul className={styles.gameInfoList}>
      {gameList.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onUpdateGame={onUpdateGame}
          onFavoriteGame={onFavoriteGame}
        />
      ))}
    </ul>
  );
}

export default GameInfoList;
