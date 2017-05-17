/**
 * Created by haseeb on 19/04/2017.
 */


import React from 'react';
import { BlockListRow } from './BlockListRow';
import { BlocksPagination } from  './BlocksPagination';
export const BlockList = ({blocks, onNavigate , currentpage, maxpage}) => {

  return (
    <div>

      <BlocksPagination currentpage = {currentpage} maxpage = {maxpage} onNavigate = {onNavigate}/>
      <table className="ui celled table">
        <thead>
        <tr>
          <th>Block Number</th>
          <th>TXN</th>
          <th>Uncle</th>
          <th>Age</th>
          <th>Miner</th>
          <th>Gas Limit</th>
          <th>Difficulty</th>
          <th>Hash Rate</th>
          <th>Reward</th>
        </tr>
        </thead>
        <tbody>
        {blocks.map(block => BlockListRow({block}))}
        </tbody>

      </table>
      <BlocksPagination currentpage = {currentpage} maxpage = {maxpage} onNavigate = {onNavigate}/>


    </div>
  )
};
