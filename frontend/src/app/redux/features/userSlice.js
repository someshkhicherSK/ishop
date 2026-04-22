import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDetails: null,
    token: null,
    atLogin: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addTouser: (state, { payload }) => {
            const { user, token } = payload;
            state.userDetails = user;
            state.token = token;
            state.atLogin = new Date().toString();
            localStorage.setItem('user', JSON.stringify(state))
        },
        lsUserData: (state) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                state.userDetails = user.userDetails;
                state.token = user.token
                state.atLogin = user.atLogin
            }
        },
        signOut: (state) => {
            state.userDetails = null
            state.token = null
            state.atLogin = null
            localStorage.removeItem('user')
        }
    },
})


export const { addTouser, lsUserData,signOut } = userSlice.actions

export default userSlice.reducer