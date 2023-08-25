import { receiveComment } from "./commentsReducer"
import csrfFetch from "./csrf"
import { receivePost } from "./postsReducer"

// CONSTANTS

export const RECEIVE_REACTIONS = 'reactions/RECEIVE_REACTIONS'
export const RECEIVE_REACTION_ERRORS = 'reactions/RECEIVE_REACTION_ERRORS'

// ACTION CREATORS

export const receiveReactions = (reactions) => ({ 
    type: RECEIVE_REACTIONS, 
    reactions 
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

export const getReaction = (reactableType, reactableId, reactorId) => (state) => {
    const reactionArray = Object.values(state.reactions);

    const foundReaction = reactionArray.find(
        reaction => reaction.reactableType === reactableType &&
                    reaction.reactableId === reactableId &&
                    reaction.reactorId === reactorId
    );

    return foundReaction ? foundReaction : null;
};

export const getReactionCounts = (reactableId, reactableType) => (state) => {
    const reactions = state.reactions[`${reactableType}_${reactableId}`];
    if (!reactions) return {};

    const counts = {};

    for (const reaction of reactions) {
        const type = reaction.type;
        counts[type] = (counts[type] || 0) + 1;
    }

    return counts;
};


// THUNK ACTION CREATORS

export const fetchReactionsByReactable = (reactableType, reactableId) => async (dispatch) => {
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
        const reactable = await res.json();
        console.log(reactable)
        if (reactable.reactableType === 'Post') dispatch(receivePost(reactable));
        if (reactable.reactableType === 'Comment') dispatch(receiveComment(reactable));
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
        const reactable = await res.json();
        if (reactable.reactableType === 'Post') dispatch(receivePost(reactable));
        if (reactable.reactableType === 'Comment') dispatch(receiveComment(reactable));
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
        const reactable = await res.json();
        if (reactable.reactableType === 'Post') dispatch(receivePost(reactable));
        if (reactable.reactableType === 'Comment') dispatch(receiveComment(reactable));
    } else {
        const errors = await res.json();
        dispatch(receiveReactionErrors(errors));
    }
}