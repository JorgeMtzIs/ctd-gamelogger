import GameForm from '../features/GameForm';
import GameInfoList from '../features/GameInfoList/GameInfoList';

function GamesPage({ gameList, onAddGame, onUpdateGame, onFavoriteGame }) {
  const Status = Object.freeze({
    BACKLOGGED: 'Backlogged',
    PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  });

  return (
    <>
      <GameForm onAddGame={onAddGame}>
        <option value={Status.BACKLOGGED}>Backlogged</option>
        <option value={Status.PROGRESS}>In Progress</option>
        <option value={Status.COMPLETED}>Completed</option>
      </GameForm>
      <GameInfoList
        gameList={gameList}
        onUpdateGame={onUpdateGame}
        onFavoriteGame={onFavoriteGame}
      />
    </>
  );
}

export default GamesPage;
