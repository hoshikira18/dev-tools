import Link from 'next/link';

const RepoCard = ({ repo, chosenRepos, setChosenRepos }) => {
  const item = repo.owner.login + '/' + repo.name;
  return (
    <div
      onClick={() => {
        setChosenRepos((prevChosenRepos) => {
          if (prevChosenRepos.includes(item)) {
            return prevChosenRepos.filter((r) => r !== item);
          } else {
            return [...prevChosenRepos, item];
          }
        });
      }}
      className="flex items-center justify-between space-y-3 rounded-md border-2 border-white/30 p-5"
    >
      <Link
        href={repo.clone_url}
        target="_blank"
        className="font-medium text-blue-500 underline"
      >
        {repo.name}
      </Link>
      <input
        type="checkbox"
        onChange={(event) => {}}
        checked={chosenRepos.includes(item)}
        className="checkbox-error checkbox"
      />
    </div>
  );
};

export default RepoCard;
