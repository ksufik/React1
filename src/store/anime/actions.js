import { apiUrl } from "../../utils/constants";

export const REQUEST_ANIME_LOADING = "ANIME_REQUEST_LOADING";
export const REQUEST_ANIME_SUCCESS = "ANIME_REQUEST_SUCCESS";
export const REQUEST_ANIME_FAILURE = "ANIME_REQUEST_FAILURE";

export const animeLoading = () => ({
    type: REQUEST_ANIME_LOADING
});

export const animeSuccess = (animeList) => ({
    type: REQUEST_ANIME_SUCCESS,
    animeList
});

export const animeFailure = (err) => ({
    type: REQUEST_ANIME_FAILURE,
    // err
});


export const animeList = () => async (dispatch) => {
    dispatch(animeLoading());
    try {
        const response = await fetch(apiUrl)
        console.log(response);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();

        dispatch(animeSuccess(result.data));

    }
    //если мы сами определяем тип ошибки или текст
    // catch (err) {
    //     console.error(err);
    //     dispatch(getAnimeFailure(err.message));
    // }

    catch {
        dispatch(animeFailure());
    }
};