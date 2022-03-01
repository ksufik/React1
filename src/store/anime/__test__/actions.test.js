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

describe("animeList", () => {
    it("calls fn passed as an arg with animeLoading", () => {
        const mockDispatch = jest.fn();

        animeList()(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledWith(animeLoading());
    });

    it("calls fn passed as an arg with animeSuccess if fetch was successful", async () => {
        const mockDispatch = jest.fn();
        const result = ["test"];
        // eslint-disable-next-line no-undef
        fetchMock.mockResponseOnce(JSON.stringify(result));

        await animeList()(mockDispatch);

        expect(mockDispatch).toHaveBeenLastCalledWith(animeSuccess(result));
    });

    it("calls fn passed as an arg with animeFailure if fetch was unsuccessful", async () => {
        const mockDispatch = jest.fn();
        const error = new Error("some fetch error");
        // eslint-disable-next-line no-undef
        fetchMock.mockRejectOnce(error);

        await getArticles()(mockDispatch);

        expect(mockDispatch).toHaveBeenLastCalledWith(animeFailure(error));
    });
});