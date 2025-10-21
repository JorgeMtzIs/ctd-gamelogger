import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import Header from './shared/Header';
import GamesPage from './pages/GamesPage';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Route, Routes, useLocation } from 'react-router';

function App() {
  const [gameList, setGameList] = useState(() => {
    const savedGames = JSON.parse(localStorage.getItem('userGameList'));
    return savedGames || [];
  });
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('GameLogger');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else {
      setTitle('Not Found');
    }
  }, [location]);

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
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <GamesPage
              gameList={gameList}
              onAddGame={addGame}
              onUpdateGame={updateGame}
              onFavoriteGame={favoriteGame}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
