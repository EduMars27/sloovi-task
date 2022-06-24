import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name:"tasks",
    initialState: { 
        taskList: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getTaskStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.taskList = action.payload;
        },
        getTaskFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteTaskStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.taskList.splice(
            state.taskList.findIndex((item) => item._id === action.payload),
            1
            );
        },
        deleteTaskFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateTaskStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.taskList[
            state.taskList.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.task;
        },
        updateTaskFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        addTaskStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addTaskSuccess: (state, action) => {
            state.isFetching = false;
            state.taskList.push(action.payload);
        },
        addTaskFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})


export const { 
    getTaskStart,
    getTaskSuccess,
    getTaskFailure,
    deleteTaskStart,
    deleteTaskSuccess,
    deleteTaskFailure,
    updateTaskStart,
    updateTaskSuccess,
    updateTaskFailure,
    addTaskStart,
    addTaskSuccess,
    addTaskFailure,
 } = taskSlice.actions;

export default taskSlice.reducer;




