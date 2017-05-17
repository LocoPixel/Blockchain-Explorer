/**
 * Created by haseeb on 19/04/2017.
 */

import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';


//getting a single block form the api..
export function fetchBlock(payload) {
    return {type: actionTypes.FETCH_BLOCK, payload};
}

export function fetchBlockSuccess(payload) {
    const byId = {[payload.decNumber]: payload};
    return {type: actionTypes.FETCH_BLOCK_SUCCESS, payload: {byId}};
}


//getting all the blocks from the api.
export function fetchBlocks(payload) {
    return {type: actionTypes.FETCH_BLOCKS_COLLECTION, payload};
}

export function fetchBlocksSuccess(blockRecord, params) {

    return {type: actionTypes.FETCH_BLOCKS_COLLECTION_SUCCESS, payload: {blockRecord, params}};
}


//getting all the blocks from the api.
export function fetchLatestBlocks(payload) {
  return {type: actionTypes.FETCH_LATEST_BLOCKS_COLLECTION, payload};
}

export function fetchLatestBlocksSuccess(blockRecord, params) {

  return {type: actionTypes.FETCH_LATEST_BLOCKS_COLLECTION_SUCCESS, payload: {blockRecord, params}};
}


export function showAlert(){
  alert("I was called that okay");
}
