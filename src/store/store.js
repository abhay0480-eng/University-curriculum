import { configureStore } from "@reduxjs/toolkit";
import programListSlice from "./programListSlice";
import loaderSlice from './loader'
import saveIdSlice from "./saveIdSlice";



const store = configureStore({
    reducer:{
        program: programListSlice,
        loader:loaderSlice,
        saveId: saveIdSlice

    }
})

export default store