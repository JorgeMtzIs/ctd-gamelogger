import { useState } from 'react';
import LabeledInput from '../../shared/LabeledInput';
import styles from './GameCard.module.css';

function GameCard({ game, onUpdateGame, onFavoriteGame }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(game.title);
  const [workingYear, setWorkingYear] = useState(game.year);
  const [workingPlatform, setWorkingPlatform] = useState(game.platform);
  const nextState =
    game.completionStatus === 'Backlogged' ? 'In Progress' : 'Completed';

  function handleTitleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleYearEdit(event) {
    setWorkingYear(event.target.value);
  }

  function handlePlatformEdit(event) {
    setWorkingPlatform(event.target.value);
  }

  function handleCancel() {
    setWorkingTitle(game.title);
    setWorkingPlatform(game.platform);
    setWorkingYear(game.year);
    setIsEditing(false);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (!isEditing) return;
    onUpdateGame({
      ...game,
      title: workingTitle,
      year: workingYear,
      platform: workingPlatform,
    });
    setIsEditing(false);
  }

  function handleNextStatus() {
    onUpdateGame({ ...game, completionStatus: nextState });
  }

  function handlePreviousStatus() {
    onUpdateGame({ ...game, completionStatus: 'Backlogged' });
  }

  function handleFavorite() {
    onFavoriteGame(game.id);
  }

  return (
    <div className={styles.gameCard}>
      {isEditing ? (
        <form onSubmit={(e) => handleUpdate(e)}>
          <ul className={styles.gameCardProperties}>
            <li>
              <LabeledInput
                type="text"
                labelText="Title: "
                value={workingTitle}
                onChange={handleTitleEdit}
              />
            </li>
            <li>
              <LabeledInput
                type="number"
                labelText="Year Released: "
                value={workingYear}
                onChange={handleYearEdit}
              />
            </li>
            <li>
              <LabeledInput
                type="text"
                labelText="Platform: "
                value={workingPlatform}
                onChange={handlePlatformEdit}
              />
            </li>
          </ul>
          <button className={styles.editButton}>Update</button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{game.title}</h2>
          <button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <ul className={styles.gameCardProperties}>
            <li>Year released: {game.year}</li>
            <li>Platform: {game.platform}</li>
            <li>Status: {game.completionStatus}</li>
          </ul>
          <button
            disabled={game.completionStatus === 'Backlogged'}
            onClick={() => handlePreviousStatus()}
          >
            Backlog
          </button>
          <button
            disabled={game.completionStatus === 'Completed'}
            onClick={() => handleNextStatus()}
          >
            {game.completionStatus === 'Backlogged' ? 'Play' : 'Complete'}
          </button>
          {game.completionStatus === 'Completed' && (
            <button
              className={styles.favoriteButton}
              onClick={() => handleFavorite()}
            >
              {game.favorite ? 'Unfavorite' : 'Favorite'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default GameCard;
