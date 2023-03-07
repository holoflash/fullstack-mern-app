import useUser from '../hooks/useUser';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const PlaylistPage = ({ playlistHeader, name, playlistDescription, playlistUrl, playlistImg }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionText, setSuggestionText] = useState('');
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
            user: user.email.substring(0, user.email.indexOf('@')),
        }, {
            headers,
        });
        setSuggestions(response.data);
        setUserName('');
        setSuggestionText('');
    }

    const deleteSuggestion = async ({ suggestion }) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.delete(`/api/playlists/${name}/suggestions/${suggestion._id}`, null, { headers, });
        setSuggestions(response.data);
    }

    return (
        <div className='container'>
            <h1>{playlistHeader}</h1>
            <p>{playlistDescription}</p>
            <a href={playlistUrl}
                target="_blank">
                <img
                    src={playlistImg}
                    alt={playlistHeader + " cover"}
                />
            </a>

            {suggestions.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Votes</th>
                            <th>suggestion</th>
                            <th>user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suggestions.sort((a, b) => b.upvotes - a.upvotes).map((suggestion, i) => (
                            <tr key={`${suggestion.user}_${suggestion.suggestion}`}>
                                <td> {suggestion.upvotes}</td>
                                <td className='suggestion-table' onClick={(event) => {
                                    event.currentTarget.firstChild.classList.toggle('hidden');
                                }}>
                                    <div className='action-table hidden'>
                                        {user ? (
                                            <div className='actions'>
                                                <button id="up" onClick={() => addUpvote({ suggestion })}>UPVOTE</button>
                                                <button id="down" onClick={() => addDownvote({ suggestion })}>DOWNVOTE</button>
                                                <button id="del" onClick={() => deleteSuggestion({ suggestion })}>X</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => { navigate('/login', { state: { from: location.pathname } }) }}>Log in to rate</button>
                                        )}
                                    </div>
                                    {suggestion.suggestion}
                                </td>
                                <td>{suggestion.user}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            {
                user ?
                    <div id="add-suggestion-form">
                        <h3>Suggest a song</h3>
                        <input
                            required
                            type="text"
                            placeholder='Song - Artist'
                            maxLength={50}
                            value={suggestionText}
                            onChange={e => setSuggestionText(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    addSuggestion();
                                }
                            }}
                        />
                        <div className='input-count'>{suggestionText.length} / 50</div>
                        <button onClick={addSuggestion}>Add Suggestion</button>
                        <p>You are posting as <strong>{user.email.substring(0, user.email.indexOf('@'))}</strong></p>
                    </div>

                    :
                    <div id="add-suggestion-form">
                        <button className='login-to-suggest' onClick={() => { navigate('/login', { state: { from: location.pathname } }) }}>Log in to add suggestion</button></div>
            }
        </div >
    );
};

export default PlaylistPage;
