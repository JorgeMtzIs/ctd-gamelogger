import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import GameInfoList from './features/GameInfoList/GameInfoList';

function App() {
  return (
    <div className={styles.app}>
      <h1>GameLogger</h1>
      <GameInfoList />
    </div>
  );
}

export default App;
