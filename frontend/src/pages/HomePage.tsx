const HomePage = () => {
    return (
        <div className="container home">
            <h1>Hello! 👋</h1>
            <p>
                This is a full-stack website I have built using the MERN stack
                (MongoDB, Express.js, React, and Node.js). The backend is hosted
                on MongoDB Atlas, and the site is deployed via{' '}
                <a href="https://render.com/">https://render.com</a>. I'm
                currently using Firebase for user authentication, and SASS for
                styling.
            </p>

            <h4>Users can:</h4>
            <ul>
                <li>Create an account using email and password</li>
                <li>Sign in with their created account</li>
                <li>Post song suggestions to playlists (if signed in)</li>
                <li>Upvote/downvote suggestions (if signed in)</li>
                <li>See suggestions ranked by their score</li>
                <li>See the username of suggester</li>
            </ul>
            <br></br>
            <hr></hr>
            <h4>Backend structure:</h4>
            <details className="dropdown" open={true}>
                <summary>playlist-name</summary>
                <ul>
                    <details open={true}>
                        <summary>suggestions</summary>
                        <ul>
                            <details open={true}>
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
                                    <li>
                                        <details>
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
            <br></br>
            <hr></hr>
            <h4>ROADMAP:</h4>
            <p>
                This site was built while learning how to use the MERN stack but
                is quickly evolving into a real passion project. The idea is to
                build a platform for Spotify Playlist curators to receive song
                submissions in a more organic way than what is currently
                available online.
            </p>
            <details>
                <summary>The most immediate things to work on:</summary>
                <ul>
                    <li>
                        Rewrite the JavaScript to TypeScript in strict mode for
                        a better development experience moving forward
                    </li>
                    <li>Rebuild using Vite to streamline and reduce bloat</li>
                </ul>
            </details>
            <details>
                <summary>And a little further ahead:</summary>
                <ul>
                    <li>Have two distinct user types - Curator & User</li>
                    <li>Restructure the backend to allow multiple curators</li>
                    <li>Allow Users to log in using Spotify</li>
                    <li>
                        Allow Users to search for songs to submit using the
                        Spotify API
                    </li>
                    <li>
                        Use the Spotify API to allow Curators to add the
                        playlists they want to have on the platform
                    </li>
                    <li>
                        Implement Curator options to automatically add songs to
                        their playlists based on song rating thresholds.
                    </li>
                </ul>
            </details>
            <hr></hr>
            <p>
                Thank you so much for taking the time to check out my site. I
                hope you have a nice day!{' '}
            </p>
            <a href="https://github.com/holoflash/fullstack-mern-app">
                View code on GitHub
            </a>
        </div>
    );
};

export default HomePage;
