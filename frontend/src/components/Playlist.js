import { useState, useEffect } from 'react';
import axios from 'axios';
import AddSuggestionForm from './AddSuggestionForm';

const Playlist = ({ playlistName, playlistDescription, playlistUrl }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const response = await axios.get(`/api/playlists/${playlistName}`);
            setSuggestions(response.data);
        }
        fetchSuggestions();
    }, []);

    return (
        <>
            <h1>{playlistName}</h1>
            <p>{playlistDescription}</p>
            <a href={playlistUrl}>{playlistName}</a>
            <h3>suggestions</h3>
            <ul>
                {suggestions.map((suggestion, i) => (
                    <li key={suggestion.suggestion}>
                        <strong>{suggestion.suggestion}</strong> - {suggestion.user} ({suggestion.upvotes} upvotes)
                    </li>
                ))}
            </ul>
            <AddSuggestionForm />
        </>
    );
}

export default Playlist;
