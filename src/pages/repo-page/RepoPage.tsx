import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRepoDetailsFx } from "@/entities/repo/api";
import RepoDetails from "@/pages/repo-page/ui/RepoDetails";
import { RepoDetailsResponse } from "@/entities/repo/model";

const RepoPage: React.FC = () => {
  const { name, owner } = useParams<{ name: string; owner: string }>();
  const [repo, setRepo] = useState<RepoDetailsResponse | null>(null);

  useEffect(() => {
    const loadRepoDetails = async () => {
      const data = await fetchRepoDetailsFx(name || "", owner || "");
      setRepo(data);
    };
    loadRepoDetails();
  }, [name, owner]);

  if (!repo) return <p>Loading...</p>;

  return <RepoDetails repo={repo} />;
};

export default RepoPage;
