import {useState} from "react";
import {useEffect} from "react";
import Movie from '../components/Movie';


function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.9&sort_by=year`
            )
        ).json();
        setMovies(json.data.movies);
        console.log(json.data.movies)
        setLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, [])
    return (
        <div>
            {loading ? (
                    <h1>Loading. . .</h1>
                ) :
                <div>
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id} // key는 React.js에서만, map안에서 컴포넌트들을 render할 때 사용한다
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            year={movie.year}
                            summary={movie.summary}
                            genres={movie.genres}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default Home;