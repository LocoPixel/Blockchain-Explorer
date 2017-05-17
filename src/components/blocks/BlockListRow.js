/**
 * Created by haseeb on 19/04/2017.
 */


import React from 'react';
import { Link } from 'react-router';
import Moment from 'react-moment';
export const BlockListRow = ({block}) => {
  return (
<tr key={block.hash}>
  <td><Link to={`blocks/${block.decNumber}`}>{block.decNumber}</Link></td>
  <td>{block.totalTransactions}</td>
  <td>{block.uncleCount}</td>
  <td>  <Moment unix fromNow>{parseInt(block.timestamp,10)}</Moment></td>
  <td><a href={`address/${block.miner}`}>{block.miner}</a></td>
  <td>{block.gasLimit}</td>
  <td>{(block.difficulty/ Math.pow(1000, 4)).toFixed(2)}GH/s</td>
  <td>{parseFloat(block.hashrate ).toFixed(2)} GH/s</td>
  <td>{parseFloat(block.blockReward)+parseFloat(block.uncleReward)+parseFloat(block.totalFee)} EXP</td>
</tr>
  )
};
