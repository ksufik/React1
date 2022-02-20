import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animeList } from "../../store/anime/actions";
import { getAnimeFailure, getAnimeList, getAnimeLoading } from "../../store/anime/selectors";
import { apiUrl } from "../../utils/constants";


export function Anime() {
    const dispatch = useDispatch();
    const anime = useSelector(getAnimeList);
    const isLoading = useSelector(getAnimeLoading);
    const error = useSelector(getAnimeFailure);

    // const [anime, setAnime] = useState([]);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    const requestAnime = async () => {
        dispatch(animeList());

        // setLoading(true);
        // try {
        //     const response = await fetch(apiUrl)

        //     console.log(response);
        //     if (!response.ok) {
        //         throw new Error(`Request failed with status ${response.status}`);
        //     }

        //     const result = await response.json();

        //     setAnime(result.data);
        //     setError(false);
        // }

        // catch (err) {
        //     console.error(err);
        //     setError(true);
        // }
        // finally {
        //     setLoading(false);
        // }
    };

    useEffect(() => {
        requestAnime();

    }, []);
    return <>
        <h3>Anime List</h3>
        {error && <h3>{error}</h3>}
        {isLoading ? <CircularProgress /> :
            <div style={{ textAlign: 'left' }}>
                <button onClick={requestAnime}>Запрос</button>
                <ul style={{ display: 'flex', flexWrap: "wrap" }}>
                    {anime.map(item => {
                        return (
                            <li key={item.anime_id} style={{ flexGrow: 1 }} >
                                <div>{item.anime_name}</div>
                                <img style={{ width: 150 + "px" }} src={item.anime_img}></img>
                            </li>)
                    }
                    )}
                </ul>
            </div>}
    </>
}