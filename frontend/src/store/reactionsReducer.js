// CONSTANTS

import csrfFetch from "./csrf"
import { RECEIVE_POST } from "./postsReducer"

export const RECEIVE_REACTIONS = 'reactions/RECEIVE_REACTIONS'
export const RECEIVE_REACTION = 'reactions/RECEIVE_REACTION'
export const REMOVE_REACTION = 'reactions/REMOVE_REACTION'
export const RECEIVE_REACTION_ERRORS = 'reactions/RECEIVE_REACTION_ERRORS'

// ACTION CREATORS

export const receiveReactions = (reactions) => ({ 
    type: RECEIVE_REACTIONS, 
    reactions 
})

export const receiveReaction = (reaction) => ({ 
    type: RECEIVE_REACTION, 
    reaction 
})

export const removeReaction = (reactionId) => ({ 
    type: REMOVE_REACTION, 
    reactionId 
})

export const receiveReactionErrors = (errors) => ({ 
    type: RECEIVE_REACTION_ERRORS, 
    errors 
})


// SELECTORS

export const getReactions = (reactable, type) => (state) => {
    const reactionArray = Object.values(state.reactions);

    const res = reactionArray.find( 
        reaction => reaction.reactableType === type && 
        reaction.reactableId === reactable.id
    );

    return res ? res : null;
};      

// THUNK ACTION CREATORS

export const fetchReactionsByReactableId = (reactableType, reactableId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reactions?reactableType=${reactableType}&reactableId=${reactableId}`);

    if (res.ok) {
        const reactions = await res.json();
        dispatch(receiveReactions(reactions));
    } else {
        const errors = await res.json();
        dispatch(receiveReactionErrors(errors));
    }
}

export const fetchUserReactions = (userId) => async (dispatch) => {
    if (!userId) return;

    const res = await csrfFetch(`/api/reactions?reactorId=${userId}`);

    if (res.ok) {
        const reactions = await res.json();
        dispatch(receiveReactions(reactions));
    } else {
        const errors = await res.json();
        dispatch(receiveReactionErrors(errors));
    }
}

export const createReaction = (reaction) => async (dispatch) => {
    const res = await csrfFetch(`/api/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reaction)
    })

    if (res.ok) {
        const newReaction = await res.json();
        dispatch(receiveReaction(newReaction));
    } else {
        const errors = await res.json();
        dispatch(receiveReactionErrors(errors));
    }
}

export const updateReaction = (reaction) => async (dispatch) => {
    const res = await csrfFetch(`/api/reactions/${reaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reaction)
    })

    if (res.ok) {
        const updatedReaction = await res.json();
        dispatch(receiveReaction(updatedReaction));
    } else {
        const errors = await res.json();
        dispatch(receiveReactionErrors(errors));
    }
}

export const deleteReaction = (reactionId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reactions/${reactionId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeReaction(reactionId));
    } else {
        const errors = await res.json();
        dispatch(receiveReactionErrors(errors));
    }
}

// REDUCER

const reactionsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_REACTIONS:
            return { ...state, ...action.reactions };
        case RECEIVE_REACTION:
            return { ...state, [action.reaction.id]: action.reaction };
        case REMOVE_REACTION:
            delete nextState[action.reactionId];
            return nextState;
        case RECEIVE_POST:
            return { ...state, ...action.post.reactions };
        default:
            return state;
    }
}

export default reactionsReducer;