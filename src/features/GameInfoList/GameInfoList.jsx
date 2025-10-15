import GameCard from './GameCard';
import styles from './GameInfoList.module.css';

function GameInfoList() {
  return (
    <ul className={styles.gameInfoList}>
      <GameCard
        title="Mario"
        year="1986"
        platform="NES"
        completionState="Completed"
      />
      <GameCard
        title="Zelda"
        year="1986"
        platform="NES"
        completionState="Playing"
      />
      <GameCard
        title="Pokemon"
        year="1996"
        platform="Gameboy"
        completionState="Backlogged"
      />
      <GameCard
        title="Pikmin"
        year="2001"
        platform="Gamecube"
        completionState="Playing"
      />
    </ul>
  );
}

export default GameInfoList;
