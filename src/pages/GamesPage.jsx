import GameForm from '../features/GameForm';
import GameInfoList from '../features/GameInfoList/GameInfoList';

function GamesPage({
  gameList,
  isLoading,
  isSaving,
  onAddGame,
  onUpdateGame,
  onFavoriteGame,
}) {
  const Status = Object.freeze({
    BACKLOGGED: 'Backlogged',
    PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  });

  return (
    <>
      <GameForm isSaving={isSaving} onAddGame={onAddGame}>
        <option value={Status.BACKLOGGED}>Backlogged</option>
        <option value={Status.PROGRESS}>In Progress</option>
        <option value={Status.COMPLETED}>Completed</option>
      </GameForm>
      <GameInfoList
        gameList={gameList}
        isLoading={isLoading}
        onUpdateGame={onUpdateGame}
        onFavoriteGame={onFavoriteGame}
      />
    </>
  );
}

export default GamesPage;
