import {combineReducers} from 'redux';
import games from '../reducers/gamesReducer';
import blocks from '../reducers/blocksReducer';


export default combineReducers({
    games,blocks
});