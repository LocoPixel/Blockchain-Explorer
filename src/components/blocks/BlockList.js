/**
 * Created by haseeb on 19/04/2017.
 */


import React from 'react';
import { BlockListRow } from './BlockListRow';

export const BlockList = ({blocks}) => {

  return (
    <div>

   
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
     


    </div>
  )
};
