import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import GameInfoList from './features/GameInfoList/GameInfoList';
import GameForm from './features/GameForm';

function App() {
  const [gameList, setGameList] = useState([]);
  const Status = Object.freeze({
    BACKLOGGED: 'Backlogged',
    PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  });

  useEffect(() => {
    const games = JSON.parse(localStorage.getItem('userGameList'));
    if (games) {
      setGameList(games);
    }
  }, []);

  function addGame(game) {
    const newGame = { id: Date.now(), favorite: false, ...game };
    localStorage.setItem(
      'userGameList',
      JSON.stringify([...gameList, newGame])
    );
    setGameList([...gameList, newGame]);
  }

  function updateGame(editedGame) {
    const updatedGames = gameList.map((game) => {
      if (game.id === editedGame.id) {
        return { ...editedGame };
      }
      return game;
    });
    localStorage.setItem('userGameList', JSON.stringify(updatedGames));
    setGameList(updatedGames);
  }

  function favoriteGame(id) {
    const favoritedGames = gameList.map((game) => {
      if (id === game.id) {
        return { ...game, favorite: !game.favorite };
      }
      return game;
    });
    localStorage.setItem('userGameList', JSON.stringify(favoritedGames));
    setGameList(favoritedGames);
  }

  return (
    <div className={styles.app}>
      <h1>GameLogger</h1>
      <GameForm onAddGame={addGame}>
        <option value={Status.BACKLOGGED}>Backlogged</option>
        <option value={Status.PROGRESS}>In Progress</option>
        <option value={Status.COMPLETED}>Completed</option>
      </GameForm>
      <GameInfoList
        gameList={gameList}
        onUpdateGame={updateGame}
        onFavoriteGame={favoriteGame}
      />
    </div>
  );
}

export default App;
