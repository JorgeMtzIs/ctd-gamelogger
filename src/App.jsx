import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import GameInfoList from './features/GameInfoList/GameInfoList';
import GameForm from './features/GameForm';

function App() {
  const [gameList, setGameList] = useState([]);

  function addGame(game) {
    const newGame = { id: Date.now(), ...game };
    setGameList([...gameList, newGame]);
  }

  function updateGame(editedGame) {
    const updatedGames = gameList.map((game) => {
      if (game.id === editedGame.id) {
        return { ...editedGame };
      }
      return game;
    });
    setGameList(updatedGames);
  }

  return (
    <div className={styles.app}>
      <h1>GameLogger</h1>
      <GameForm onAddGame={addGame} />
      <GameInfoList gameList={gameList} onUpdateGame={updateGame} />
    </div>
  );
}

export default App;
