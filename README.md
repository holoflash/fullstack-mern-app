# HOLOFLASH - playlist submissions

A full-stack website built using the MERN stack (MongoDB, Express.js, React, and Node.js). The backend is hosted on MongoDB Atlas, and the site is deployed live at https://holoflash.onrender.com/. I'm using Firebase for authentication, and SASS for styling.

#### Backend structure:

<details open>
  <summary>playlist-name</summary>
  <ul>
    <details open>
    <summary>suggestions</summary>
      <ul>
          <details open>
            <summary>suggestion_id</summary>
            <ul>
              <li>suggestion: Eye of the Tiger - Survivor</li>
            </ul>
            <ul>
              <li>postedBy: user_name</li>
            </ul>
            <ul>
              <li>rating: 2</li>
            </ul>
            <details open>
            <summary>upvotedBy</summary>
             <ul>
              <li>user_name</li>
              <li>another_user</li>
              <li>yet_another_user</li>
               </ul>
            </details>
              <details open>
            <summary>downvotedBy</summary>
             <ul>
              <li>displeased_user</li>
               </ul>
            </details>
          </details>
          </details>
      </ul>
  </ul>
</details>

## Users can:

-   Create an account using email and password
-   Sign in with their created account
-   Post song suggestions to playlists (if signed in)
-   Upvote/downvote suggestions (if signed in)
-   See suggestions ranked by their score
-   See the username of suggester

## Roadmap

This site was built while learning how to use the MERN stack but is quickly evolving into a real passion project. The idea is to build a platform for Spotify Playlist curators to receive song submissions in a more organic way than what is currently available online.

Here are the most immediate things I'll be working on:

-   Rewrite the JavaScript to TypeScript in strict mode for a better development experience moving forward
-   Rebuild using Vite to streamline and reduce bloat

And a little further ahead:

-   Have two distinct user types - Curator & User
-   Restructure the backend to allow multiple curators
-   Allow Users to log in with Spotify
-   Allow Users to search for songs to submit using the Spotify API
-   Use the Spotify API to allow Curators to add the playlists they want to be on the platform
-   Implement Curator options to automatically add songs to their playlists based on song rating thresholds.
