import PlaylistPage from '../components/PlaylistPage.js';
import SoundtrackImg from '../assets/soundtrack.png';

const SoundtrackAor = () => {
    return (
        <PlaylistPage
            playlistHeader="SOUNDTRACK AOR"
            name="soundtrack-aor"
            playlistDescription="Pretend you're in an 80s action movie training montage with this playlist of AOR melodic rock classics and new bands that embody the spirit of the genre. Featuring music from Top Gun, Rocky, Transformers, Cobra Kai, Kickboxer, Staying Alive , The Lost Boys, Footloose, Karate Kid, Scarface, and more."
            playlistUrl="https://open.spotify.com/playlist/2Glt3GKCD3RMEyZkrsQ0A5?si=5b711b3b1eac413d"
            playlistImg={SoundtrackImg}
        />
    );
};

export default SoundtrackAor;
