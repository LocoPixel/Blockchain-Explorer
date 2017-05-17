import {combineReducers} from 'redux';
import games from '../reducers/gamesReducer';

import allBlocksReducer from '../reducers/allBlocksReducer';
import blocks from './blocks/reducer';
import BlockReducer from '../reducer/blocksreducer';

export default combineReducers({
    games,allBlocksReducer,blocks,BlockReducer
});