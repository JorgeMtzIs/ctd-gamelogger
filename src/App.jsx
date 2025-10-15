import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import GameInfoList from './features/GameInfoList/GameInfoList';
import GameForm from './features/GameForm';

function App() {
  const [gameList, setGameList] = useState([]);

  function onAddGame(game) {
    const newGame = { id: Date.now(), ...game };
    setGameList([...gameList, newGame]);
  }

  return (
    <div className={styles.app}>
      <h1>GameLogger</h1>
      <GameForm onAddGame={onAddGame} />
      <GameInfoList gameList={gameList} />
    </div>
  );
}

export default App;
