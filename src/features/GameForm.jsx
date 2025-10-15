import { useState } from 'react';

function GameForm({ onAddGame }) {
  const Status = Object.freeze({
    BACKLOGGED: 'Backlogged',
    PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [gameData, setGameData] = useState({
    title: '',
    year: '',
    platform: '',
    completionStatus: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: value });
  }

  function handleAddGame(event) {
    event.preventDefault();
    onAddGame(gameData);
    setGameData({
      title: '',
      year: '',
      platform: '',
      completionStatus: '',
    });
    setIsAdding(false);
  }

  return (
    <>
      {isAdding ? (
        <form onSubmit={(e) => handleAddGame(e)}>
          <label>
            Title:
            <input type="text" name="title" onChange={(e) => handleChange(e)} />
          </label>
          <label>
            Year Released:
            <input
              type="number"
              name="year"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Platform:
            <input
              type="text"
              name="platform"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Status:
            <select name="completionState" onChange={(e) => handleChange(e)}>
              <option value={Status.BACKLOGGED}>
                --Please choose an option--
              </option>
              <option value={Status.BACKLOGGED}>Backlogged</option>
              <option value={Status.PROGRESS}>Playing</option>
              <option value={Status.COMPLETED}>Completed</option>
            </select>
          </label>
          <button>Submit</button>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Game</button>
      )}
    </>
  );
}

export default GameForm;
