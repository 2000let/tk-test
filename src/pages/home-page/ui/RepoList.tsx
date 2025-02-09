import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/shared/lib/formatDate";
import styles from "./RepoList.module.css";
import { RepoNode } from "@/entities/repo/model";

interface RepoListProps {
  repos: RepoNode[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <ul className={styles.list}>
      {repos.map((repo: RepoNode) => (
        <li key={repo.id} className={styles.item}>
          <div className={styles.content}>
            <Link
              to={`repo/${repo.owner.login}/${repo.name}`}
              className={styles.name}
            >
              {repo.name}
            </Link>
            
            <div className={styles.info}>
              <span className={styles.stars}>
                ⭐ {repo.stargazerCount}
              </span>
              <span className={styles.date}>
                {formatDate(repo.updatedAt)}
              </span>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.github}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
