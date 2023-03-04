import { useEffect, useState } from 'react'
import axios from 'axios';


const Popwave = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const response = await axios.get('/api/playlists/popwave');
            setSuggestions(response.data);
        }
        fetchSuggestions();
    }, []);

    return (
        <>
            <h1>popwave</h1>
            <p>Melancholy nostalgia and 80s inspired pop, retrowave, indie rock, synthwave, synthpop, hopebeat. LANY, The Midnight, The 1975, Nightly, MUNA, The Bad Dreamers, Ethel Cain --you get the idea. Carefully curated and updated regularly.</p>
            <ul>
                {suggestions.map((suggestion, i) => (
                    <li key={suggestion.suggestion}>
                        <strong>{suggestion.suggestion}</strong> - {suggestion.user} ({suggestion.upvotes} upvotes)
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Popwave
