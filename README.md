# Hello! 👋

This is a full-stack website built using the MERN stack (MongoDB, Express.js, React, and Node.js). The backend is hosted on MongoDB Atlas, and the site is deployed and live at [https://holoflash.onrender.com/](https://holoflash.onrender.com/). I'm currently using Firebase for user authentication, and SASS for styling.

## Users can:

-   Create an account using email and password
-   Sign in with their created account
-   Post song suggestions to playlists (if signed in)
-   Upvote/downvote suggestions (if signed in)
-   See suggestions ranked by their score
-   See the username of suggester

## Backend structure:

<details open>
  <summary>playlist-name</summary>
  <ul>
    <details open>
      <summary >suggestions</summary>
      <ul>
        <details open>
          <summary>suggestion_id</summary>
          <ul>
            <li>suggestion: Song - Artist</li>
          </ul>
          <ul>
            <li>postedBy: user_name</li>
          </ul>
          <ul>
            <li>rating: 2</li>
          </ul>
          <ul>
            <li><details>
              <summary>upvotedBy</summary>
              <ul>
                <li>user_name</li>
                <li>another_user</li>
                <li>yet_another_user</li>
              </ul>
            </details>
            </li>
            <li>
              <details>
                <summary>downvotedBy</summary>
                <ul>
                  <li>displeased_user</li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </ul>
    </details>
  </ul>
</details>

---

## ROADMAP:

This site was built while learning how to use the MERN stack but is quickly evolving into a real passion project. The idea is to build a platform for Spotify Playlist curators to receive song submissions in a more organic way than what is currently available online.

<details>
  <summary>The most immediate things to work on:</summary>
  <ul>
    <li>Rewrite the JavaScript to TypeScript in strict mode for a better development experience moving forward</li>
    <li>Rebuild using Vite to streamline and reduce bloat</li>
  </ul>
</details>

<details>
  <summary>And a little further ahead:</summary>
  <ul>
    <li>Have two distinct user types - Curator & User</li>
    <li>Restructure the backend to allow multiple curators</li>
    <li>Allow Users to log in with Spotify</li>
    <li>Allow Users to search for songs to submit using the Spotify API</li>
    <li>Use the Spotify API to allow Curators to add the playlists they want to be on the platform</li>
    <li>Implement Curator options to automatically add songs to their playlists based on song rating thresholds.</li>
  </ul>
</details>
