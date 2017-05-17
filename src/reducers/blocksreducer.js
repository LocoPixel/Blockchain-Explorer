/* eslint-disable no-case-declarations */
const defaultState = {

    blocks: [],
    blockDataAPI: [],
    finaData: [],

    snackbar: {
        state: false,
        message: ''
    }
};


export default function blocksreduce(state = defaultState, action) {
   switch(action.type){
     case 'GET_BLOCK_DATA_RECEIVED':
      let blocks;// = action.data;
      state.blocks = action.data;
      blocks = state.blocks;
        // blocks = blocks.reverse()
        return {
            ...state,
            blocks
        };


     default:
       return state;

   }
}
