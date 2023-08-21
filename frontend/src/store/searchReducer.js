export const INITIATE_SEARCH = 'search/INITIATE_SEARCH';
export const RECEIVE_SEARCH_RESULTS = 'search/RECEIVE_SEARCH_RESULTS';
export const SEARCH_ERROR = 'search/SEARCH_ERROR';

export const initiateSearch = () => ({
    type: INITIATE_SEARCH
});

export const receiveSearchResults = (results) => ({
    type: RECEIVE_SEARCH_RESULTS,
    results
});

export const searchError = (error) => ({
    type: SEARCH_ERROR,
    error
});

export const searchUsers = (query) => async (dispatch) => {
    dispatch(initiateSearch());
    
    const res = await csrfFetch(`/api/users/search?query=${query}`);
    
    if (res.ok) {
        const results = await res.json();
        dispatch(receiveSearchResults(results));
    } else {
        const errors = await res.json();
        dispatch(searchError(errors));
    }
};

const initialSearchState = {
    loading: false,
    results: [],
    error: null
};

const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case INITIATE_SEARCH:
            return { ...state, loading: true, error: null };
        case RECEIVE_SEARCH_RESULTS:
            return { ...state, loading: false, results: action.results };
        case SEARCH_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default searchReducer;
