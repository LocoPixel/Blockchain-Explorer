import querystring from 'querystring';
import * as myConstClass from '../const/apiconsts'

export const SET_BLOCKS = 'SET_BLOCKS';
export const ADD_BLOCK = 'ADD_BLOCK';
export const BLOCK_FETCHED = 'BLOCK_FETCHED';
export const BLOCK_UPDATED = 'BLOCK_UPDATED';
export const BLOCK_DELETED = 'BLOCK_DELETED';

export function setBlocks(blocks){
    return{
        type:SET_BLOCKS,
        blocks
    }
}

 function handleResponse(response){
    if(response.ok){
        return response.json();
    } else{
        let error = new Error(response.statusText);
        error.response =response;
        throw error;
    }
}
export function addBlock(block){
    return{
        type:ADD_BLOCK,
        block
    }
};

export function blockFetched(block){
    return{
        type:BLOCK_FETCHED,
        block
    }
}

export function blockUpdated(block){
    return{
        type:BLOCK_UPDATED,
        block
    }
}
export function blockDeleted(blockId){
    return{
        type:BLOCK_DELETED,
        blockId
    }
}

export function saveBlock(data){
    return dispatch=>{
        return fetch(myConstClass.baseURL+`blocks?${querystring.stringify(0)}`,{
            method:'post',
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
        .then(data=>dispatch(addBlock(data.block)));
    }
};
export function updateBlock(data) {
  return dispatch => {
    return fetch(`/api/blocks/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(blockUpdated(data.block)));
  }
}
export function deleteBlock(id) {
  return dispatch => {
    return fetch(`/api/blocks/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(blockDeleted(id)));
  }
}
export function fetchBlocks() {
    return dispatch => {
        fetch(myConstClass.baseURL+`blocks?${querystring.stringify(1)}`)
        .then(res=>res.json())
        .then(data => dispatch(setBlocks(data.blocks)));
    }
};
export function fetchBlock(id) {
    return dispatch => {
        fetch(`/api/blocks/${id}`)
        .then(res=>res.json())
        .then(data => dispatch(blockFetched(data.block)));
    }
};