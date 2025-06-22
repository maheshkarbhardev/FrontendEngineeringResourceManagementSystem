import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';


export const fetchProjects=createAsyncThunk('projects/fetch',async()=>{
    const res=await axiosInstance.get('/projects');
    return res.data;
});

export const createProject=createAsyncThunk('projects/create',async(data)=>{
    const res=await axiosInstance.post('/projects',data);
    return res.data;
});

export const updateProject=createAsyncThunk('projects/update',async({id,data})=>{
    const res=await axiosInstance.put(`/projects/${id}`,data);
    return res.data;
});

export const deleteProject=createAsyncThunk('projects/delete',async(id)=>{
    await axiosInstance.delete(`/projects/${id}`);
    return id;
});



const projectSlice=createSlice({
    name:'projects',
    initialState:{
        items:[],
        status:'idle',
        error:null
    },
    reducers:{},

    extraReducers:(builder)=>{
        builder
        .addCase(fetchProjects.fulfilled,(state,action)=>{
            state.items=action.payload;
        })
        .addCase(createProject.fulfilled,(state,action)=>{
            state.items.push(action.payload);
        })
        .addCase(updateProject.fulfilled,(state,action)=>{
            const index = state.items.findIndex((p) => p.id === action.payload.id);
            state.items[index] = action.payload;
        })
        .addCase(deleteProject.fulfilled,(state,action)=>{
            state.items = state.items.filter((p) => p.id !== action.payload);
        })
    }
});

export default projectSlice.reducer;

