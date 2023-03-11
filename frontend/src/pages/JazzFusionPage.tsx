import PlaylistPage from '../components/PlaylistPage.js';
import JazzImg from '../assets/jazz.png';

const JazzFusion = () => {
    return (
        <PlaylistPage
            playlistHeader="80s & 90s Jazz Fusion/Smooth Jazz"
            name="jazz-fusion"
            playlistDescription="A carefully curated collection of only the finest instrumental jazz fusion, smooth-jazz and city-pop from the 1980s and early 1990s. Mostly uptempo and  sax fronted. Huge weather channel vibes. Most released on GRP Records. Still no Chick Corea Elektric band on Spotify :("
            playlistUrl="https://open.spotify.com/playlist/3tPau0NN4KonI4xXnwEyuo?si=789e7ea76a7f42a9"
            playlistImg={JazzImg}
        />
    );
};

export default JazzFusion;
