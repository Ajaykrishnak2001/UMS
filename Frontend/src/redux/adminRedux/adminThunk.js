import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToastMessage } from '../../validation/Toast';
import { toast } from "react-toastify";

const url = `http://localhost:5000/admin`;

export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async ({email,password,toast},{rejectWithValue})=>{
        const Email = email.trim()
        const Password = password.trim()
        const response = await axios.post(`${url}/adminLogin`,{
            Email,Password
        })

        if(response.data.status === 'emailMismatch'){
            showToastMessage('Email not Found','error')
            return rejectWithValue('Email not found')
        }else if(response.data.status === 'passwordMismatch'){
            showToastMessage('Invalid Password','error')
            return rejectWithValue('incorrect password')
        }else{
            return response.data
        }
    }
)

export const fetchData = createAsyncThunk(
    'admin/fetchData',
    async()=>{
        const response = await axios.get(`${url}/fetchData`);
        console.log(response,"while fetching");
        return response.data
    }
)



export const editUser = createAsyncThunk(
    'admin/editUser',
    async({name,userId,is_blocked,toast})=>{
        console.log(name,userId,is_blocked,'in thunk of edit');
        const response = await axios.post(`${url}/editUser`,{name,userId,is_blocked})
        if(response.data.modifiedCount == 1){
            console.log("after response in edit th");
            console.log(name,userId,is_blocked,'in thunk of edit after response');
            return {userId,name,is_blocked}
        }else if(response.data == 'Access denied' || response.data == 'authentication_failed'){
            showToastMessage('Access Denied Please Login again', 'error')
        }
    }
)

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async({userId,toast})=>{
        console.log(userId,"userid in delete user");
        const response = await axios.post(`${url}/deleteUser`,{userId})
        console.log(response.data);
        if(response.data.deletedCount == 1){
            console.log(userId,"after delete count");
            showToastMessage('User Deleted Successfully','success')
            return userId
        }else if(response.data == "Access_denied" || response.data == "authentication_failed"){
           return showToastMessage('Access denied Please login','error')
        }
    }
)