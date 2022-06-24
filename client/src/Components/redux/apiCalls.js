import {
    getTaskFailure,
    getTaskStart,
    getTaskSuccess,
    deleteTaskFailure,
    deleteTaskStart,
    deleteTaskSuccess,
    updateTaskFailure,
    updateTaskStart,
    updateTaskSuccess,
    addTaskFailure,
    addTaskStart,
    addTaskSuccess,
} from "./taskSlice";

import axios from 'axios'


export const getTasks = async (dispatch) => {
    dispatch(getTaskStart());
    try {
        const res = await axios.get("/api");
        dispatch(getTaskSuccess(res.data));
    } catch (err) {
        dispatch(getTaskFailure());
    }
};

export const deleteTask = async (id, dispatch) => {
    dispatch(deleteTaskStart());
    try {
        const res = await axios.delete(`/api/task-delete/${id}`);
        res && dispatch(deleteTaskSuccess(id));
    } catch (err) {
        dispatch(deleteTaskFailure());
    }
};

export const updateTask = async (id, task, dispatch) => {
    dispatch(updateTaskStart());
    try {
        const res = await axios.put(`/api/update/${id}`, task);
        res && dispatch(updateTaskSuccess({ id, task }));
    } catch (err) {
        dispatch(updateTaskFailure());
    }
};
export const addTask = async (task, dispatch) => {
    dispatch(addTaskStart());
    try {
        const res = await axios.post(`/api`, task);
        dispatch(addTaskSuccess(res.data));
    } catch (err) {
        dispatch(addTaskFailure());
    }
};