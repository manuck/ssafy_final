const LOGIN = 'user/LOGIN';
// const INSERT = 'todos/INSERT';
// const TOGGLE = 'todos/TOGGLE';

export const login = user => ({ 
    type: LOGIN,
    user 
});
// let id = 1;
// export const insert = text => ({ 
//     type: INSERT,
//     todo: {
//         id: id++,
//         text,
//         done: false
//     }
// });
// export const toggle = id => ({
//     type: TOGGLE,
//     id
// });

const initialState = {
    user: {}
};

function user(state = initialState, action) {
    console.log('user redux', state, action);
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}

export default user;