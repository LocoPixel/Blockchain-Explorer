/**
 * Created by haseeb on 20/04/2017.
 */


import React from  'react';
import { connect } from 'react-redux';
import { Grid, Card, Icon, Table } from 'semantic-ui-react';
import { blocksActions, blocksSelectors } from '../../store/blocks/index';
import Moment from 'react-moment';




//api calls
class BlockDetailIndex extends React.Component{



  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };





  constructor(props, context) {
    super(props, context);
    //this.navigate = this.navigate.bind(this);
  }


  componentDidMount() {
    //console.log(this.props.routeParams.blockid);
    this.fetchBlock({id: this.props.routeParams.blockid});
  }
  //
  fetchBlock(params) {
    this.context.store.dispatch(blocksActions.fetchBlock(params));
  }

  render(){

    const {
      params,
      data,
    } = this.props;

    // if(data != undefined){
    // }

    console.log(data);
      let unixTimestamp ;
      if(data != undefined){
          unixTimestamp = parseInt(data.timestamp,10);
          console.log(parseInt(data.timestamp,10))
      }

    return(
      <div>
          <h1 className="headings-big"> Block  <span># {this.props.routeParams.blockid}</span> </h1>
          <Grid columns ={2}>
            <Grid.Row>
              <Grid.Column>
                  <Table celled striped>
                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell colSpan='2'>Summary</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>

                      <Table.Body>
                          <Table.Row>
                              <Table.Cell collapsing>
                                   Author
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.author}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Timestamp
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">

                                  <Moment unix fromNow>{unixTimestamp}</Moment>
                                  </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Sha3Uncles
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.sha3Uncles}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Mined By
                              </Table.Cell>
                            <Table.Cell className="td-textoverflow"><a href={`/address/${data != undefined && data.miner}`}>{data != undefined && data.miner}</a></Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Difficulty
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.difficulty}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Total Difficulty
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.totalDifficulty}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Size
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.size}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Gas limit
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.gasLimit}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Gas Used
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.gasUsed}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Nonce
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.nonce}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Block Reward
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.blockReward}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell collapsing>
                                  Uncle Reward
                              </Table.Cell>
                              <Table.Cell className="td-textoverflow">{data != undefined && data.uncleReward}</Table.Cell>
                          </Table.Row>

                      </Table.Body>
                  </Table>


              </Grid.Column>

                <Grid.Column>



                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>Hashes</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell collapsing>
                                    Hash
                                </Table.Cell>
                                <Table.Cell className="td-textoverflow">{data != undefined && data.hash}</Table.Cell>
                            </Table.Row>


                            <Table.Row>
                                <Table.Cell collapsing>
                                    Parent Hash
                                </Table.Cell>
                                <Table.Cell className="td-textoverflow">{data != undefined && data.parentHash}</Table.Cell>
                            </Table.Row>








                        </Table.Body>
                    </Table>


                </Grid.Column>
            </Grid.Row>

          </Grid>

          {
            data != undefined && data.transactions != undefined &&
            <h1 className="headings-big"> Transanctions  </h1>
          }

          {

              data != undefined &&
              data.transactions != undefined &&
              data.transactions.map(function(transaction)
                {
                  return (

                      <Table celled striped key={transaction.hash}>

                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell colSpan='4'>
                                    <a href={`/tx/${transaction.hash}`}> {transaction.hash}</a>
                                  </Table.HeaderCell>
                              </Table.Row>
                          </Table.Header>

                          <Table.Body>
                              <Table.Row>

                                  <Table.Cell collapsing>
                                    <a href={`/address/${transaction.to}`}> {transaction.to} </a>
                                  </Table.Cell>

                                  <Table.Cell className="border-none"><Icon className="transactions-right-arrow-styles" name='arrow right' /></Table.Cell>

                                  <Table.Cell className="border-left-none">
                                    <a href={`/address/${transaction.from}`}>  {transaction.from} </a>
                                  </Table.Cell>

                                <Table.Cell className="btc-bg ">{transaction.valueDec} EXP</Table.Cell>
                              </Table.Row>
                          </Table.Body>
                      </Table>
                  )
              })
          }


      </div>
    );
  }
}



function mapStateToProps(state ,props) {
    return  {
       params: blocksSelectors.getParams(state),
      data: blocksSelectors.getBlock(state, props.routeParams.blockid)
    }
}

export default connect(mapStateToProps, {blocksActions, blocksSelectors})(BlockDetailIndex);
