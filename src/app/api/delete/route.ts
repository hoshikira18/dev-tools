export async function POST(request) {
  const body = await request.json();
  const token = body.token;
  const chosenRepos = body.chosenRepos;

  const promises = chosenRepos.map((repo) =>
    fetch("https://api.github.com/repos/" + repo, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token, // Use your token here
      },
    }).then((res) => {
      if (res.ok) {
        console.log(`Repo ${repo} deleted successfully!`);
      } else {
        console.error(`Failed to delete repo ${repo}. Status: ${res.status}`);
      }
      return res; // Return the response to ensure Promise.all resolves all promises
    })
  );

  // Use Promise.all to execute all fetches concurrently
  try {
    const results = await Promise.all(promises);
  } catch (error) {
    console.error("An error occurred during repo deletion:", error);
  }

  return new Response(
    JSON.stringify({ message: "Data deleted successfully", body }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
