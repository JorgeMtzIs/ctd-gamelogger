import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import Header from './shared/Header';
import GamesPage from './pages/GamesPage';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Route, Routes, useLocation } from 'react-router';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [gameList, setGameList] = useState(() => {
    setIsLoading(true);
    try {
      const savedGames = JSON.parse(localStorage.getItem('userGameList'));
      return savedGames || [];
    } catch (error) {
      setErrorMessage('Error loading list from localStorage');
    } finally {
      setIsLoading(false);
    }
    return [];
  });
  const [isSaving, setIsSaving] = useState(false);
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
    setIsSaving(true);
    try {
      localStorage.setItem(
        'userGameList',
        JSON.stringify([...gameList, newGame])
      );
      setGameList([...gameList, newGame]);
    } catch (error) {
      console.log(error);
      setErrorMessage('Error saving gameList to localStorage');
    } finally {
      setIsSaving(false);
    }
  }

  function updateGame(editedGame) {
    const originalGame = gameList.find((game) => game.id === editedGame.id);
    const updatedGames = gameList.map((game) => {
      if (game.id === editedGame.id) {
        return { ...editedGame };
      }
      return game;
    });
    setIsSaving(true);
    try {
      localStorage.setItem('userGameList', JSON.stringify(updatedGames));
      setGameList(updatedGames);
    } catch (error) {
      console.log(error);
      setErrorMessage('Error updating game information. Reverting...');
      const revertedGames = gameList.map((game) => {
        if (game.id === originalGame.id) {
          return { ...originalGame };
        }
        return game;
      });
      setGameList([...revertedGames]);
    } finally {
      setIsSaving(false);
    }
  }

  function favoriteGame(id) {
    const originalGame = gameList.find((game) => game.id === id);
    const favoritedGames = gameList.map((game) => {
      if (id === game.id) {
        return { ...game, favorite: !game.favorite };
      }
      return game;
    });
    setIsSaving(true);
    try {
      localStorage.setItem('userGameList', JSON.stringify(favoritedGames));
      setGameList(favoritedGames);
    } catch (error) {
      console.log(error);
      setErrorMessage('Error setting game as favorite. Reverting...');
      const revertedGames = gameList.map((game) => {
        if (game.id === originalGame.id) {
          return { ...originalGame };
        }
        return game;
      });
      setGameList([...revertedGames]);
    } finally {
      setIsSaving(false);
    }
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
              isLoading={isLoading}
              isSaving={isSaving}
              onAddGame={addGame}
              onUpdateGame={updateGame}
              onFavoriteGame={favoriteGame}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {errorMessage && (
        <div className={styles.error}>
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
