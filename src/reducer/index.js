import { combineReducers } from 'redux';
import MqttReducer from './mqttReducer';
import BlockReducer from './blocksreducer';
import loading from './loading';
import TransactionsReducer from './transationsreducer';
import allBlocksReducer from './allBlocksReducer';

import blocks from '../store/blocks/reducer';
import transactions from '../store/transactions/reducers' ;
import uncles from '../store/uncles/reducer';
import address from '../store/address/reducer';
import chartsred from '../store/charts/reducer';
import statistics from '../store/stats/reducer';




const rootReducers = combineReducers({
  loading,
  MqttReducer,
  BlockReducer,
  blocks,
  transactions,
  uncles,
  address,
  chartsred,
  statistics,
  allBlocksReducer,
  TransactionsReducer
});

export default rootReducers;
