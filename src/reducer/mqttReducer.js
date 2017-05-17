const defaultState = {

    mesg: [],
    trans: [],
    blockdataFromMQTT: [],
    statsFromMqtt: [],

    snackbar: {
        state: false,
        message: ''
    }
};

export default function MqttReducer(state = defaultState, action) {
    switch(action.type) {
        case 'NEW_BLOCK_DATA':
        {
            const payload = JSON.parse(action.payload);
            let mesg;
            mesg = state.mesg.concat([{
              id: payload.id,
              author : payload.author,
              difficulty : payload.difficulty,
              extraData : payload.extraData,
              gasLimit: payload.gasLimit,
              gasUsed: payload.gasUsed,
              hash: payload.hash,
              logsBloom: payload.logsBloom,
              miner: payload.miner,
              mixHash: payload.mixHash,
              nonce: payload.nonce,
              number: payload.number,
              parentHash: payload.parentHash,
              receiptsRoot: payload.receiptsRoot,
              sealFields: payload.sealFields,
              sha3Uncles: payload.sha3Uncles,
              size: payload.size,
              stateRoot: payload.stateRoot,
              timestamp: payload.timestamp,
              totalDifficulty: payload.totalDifficulty,
              transactions: payload.transactions,
              transactionsRoot: payload.transactionsRoot,
              uncles: payload.uncles,
              decNumber: payload.decNumber,
              totalTransactions: payload.totalTransactions
            }]);

            return {
                ...state,
                mesg
            };

        }

        case 'NEW_TRANS_DATA':
        {
          const payload = JSON.parse(action.payload);
          let trans;
          trans = state.trans.concat([{
              hash : payload.hash,
              from: payload.from,
              to: payload.to,
              valueDec : payload.valueDec
          }]);

          return {
            ...state,
            trans
          };


          // if(state.trans != undefined){
          //   state.trans = state.trans.reverse();
          // }
          // trans = state.trans.concat([{
          //
          //     message: payload.message,
          //     transaction: payload.transaction,
          //     amount: payload.amount,
          //     to: payload.to,
          //     from: payload.from
          // }]);
          //
          // if(trans.length > 5){
          //   trans = trans.slice(1);
          // }
          // trans = trans.reverse();
          // return {
          //     ...state,
          //     trans
          //
          // };

        }

      case 'NEW_STATS_DATA':
      {
        const  payload = JSON.parse(action.payload);
        let statsFromMqtt;
        statsFromMqtt = {
          BlockNumebr : payload.BlockNumebr,
          Difficulty : payload.Difficulty,
          Foundat : payload.Foundat,
          Hashrate : payload.Hashrate,
          change_btc : payload.change_btc,
          change_usd : payload.change_usd,
          mc_usd : payload.mc_usd,
          price_btc : payload.price_btc,
          price_usd : payload.price_usd,
          supply_usd : payload.supply_usd,
          tmc_usd : payload.tmc_usd,
        };

        return {
          ...state,
          statsFromMqtt
        }
      }
        case 'MQTT_CONNECT':
        {
            return {
                ...state

            };
        }
        case 'MQTT_DISCONNECT':
        {
            return {
                ...state

            };
        }
        case 'MQTT_ERROR':
        {
            return {
                ...state

            };
        }
        default:
        {
            return state;
        }
    }
}
