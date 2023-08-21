import csrfFetch from "./csrf";

export const INITIATE_SEARCH = 'search/INITIATE_SEARCH';
export const RECEIVE_SEARCH_RESULTS = 'search/RECEIVE_SEARCH_RESULTS';
export const RECEIVE_SEARCH_ERRORS = 'search/RECEIVE_SEARCH_ERRORS';

export const initiateSearch = () => ({
    type: INITIATE_SEARCH
});

export const receiveSearchResults = (results) => ({
    type: RECEIVE_SEARCH_RESULTS,
    results
});

export const receiveSearchErrors = (errors) => ({
    type: RECEIVE_SEARCH_ERRORS,
    errors
});

export const searchUsers = (query) => async (dispatch) => {
    dispatch(initiateSearch());
    
    const res = await csrfFetch(`/api/users/search?query=${query}`);
    
    if (res.ok) {
        const results = await res.json();
        dispatch(receiveSearchResults(results));
    } else {
        const errors = await res.json();
        dispatch(receiveSearchErrors(errors));
    }
};

const initialSearchState = {
    loading: false,
    results: [],
};

const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case INITIATE_SEARCH:
            return { ...state, loading: true, error: null };
        case RECEIVE_SEARCH_RESULTS:
            return { ...state, loading: false, results: action.results };
        default:
            return state;
    }
};

export default searchReducer;
