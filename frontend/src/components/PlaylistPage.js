import useUser from '../hooks/useUser';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistPage = ({ playlistHeader, name, playlistDescription, playlistUrl, playlistImg }) => {
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

    const addSuggestion = async () => {
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

    const deleteSuggestion = async ({ suggestion }) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.delete(`/api/playlists/${name}/suggestions/${suggestion._id}`, null, { headers, });
        setSuggestions(response.data);
    }

    return (
        <>

            <h1>{playlistHeader}</h1>
            <p>{playlistDescription}</p><br></br>
            <a href={playlistUrl}>
                <img
                    src={playlistImg}
                    alt={playlistHeader + " cover"}
                    height={500}
                /></a>
            {suggestions && <h3>Suggestions</h3>}
            <ul>
                {suggestions.map((suggestion, i) => (
                    <li key={`${suggestion.user}_${suggestion.suggestion}`}>
                        <h4>{suggestion.suggestion}</h4>
                        {/* <p>Suggested by:  {suggestion._id}</p> */}
                        <p>Rating: {suggestion.upvotes}</p>
                        {user
                            ? <div>
                                <button onClick={() => addUpvote({ suggestion })}>Upvote</button>
                                <button onClick={() => addDownvote({ suggestion })}>Downvote</button>
                                <button onClick={() => deleteSuggestion({ suggestion })}>Delete Suggestion</button>
                            </div>
                            : <button>Log in to rate</button>}
                    </li>

                ))}
            </ul>


            {user &&
                <div id="add-comment-form">
                    <h3>Add a Suggestion</h3>
                    <p>You are posting as {user.email}</p>
                    <input type="text"
                        value={suggestionText}
                        onChange={e => setCommentText(e.target.value)}
                        rows="4"
                        cols="50" />
                    <button onClick={addSuggestion}>Add Suggestion</button>
                </div>}
        </>
    );
};

export default PlaylistPage;
