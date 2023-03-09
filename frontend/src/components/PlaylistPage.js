import useUser from '../hooks/useUser';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import enterKeySubmit from '../util/enterKeySubmit'

const PlaylistPage = ({ playlistHeader, name, playlistDescription, playlistUrl, playlistImg }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionText, setSuggestionText] = useState('');
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
        const response = await axios.put(`/api/playlists/${name}/suggestions/${suggestion._id}/upvote`, {
            user: user
        }, { headers })
        setSuggestions(response.data);
    }

    const addDownvote = async ({ suggestion }) => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/playlists/${name}/suggestions/${suggestion._id}/downvote`, {
            user: user
        }, { headers })
        setSuggestions(response.data);
    }

    const addSuggestion = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`/api/playlists/${name}/suggestions`, {
            suggestion: suggestionText,
            user: user
        }, {
            headers,
        });
        setSuggestions(response.data);
        setSuggestionText('');
    }

    const deleteSuggestion = async ({ suggestion }) => {
        if (!window.confirm("Are you sure you want to delete this suggestion? This can't not be undone.")) return
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
                target="_blank"
                rel="noreferrer">

                <img
                    src={playlistImg}
                    alt={playlistHeader + " artwork"}
                    loading="lazy"
                />
            </a>

            {suggestions.length !== 0 &&
                <table className='suggestions-container'>
                    <thead>
                        <tr>
                            <th className='th'>Rating</th>
                            <th className='th'>suggestion</th>
                            <th className='th'>user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suggestions.sort((a, b) => b.upvotes - a.upvotes).map((suggestion, i) => (
                            <tr key={`${suggestion.postedBy}_${suggestion.suggestion}`}>
                                <td className='td'> {suggestion.upvotes}</td>
                                <td className='suggestion-table' onClick={(event) => {
                                    event.currentTarget.firstChild.classList.toggle('hidden');
                                }}>
                                    <div className='action-table hidden'>
                                        {user ? (
                                            <div className='actions'>
                                                {suggestion.upvotedBy.includes(user.email) || suggestion.downvotedBy.includes(user.email)
                                                    ? <button className='rated'>Rated</button>
                                                    : (<>
                                                        <button id="up" onClick={() => addUpvote({ suggestion })}>+1</button>
                                                        <button id="down" onClick={() => addDownvote({ suggestion })}>-1</button>
                                                    </>)}
                                                {user.email === suggestion.postedBy && (<button id="del" onClick={() => deleteSuggestion({ suggestion })}>del</button>)}
                                            </div>)
                                            : (<button className="button" onClick={() => { navigate('/login', { state: { from: location.pathname } }) }}>Log in to rate</button>
                                            )}
                                    </div>
                                    {suggestion.suggestion}
                                </td>
                                <td className='td'>{suggestion.postedBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            {
                user ?
                    <div id="add-suggestion-form">
                        <h3>Suggest a song</h3>
                        <div className='input-count'>{suggestionText.length} / 50</div>
                        <input
                            required
                            type="text"
                            placeholder='Song - Artist'
                            maxLength={50}
                            value={suggestionText}
                            onChange={e => setSuggestionText(e.target.value)}
                            onKeyDown={e => enterKeySubmit(e, addSuggestion)}
                        />
                        <button className='add-suggestion' onClick={addSuggestion}>Add Suggestion</button>
                        {user && <p>You are posting as <strong>{user.email}</strong></p>}
                    </div>

                    :
                    <div id="add-suggestion-form">
                        <button className='login-to-suggest' onClick={() => { navigate('/login', { state: { from: location.pathname } }) }}>Log in to add suggestion</button></div>
            }
        </div >
    );
};

export default PlaylistPage;
