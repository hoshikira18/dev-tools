import { auth } from '../../../auth';
import LoginTemplate from '../..//components/login-template';
import GithubDeleteTemplate from '../../components/github-delete/template';
import React from 'react';

const GithubDeleteRepos = async () => {
  const session = await auth();
  if (!session) {
    return <LoginTemplate />;
  }

  const url = 'https://api.github.com/user/repos';
  const token = session.accessToken;

  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  // fetch repos
  const repos = await response.json();

  return <GithubDeleteTemplate session={session} repos={repos} />;
};

export default GithubDeleteRepos;
