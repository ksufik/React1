import { animeLoading, animeSuccess, animeFailure, animeList } from '../actions'
import { } from '../reducer'

describe("animeStatus tests", () => {
    it("animeSuccess", () => {
        const payload = [];
        const expected = {
            type: REQUEST_ANIME_SUCCESS,
            animeList,
        };

        const received = animeSuccess(payload);
        expect(expected).toEqual(received);
    });
});


it("animeLoading", () => {
    const payload = [];
    const expected = {
        type: REQUEST_ANIME_LOADING
    };

    const received = animeLoading(payload);
    expect(expected).toEqual(received);
});


it("animeFailure", () => {
    const payload = [];
    const expected = {
        type: REQUEST_ANIME_FAILURE,
    };

    const received = animeFailure(payload);
    expect(expected).toEqual(received);
});
