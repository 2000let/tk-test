import React from "react";
import { useNavigate } from "react-router-dom";
import { RepoDetailsResponse } from "@/entities/repo/model";
import { formatDate } from "@/shared/lib/formatDate";
import styles from "./RepoDetails.module.css";

interface RepoDetailsProps {
  repo: RepoDetailsResponse;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repo }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.details}>
      <button 
        onClick={() => navigate('/')} 
        className={styles.back}
      >
        ← Назад
      </button>

      <div className={styles.header}>
        <h1 className={styles.header__title}>
          {repo.name}
          <span className={styles.header__stars}>
            <span>⭐</span>
            {repo.stargazerCount}
          </span>
          <span className={styles.header__date}>
            {formatDate(repo.updatedAt)}
          </span>
        </h1>
      </div>
      
      <div className={styles.owner}>
        {repo.owner.avatarUrl && (
          <img 
            src={repo.owner.avatarUrl} 
            alt={`${repo.owner.login}'s avatar`}
            className={styles.owner__avatar}
          />
        )}
        <a 
          href={repo.owner.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.owner__link}
        >
          {repo.owner.login}
        </a>
      </div>

      {repo.languages.edges.length > 0 && (
        <div className={styles.languages}>
          <h3 className={styles.languages__title}>Языки:</h3>
          <ul className={styles.languages__list}>
            {repo.languages.edges.map(({ node }) => (
              <li key={node.name} className={styles.languages__item}>
                {node.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {repo.description && (
        <div className={styles.description}>
          <h3 className={styles.description__title}>Описание:</h3>
          <p className={styles.description__text}>{repo.description}</p>
        </div>
      )}
    </div>
  );
};

export default RepoDetails;
