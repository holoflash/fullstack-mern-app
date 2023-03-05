import useUser from '../hooks/useUser';

const Playlist = ({ playlistName, playlistDescription, playlistUrl }) => {
    const { user, isLoading } = useUser();

    console.log(user)
    console.log(isLoading)


    return (
        <>
            <h2>You are</h2>
            <h1>{playlistName}</h1>
            <p>{playlistDescription}</p><br></br>
            <a href={playlistUrl}>{playlistName}</a>
            <h3>Suggestions</h3>
        </>
    );
};

export default Playlist;
