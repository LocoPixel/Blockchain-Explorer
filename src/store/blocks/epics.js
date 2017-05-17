/**
 * Created by haseeb on 19/04/2017.
 */


import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import * as actionTypes from './actionTypes';
import * as postsActions from './actionCreators';
import * as myConstClass from '../../const/apiconsts'



//we get only on block from this method.
export function fetchBlock(action$) {
    return action$.ofType(actionTypes.FETCH_BLOCK)
        .map(action => action.payload)
        .switchMap(id => {
          let url =  myConstClass.baseURL+'block/'+id.id;
            return Observable.fromPromise(
                axios.get(url)
            ).map(res => postsActions.fetchBlockSuccess(res.data));
        });
}


// we get all the blocks form this method
export function fetchBlocks(action$) {
    return action$.ofType(actionTypes.FETCH_BLOCKS_COLLECTION)
        .map(action => action.payload)
        .switchMap(params => {
            return Observable.fromPromise(
                axios.get( myConstClass.baseURL+`blocks?${querystring.stringify(params)}`)
            ).map(res => postsActions.fetchBlocksSuccess(res.data, params));
        });
}


// we get all the latest blocks form this method
export function fetchLatestBlocks(action$) {
  return action$.ofType(actionTypes.FETCH_LATEST_BLOCKS_COLLECTION)
    .map(action => action.payload)
    .switchMap(params => {
      return Observable.fromPromise(
        axios.get( myConstClass.baseURL+`block/latest?${querystring.stringify(params)}`)
      ).map(res => postsActions.fetchLatestBlocksSuccess(res.data, params));
    });
}

