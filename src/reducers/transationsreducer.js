const defaultState = {

    transdets: [],

    snackbar: {
        state: false,
        message: ''
    }
};


export default function transactionsred(state = defaultState, action) {
   switch(action.type){
     // eslint-disable-next-line
    case 'GET_TRANAPI_DATA_RECEIVED':

     //console.log(action.data);
      let transdets;// = action.data;
      state.transdets = action.data;
      transdets = state.transdets;
        return {
            ...state,
            transdets
        };


     default:
       return state;

   }
}
