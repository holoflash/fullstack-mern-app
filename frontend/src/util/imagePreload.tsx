import jazz from '../assets/jazz.png';
import soundtrack from '../assets/popwave.png';
import popwave from '../assets/soundtrack.png';
import notfound from '../assets/notfound.png';

const imagePreload = () => {
    const arraySrcs: string[] = [jazz, soundtrack, popwave, notfound];
    return (
        <>
            {arraySrcs.map((src) => (
                <img
                    alt={src}
                    key={src + 1}
                    src={src}
                    style={{ display: 'none' }}
                />
            ))}
        </>
    );
};

export default imagePreload;
