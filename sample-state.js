{
    entities: {
        posts: {
            1: {
                id: 1,
                body: "Sometimes, the best therapy is a long drive, good music, and some deep thinking. Who else agrees?",
                authorId: 1,
            },
            2: {
                id: 2,
                body: "Currently brewing my third cup of coffee today and wondering: Is it Monday's fault or am I just turning into a coffee addict?",
                authorId: 2,
            }, 
            3: {
                id: 3,
                body: "Just finished reading a book that completely changed my perspective on life.",
                authorId: 3,
            }
        },
        users: {
            1: {
                id: 1,
                name: "Wardell Stephen Curry",
                phone: null,
                email: "hardenhater@warriors.com",
            },
            2: {
                id: 2,
                name: "Novak Djokovic",
                phone: "+381 11 069 929432",
                email: "23ismorethan22@rogerfederer.com"
            },
            3: {
                id: 3,
                name: "Justin Trudeau",
                phone: "416-555-1473",
                email: null
            }
        },
        comments: {
            1: {
                id: 1,
                commenterId: 2,
                body: "That sounds wonderful! What was the name of the book?",
                postId: 3,
                parentCommentId: null,
            },
            2: {
                id: 2,
                commenterId: 3,
                body: "The 1st edition of 'Vaccinology: Principles and Practice' by John Morrow."
                postId: 3,
                parentCommentId: 1,
            },
            3: {
                id: 3,
                commenterId: 1,
                body: "This is why I prefer green tea.",
                postId: 2,
                parentCommentId: null
            }
        }, 
        reactions: {
            1: {
                id: 1,
                reactionType: "thumbsUp",
                reactorId: 2,
                reactedId: 1,
                reactedType: "post",
            },
            2: {
                id: 2,
                reactionType: "cry",
                reactorId: 2,
                reactedId: 2,
                reactedType: "comment",
            },
            3: {
                id: 3,
                reactionType: "heart",
                reactorId: 1,
                reactedId: 2,
                reactedType: "post"
            }
        },
        friends: {
            1: {
                id: 1,
                userId: 1,
                friendId: 2,
            },
            2: {
                id: 2,
                userId: 2,
                friendId: 1,
            },
            3: {
                id: 3,
                userId: 2,
                friendId: 3,
            },
            4: {
                id: 4,
                userId: 3,
                friendId: 2,
            }   
        },
    },
    ui: {
        loading: true/false
    },
    errors: {
        login: ["Incorrect username/password combination"],
        postForm: ["Post body cannot be blank"],
    },
    session: { currentUserId: 2 }
}