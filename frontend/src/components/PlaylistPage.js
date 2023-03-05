import useUser from '../hooks/useUser';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistPage = ({ playlistHeader, name, playlistDescription, playlistUrl }) => {
    const [suggestions, setSuggestions] = useState([]);
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
                        <button onClick={() => addUpvote({ suggestion })}></button>
                    </li>
                ))}
            </ol>
        </>
    );
};

export default PlaylistPage;
