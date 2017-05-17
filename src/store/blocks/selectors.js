/**
 * Created by haseeb on 19/04/2017.
 */

export function getParams(state) {
    return state.blocks.params;
}


//get single block
export function getBlock(state, id) {
    return state.blocks.byId[id];
}


//get all the blocks
export function getBlocks(state) {
    return (state.blocks);
}
