import PlaylistPage from "./PlaylistPage";
import PopwaveImg from "../assets/popwave.jpg"

const Popwave = () => {
    return (
        <PlaylistPage
            playlistHeader="popwave"
            name="popwave"
            playlistDescription="Melancholy nostalgia and 80s inspired pop, retrowave, indie rock, synthwave, synthpop, hopebeat. LANY, The Midnight, The 1975, Nightly, MUNA, The Bad Dreamers, Ethel Cain --you get the idea :) Carefully curated and updated regularly."
            playlistUrl="https://open.spotify.com/playlist/36RgZqbsRLfoNmbl3pF8IU?si=2660cad79814471f"
            playlistImg={PopwaveImg} />
    );
}

export default Popwave
