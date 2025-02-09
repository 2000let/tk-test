import React from 'react';
import styles from './PaginationWarning.module.css';

interface PaginationWarningProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const PaginationWarning: React.FC<PaginationWarningProps> = ({ checked, onChange }) => {
  return (
    <div className={styles.warning}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        Разрешить пропуск страниц (Внимание: из-за особенностей Cursor-пагинации для корректной работы тут написан костыль, с первого взгляда отрабатывает, но мб может баговать)
      </label>
    </div>

  );
};

export default PaginationWarning;