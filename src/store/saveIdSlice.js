import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    updateId:""
}

const saveIdSlice = createSlice({
        name: "saveId",
        initialState,
        reducers:{
            getSaveId: (state,action) =>{
                state.updateId = action.payload
            }
        }
})

export const {getSaveId} = saveIdSlice.actions

export default saveIdSlice.reducer;