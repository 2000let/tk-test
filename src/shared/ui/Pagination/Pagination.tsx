import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  allowSkipPages: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  allowSkipPages,
}) => {
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(startPage + 4, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const isPageDisabled = (page: number) => {
    if (allowSkipPages) return false;
    return Math.abs(page - currentPage) > 1;
  };

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isPageDisabled(page)}
          className={`${styles.pagination__button} ${
            currentPage === page ? styles["pagination__button--active"] : ""
          } ${isPageDisabled(page) ? styles["pagination__button--disabled"] : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
