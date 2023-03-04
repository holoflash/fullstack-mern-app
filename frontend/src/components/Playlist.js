import { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';
import AddSuggestionForm from './AddSuggestionForm';

const Playlist = ({ playlistName, playlistDescription, playlistUrl }) => {
    const [suggestions, setSuggestions] = useState([]);
    const { canUpvote } = suggestions;
    const { user, isLoading } = useUser();

    useEffect(() => {
        const fetchSuggestions = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/playlists/${playlistName}`, { headers });
            const newSuggestions = response.data;
            setSuggestions(newSuggestions);
        }
        if (!isLoading) {
            fetchSuggestions();
        }
    }, [isLoading, user]);



    const addUpvote = async (suggestion) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/playlists/${playlistName}/suggestions/${suggestion._id}/upvote`, null, { headers });
        console.log(response.data)
    }

    return (
        <>
            <h1>{playlistName}</h1>
            <p>{playlistDescription}</p>
            <a href={playlistUrl}>{playlistName}</a>
            <h3>suggestions</h3>
            <ul>
                {suggestions.map((suggestion, i) => (
                    <li key={suggestion.suggestion}>
                        <strong>{suggestion.suggestion}</strong> -{suggestion._id} {suggestion.user} ({suggestion.upvotes} upvotes)
                        {user
                            ? <button onClick={() => addUpvote(suggestion)}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                            : <button>Log in to upvote</button>}
                    </li>
                ))}
            </ul>
            <AddSuggestionForm playlistName={playlistName} />
        </>
    );
}

export default Playlist;
