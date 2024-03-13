export default function GitHubLoginLink() {
  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
    scope: "user:email"
  })
  const baseUrl = "https://github.com/login/oauth/authorize"
  const url = `${baseUrl}?${queryParams.toString()}`
  console.log("== url:", url)
  return <a href={url}>Login with GitHub</a>
}
