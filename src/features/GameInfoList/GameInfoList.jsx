import GameCard from './GameCard';
import styles from './GameInfoList.module.css';

function GameInfoList({ gameList }) {
  return (
    <ul className={styles.gameInfoList}>
      {gameList.map((game) => (
        <GameCard
          key={game.id}
          title={game.title}
          year={game.year}
          platform={game.platform}
          completionState={game.completionState}
        />
      ))}
    </ul>
  );
}

export default GameInfoList;
