/* eslint-disable no-case-declarations */
/**
 * Created by haseeb on 18/04/2017.
 *
 * This reducer is responsible for getting the all the blocks that come
 * throught he API side...
 * API NAME,   GET ALL BLOCKS...
 */

const defaultState = {

    all_blocks_array: '',

};


export default function allBlocksReducer(state = defaultState, action) {
    switch(action.type){
        case 'GET_ALL_BLOCK_RECEIVED':
            let all_blocks_array;// = action.data;

           // console.log(action.data)

            state.all_blocks_array = action.data;
            all_blocks_array = state.all_blocks_array;

            return {
                ...state,
                all_blocks_array
            };


        default:
            return state;

    }
}

