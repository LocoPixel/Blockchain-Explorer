import {SET_BLOCKS, ADD_BLOCK,BLOCK_FETCHED,BLOCK_UPDATED,BLOCK_DELETED} from '../actions/blockActions'
export default function blocks(state = [], action = {}) {
    switch (action.type) {
        case ADD_BLOCK:
            return [
                ...state,
                action.block
            ];
            case BLOCK_DELETED:
            return state.filter(item=>item._id!==action.blockId);
            case BLOCK_UPDATED:
            return state.map(item=>{
                if(item.id===action.block._id) return action.block;
                return item;
            });

            case BLOCK_FETCHED:
            const index =state.findIndex(item=>item._id===action.block._id);
            if(index>-1){
                return state.map(item=>{
                    if(item._id===action.block._id) return action.block;
                    return item;
                });
            }else{
                return[
                    ...state,
                    action.block
                ];
            }

        case SET_BLOCKS:
            return action.blocks;

        default:
            return state;
    }
}