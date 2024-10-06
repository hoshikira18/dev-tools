'use client';
import React, { useEffect, useState } from 'react';
import RepoCard from './repo-card';
import Button from '../button';
import { Search } from 'lucide-react';

const GithubDeleteTemplate = ({ session, repos }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chosenRepos, setChosenRepos] = useState([]);
  const [repoValues, setRepoValues] = useState(repos);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDelete = async (e) => {
    setIsLoading(true);
    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chosenRepos, token: session.accessToken }),
    }).then((res) => {
      setIsLoading(false);
      return res;
    });
  };

  useEffect(() => {
    if (searchKeyword.length === 0) {
      setRepoValues(repos);
    } else {
      setRepoValues([...repos.filter((r) => r.name.includes(searchKeyword))]);
    }
  }, [searchKeyword, repos]);

  return (
    <div className="flex items-center justify-center bg-black text-white/90 md:h-screen md:px-5">
      <div className="w-full space-y-5 rounded-md bg-secondary p-5 md:p-10 lg:w-2/3">
        <div className="flex flex-col items-center justify-between space-y-2">
          <p className="text-2xl font-semibold tracking-wider">
            Github repositories
          </p>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => {
                repos.forEach((r) =>
                  setChosenRepos((pre) => [
                    ...pre,
                    r.owner.login + '/' + r.name,
                  ]),
                );
              }}
            >
              Select all
            </Button>
            <Button
              onClick={() => {
                setChosenRepos([]);
              }}
            >
              Unselect all
            </Button>
            <form onSubmit={handleDelete}>
              <Button type={'submit'}>
                {isLoading ? (
                  <span className="loading loading-spinner text-warning"></span>
                ) : (
                  <span>Delete</span>
                )}
              </Button>
            </form>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-transparent">
          <Button>
            <Search />
          </Button>
          <input
            type="text"
            placeholder="Search repos"
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            className="w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 outline-none"
          />
        </div>

        {repoValues.length == 0 ? (
          <div>Không có repos nào!</div>
        ) : (
          <div className="grid h-full gap-5 overflow-auto px-2 md:h-[60vh] md:grid-cols-2">
            {repoValues.map((repo) => {
              return (
                <RepoCard
                  repo={repo}
                  key={repo.id}
                  chosenRepos={chosenRepos}
                  setChosenRepos={setChosenRepos}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubDeleteTemplate;
