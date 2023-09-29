import React from 'react';

import styles from './button.module.css';

export function Button({ text, onClick }) {
    return (
        <button onClick={onClick} className={styles.button}>
            {text}
        </button>
    );
}
