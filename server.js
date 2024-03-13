import express from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: ".env.local" })

const client_id = process.env.VITE_GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
let access_token = null

console.log("== client_id:", client_id)
console.log("== client_secret:", client_secret)

const USER = {
  username: "luke",
  password: "hunter2",
  name: "Luke Skywalker",
  email: "OriginalLastJedi@hotmail.com"
}
const TOKEN = "abcd1234"

const app = express()
const port = 8000

function generateAuthToken(username) {
    return TOKEN
}

function authTokenIsValid(token) {
    return token === TOKEN
}

app.use(express.json())

app.get("/api/user", (req, res) => {
  const { password, ...body } = USER
  res.status(200).send(body)
})

app.post("/api/tokenExchange", async (req, res) => {
  const { code } = req.body
  console.log("== code:", code)
  if (!code) {
    res.status(400).send({ err: "Must specify auth code" })
  } else {
    const githubRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret,
        code: code
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    const githubResBody = await githubRes.json()
    if (githubResBody.access_token) {
      access_token = githubResBody.access_token
      res.status(200).send({ msg: "OK!" })
    } else {
      res.status(401).send({
        err: githubResBody.error_description
      })
    }
  }
})

app.listen(port, () => console.log(`API server listening on port ${port}`))
