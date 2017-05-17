const loading = (state = false, action) => {
	switch (action.type) {
        case 'GET_BLOCK_DATA':
            return true;
        case 'GET_BLOCK_DATA_RECEIVED':
            return false;
        case 'GET_BLOCK_DATA_ERROR':
            return false;


        //transactios call on the main page
        case 'GET_TRANAPI_DATA':
            return true;
        case 'GET_TRANAPI_DATA_RECEIVED':
            return false;
        case 'GET_TRANAPI_DATA_ERROR':
            return false;


        //all blocks call
        case 'GET_ALL_BLOCK':
            return true;
        case 'GET_ALL_BLOCK_RECEIVED':
            return false;
        case 'GET_ALL_BLOCK_ERROR':
            return false;



        default:
            return state;
	}
};

export default loading;
