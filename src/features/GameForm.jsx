import { useState } from 'react';
import LabeledInput from '../shared/LabeledInput';
import styles from './GameForm.module.css';
import styled from 'styled-components';

function GameForm({ children, isSaving, onAddGame }) {
  const [isAdding, setIsAdding] = useState(false);
  const [gameData, setGameData] = useState({
    title: '',
    year: '',
    platform: '',
    completionStatus: '',
  });

  const StyledButton = styled.button`
    font-style: ${isSaving ? 'italic' : 'normal'};
  `;

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

  function handleCancelAdd() {
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
        <form className={styles.gameForm} onSubmit={(e) => handleAddGame(e)}>
          <LabeledInput
            type="text"
            labelText="Title: "
            onChange={(e) => handleChange(e)}
            name="title"
          />
          <LabeledInput
            type="number"
            labelText="Year Released: "
            onChange={(e) => handleChange(e)}
            name="year"
          />
          <LabeledInput
            type="text"
            labelText="Platform: "
            onChange={(e) => handleChange(e)}
            name="platform"
          />
          <label>
            Status:
            <select name="completionStatus" onChange={(e) => handleChange(e)}>
              <option value="">--Please choose an option--</option>
              {children}
            </select>
          </label>
          <StyledButton
            disabled={
              gameData.completionStatus.trim() === '' ||
              gameData.platform.trim() === '' ||
              gameData.title.trim() === '' ||
              gameData.year.trim() === ''
            }
          >
            {isSaving ? 'Saving' : 'Submit'}
          </StyledButton>
          <button onClick={handleCancelAdd}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Game</button>
      )}
    </>
  );
}

export default GameForm;
