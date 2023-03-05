import useUser from '../hooks/useUser';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistPage = ({ playlistHeader, name, playlistDescription, playlistUrl }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionText, setCommentText] = useState('');
    const [userName, setUserName] = useState('');
    const { user, isLoading } = useUser();

    useEffect(() => {
        const fetchSuggestions = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/playlists/${name}`, { headers });
            const newSuggestions = response.data;
            setSuggestions(newSuggestions);
        }

        fetchSuggestions();
    }, [isLoading, user, name]);

    const addUpvote = async ({ suggestion }) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/playlists/${name}/suggestions/${suggestion._id}/upvote`, null, { headers })
        setSuggestions(response.data);
    }

    const addDownvote = async ({ suggestion }) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/playlists/${name}/suggestions/${suggestion._id}/downvote`, null, { headers })
        setSuggestions(response.data);
    }

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/playlists/${name}/suggestions`, {
            suggestion: suggestionText,
            name: name,
        }, {
            headers,
        });
        setSuggestions(response.data);
        setUserName('');
        setCommentText('');
    }

    return (
        <>

            <h1>{playlistHeader}</h1>
            <p>{playlistDescription}</p><br></br>
            <a href={playlistUrl}>{name}</a>

            <h3>Suggestions</h3>
            <ol>
                {suggestions.map((suggestion, i) => (
                    <li key={`${suggestion.user}_${suggestion.suggestion}`}>
                        <h4>{suggestion.suggestion}</h4>
                        <p>Suggested by:  {suggestion._id}</p>
                        <p>Rating: {suggestion.upvotes}</p>
                        {user
                            ? <div>
                                <button onClick={() => addUpvote({ suggestion })}>Upvote</button>
                                <button onClick={() => addDownvote({ suggestion })}>Downvote</button>
                            </div>
                            : <button>Log in to rate</button>}
                    </li>

                ))}
            </ol>

            <div id="add-comment-form">
                <h3>Add a Suggestion</h3>
                {user && <p>You are posting as {user.email}</p>}
                <textarea
                    value={suggestionText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50" />
                <button onClick={addComment}>Add Suggestion</button>
            </div>
        </>
    );
};

export default PlaylistPage;
