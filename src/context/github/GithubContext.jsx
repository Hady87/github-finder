//import { useEffect, useState } from "react";
import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()
const GITHUB_URL= process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN= process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({ children }) => {
const initialState={
users:[],
loiding:false,
repos:[],
user:{},
}
const [state,dispatch] = useReducer(githubReducer,initialState)

// Get search users
const searchUsers = async (text) => {
  Setloiding()
  const params =new URLSearchParams({
    q:text
  })
  
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const {items} = await response.json();
    dispatch({
      type:"GET_USERS",
      payload:items,
    })
  };
  // Get a single user
const getUser = async (login) => {
  Setloiding()
  
  
    const response = await fetch(`${GITHUB_URL}/user${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if(response.status===404){
      window.Location='/notfound'
    } 
    else{
const data = await response.json();
    dispatch({
      type:"GET_USER",
      payload:data,
    })
    }
    
  };
  // Get user repos
  const getUserRepos = async (login) => {
  Setloiding()
  const params =new URLSearchParams({
    sort:'created',
    per_page:10,
  })
  
  
    const response = await fetch(`${GITHUB_URL}/users?${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    dispatch({
      type:"GET_REPOS",
      payload:data,
    })
  };
  //clear users
  const clearUsers=()=>{
 
   dispatch({type:'CLEAR_USERS'})
 
  }
 // Set loiding
 const Setloiding=()=>{
   dispatch({type:'SET_LOADING'})
 }
  return (
    <GithubContext.Provider
      value={{
        users:state.users,
        loiding:state.loiding,
        user:state.user,
        repos:state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext

