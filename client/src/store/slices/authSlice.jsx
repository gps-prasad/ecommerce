import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    user: null,
    token: "",
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth: (state,action)=>{
            state.user = action.payload[0]
            state.token = action.payload[1]
        }
    }
})

export const authDetails = (state)=>state.auth
export const {setAuth} = authSlice.actions;

export default authSlice.reducer