import { useState } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

const AddSuggestionForm = ({ suggestionName, onSuggestionUpdated }) => {
    const [name, setName] = useState('');
    const [suggestionText, setSuggestionText] = useState('');
    const { user } = useUser();

    const addSuggestion = async () => {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(
            `/api/suggestions/${suggestionName}/suggestions`,
            {
                postedBy: name,
                text: suggestionText,
            },
            {
                headers,
            }
        );
        const updatedSuggestion = response.data;
        onSuggestionUpdated(updatedSuggestion);
        setName('');
        setSuggestionText('');
    };

    return (
        <div id="add-suggestion-form">
            <h3>Add a Suggestion</h3>
            {user && <p>You are posting as {user.email}</p>}
            <textarea
                value={suggestionText}
                onChange={(e) => setSuggestionText(e.target.value)}
                rows="4"
                cols="50"
            />
            <button onClick={addSuggestion}>Add Suggestion</button>
        </div>
    );
};

export default AddSuggestionForm;
