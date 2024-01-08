import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    programList: {}
}

const programListSlice = createSlice({
    name: 'program',
    initialState,
    reducers:{
        getProgramList: (state,action) =>{
            state.programList = action.payload.documents
            localStorage.setItem('programList', JSON.stringify(action.payload));
        },
    }
})

export const {getProgramList} = programListSlice.actions

export default programListSlice.reducer