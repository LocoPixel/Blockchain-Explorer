/**
 * Created by haseeb on 19/04/2017.
 */


import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
    byId: {},
    params: {},
    blocks: [],
    currentPage: 1,
    lastpage: 0,
    acitons: ''
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BLOCK_SUCCESS:
          return state.merge({
            params: action.payload.params || {},
            byId: action.payload.byId || {}
          });

        case actionTypes.FETCH_BLOCKS_COLLECTION_SUCCESS:
            return state.merge({
                params: action.payload.params || {},
                blocks: action.payload.blockRecord.blocks || {},
                lastpage: action.payload.blockRecord.total_record/50 || {}
            });


      case actionTypes.FETCH_LATEST_BLOCKS_COLLECTION_SUCCESS:
        return state.merge({
          params: action.payload.params || {},
          blocks: action.payload.blockRecord || {},
          actions: action || {}
        });
       default:
            return state;
    }
};
