import React from 'react';
import styles from './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading} data-testid="loading">
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading; 