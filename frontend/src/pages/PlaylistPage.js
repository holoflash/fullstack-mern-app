import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import SuggestionsList from '../components/SuggestionsList';
import AddSuggestionForm from '../components/AddSuggestionForm';
import useUser from '../hooks/useUser';

const PlaylistPage = ({ playlistName, playlistDescription, playlistUrl }) => {
    const [suggestionsInfo, setSuggestionsInfo] = useState({ upvotes: 0, suggestions: [], canUpvote: false });
    const { canUpvote } = suggestionsInfo;
    const { playlistId } = useParams();

    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadSuggestionsInfo = async () => {
            const token = user && (await user.getIdToken());
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/playlists/${playlistName}`, { headers });
            const newSuggestionsInfo = response.data;
            setSuggestionsInfo(newSuggestionsInfo);
        };

        if (!isLoading) {
            loadSuggestionsInfo();
        }
    }, [isLoading, user, playlistName]);

    // Replace articles with specific suggestion?
    // const suggestion = suggestions.find(suggestion => suggestion.name === suggestionId);
    const suggestion = "placeholder";

    const addUpvote = async () => {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/playlists/${playlistName}/upvote`, null, { headers });
        const updatedSuggestions = response.data;
        setSuggestionsInfo(updatedSuggestions);
    };

    if (!suggestion) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h1>{playlistName.toUpperCase()}</h1>
            <p>{playlistDescription}</p>
            <h3>Suggestions</h3>
            <div className="upvotes-section">
                {user ? (
                    <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                ) : (
                    <button>Log in to upvote</button>
                )}
                <p>This playlist has {suggestionsInfo.upvotes} upvote(s)</p>
            </div>
            <SuggestionsList suggestions={suggestionsInfo.suggestions} />
            {user ? (
                <AddSuggestionForm
                    playlistName={playlistName}
                    onSuggestionsUpdated={updatedSuggestions => setSuggestionsInfo(updatedSuggestions)}
                />
            ) : (
                <button>Log in to add a suggestion</button>
            )}
        </>
    );
};

export default PlaylistPage;
