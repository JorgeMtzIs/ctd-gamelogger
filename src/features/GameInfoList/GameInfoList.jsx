import { useNavigate, useSearchParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import GameCard from './GameCard';
import styles from './GameInfoList.module.css';

function GameInfoList({ gameList, isLoading, onUpdateGame, onFavoriteGame }) {
  const navigate = useNavigate();
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredList = useCallback(() => {
    if (filterFavorites) {
      return gameList.filter((game) => game.favorite);
    } else {
      return gameList;
    }
  }, [filterFavorites, gameList]);
  const itemsPerPage = 9;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const firstGameIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredList().length / itemsPerPage);

  function handlePreviousPage() {
    if (!(currentPage - 1 < 1)) {
      setSearchParams({ page: currentPage - 1, per_page: itemsPerPage });
    }
  }

  function handleNextPage() {
    if (!(currentPage + 1 > totalPages)) {
      setSearchParams({ page: currentPage + 1, per_page: itemsPerPage });
    }
  }

  function handleFilter() {
    setFilterFavorites(!filterFavorites);
  }

  useEffect(() => {
    if (
      typeof currentPage !== 'number' ||
      currentPage < 1 ||
      currentPage > totalPages
    ) {
      navigate('/');
    }
  }, [currentPage, totalPages, navigate]);

  return filteredList().length === 0 ? (
    isLoading ? (
      <p>Loading games</p>
    ) : (
      <p>Press 'Add Game' above to get started</p>
    )
  ) : (
    <>
      <label>
        <input type="checkbox" onChange={handleFilter} />
        Filter by Favorites
      </label>
      <ul className={styles.gameInfoList}>
        {filteredList()
          .slice(firstGameIndex, firstGameIndex + itemsPerPage)
          .map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onUpdateGame={onUpdateGame}
              onFavoriteGame={onFavoriteGame}
            />
          ))}
      </ul>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleNextPage()}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default GameInfoList;
