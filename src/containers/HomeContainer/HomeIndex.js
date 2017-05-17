/**
 * Created by haseeb on 20/04/2017.
 */


import React from  'react';
import { Grid, Card,Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { transactionActions, transactionSelectors } from '../../store/transactions/index';
import { blocksActions, blocksSelectors } from '../../store/blocks/index';
import { HomeBlockList } from '../../components/home/HomeBlockList';
import { HomeTransactionList } from  '../../components/home/transactions/HomeTransactionList';
import { Scrollbars } from 'react-custom-scrollbars';
import { chartActions , chartSelectors} from '../../store/charts/index'
import { statsActions , statsSelectors} from '../../store/stats/index'
import Moment from 'react-moment';
import _ from "underscore";
import { TimeSeries } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Baseline, Resizable, ScatterChart,EventMarker } from "react-timeseries-charts";
import { Link} from 'react-router';



let points = [];
let temperatureSeries;
let min;
let max;

let newObject = {};


//const
const baselineStyle = {
  line: {
    stroke: "gray",
    strokeWidth: 1
  }
};

@connect(
  (state) => {
    return {
      params: transactionSelectors.getParams(state),
      data: transactionSelectors.getTransactions(state),

      paramB: blocksSelectors.getParams(state),
      dataB: blocksSelectors.getBlocks(state),


      dataC: chartSelectors.getTransactionCount(state),
      dataD: chartSelectors.getAddressCount(state),

     // dataE: statsSelectors.getHashRate(state),
      dataF: statsSelectors.getPrice(state),

      fromServer: state.MqttReducer,
      newCombineArray: [],
      actions: state,
    };
  }
)

export default class HomeIndex extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state ={
      tracker: null,
      trackerValue: "-- °C",
      trackerEvent: null,
      markerMode: "point"
      //temperatureSeries : null

    }
    this.handleTrackerChanged = this.handleTrackerChanged.bind(this)
  }

  componentDidMount() {
    this.fetchLatestTransaction({});
    this.fetchLatestBlocks({});
    this.fetchTransactionCount({});
    this.fetchAddressCount({});
    this.fetchHashRate({});
    this.fetchPrice({});

  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.data.transactions.length>0 && nextProps.dataB.blocks.length > 0 ){
      this.setState({loading:false})
    }
  }

  fetchLatestTransaction(params) {
    this.context.store.dispatch(transactionActions.fetchLatestTransaction(params));
  }

  fetchLatestBlocks(params) {
    this.context.store.dispatch(blocksActions.fetchLatestBlocks(params));
  }

  fetchTransactionCount(params) {
    this.context.store.dispatch(chartActions.fetchTransactionCount(params));
  }

  fetchAddressCount(params) {
    this.context.store.dispatch(chartActions.fetchAddressCount(params));
  }

  fetchHashRate(params){
    this.context.store.dispatch(statsActions.fetchHashRate(params));
  }

  fetchPrice(params){
    this.context.store.dispatch(statsActions.fetchPrice(params))
  }
  handleTrackerChanged(t) {
    if (t) {
      const e = temperatureSeries.atTime(t);
      const eventTime = new Date(
        e.begin().getTime() + (e.end().getTime() - e.begin().getTime()) / 2
      );
      const eventValue = e.get("addresscount");
      const v = `${eventValue > 0 ? "" : ""}${eventValue}`;
      this.setState({ tracker: eventTime, trackerValue: v, trackerEvent: e });
    } else {
      this.setState({ tracker: null, trackerValue: null, trackerEvent: null });
    }
  }

  renderMarker() {

    return (
      <EventMarker
        type="point"
        axis="axis"
        event={this.state.trackerEvent}
        column="addresscount"
        markerLabel={this.state.trackerValue}
        markerLabelAlign="left"
        markerLabelStyle={{ fill: "#2db3d1", stroke: "white" }}
        markerRadius={3}
        markerStyle={{ fill: "#2db3d1" }} />
    );

  }

  renderChart() {
    //const min = 0.0;
    //const max = 100.0;

    const axisStyle = {
      labels: {
        labelColor: "grey", // Default label color
        labelWeight: 100,
        labelSize: 8
      },
      axis: {
        axisColor: "grey",
        axisWidth: 1
      }
    };

    return (
      <ChartContainer
        timeRange={temperatureSeries.range()}
        timeAxisStyle={axisStyle}
        onTrackerChanged={this.handleTrackerChanged}
      >
        <ChartRow height="200" >
          <YAxis
            id="axis"
            label=""
            transition={1000}
            style={axisStyle}
            labelOffset={0}
            min={min}
            max={max}
            format=",.1f"
            width="60"
            type="linear"
          />
          <Charts>
            <LineChart
              axis="axis"
              series={temperatureSeries}
              columns={["addresscount"]}
            />
            <ScatterChart
              axis="axis"
              series={temperatureSeries}
              columns={["addresscount"]}
            />
            <Baseline
              axis="axis"
              value={min+10}
              label=""
              style={baselineStyle}
            />

            <Baseline
              axis="axis"
              value={max/2}
              label=""
              style={baselineStyle}
            />

            <Baseline
              axis="axis"
              value={max-10}
              label=""
              style={baselineStyle}
            />


            {this.renderMarker()}
          </Charts>
        </ChartRow>
      </ChartContainer>
    );
  }



  render(){

    const {
      params,
      data,
      paramB,
      dataB,
      dataC,
      dataD,
      dataF,
      fromServer
    } = this.props;




    if(fromServer.statsFromMqtt != undefined){
      newObject = fromServer.statsFromMqtt;

    }else{
      newObject = dataF
    }


    if(dataC.transactioncount.length > 0){
      points = []
      _.each(dataC.transactioncount, val => {
        const index = `${val.date}`;
        const temperature = val.count;
        points.push([index, temperature]);
      });

      max  = Math.max(...dataC.transactioncount.map(v => v.count))+1000
      min  = Math.min(...dataC.transactioncount.map(v => v.count))-1000
      if(points.length>0){
        temperatureSeries = new TimeSeries({
          name: "addresscount anomoly",
          columns: ["index", "addresscount"],
          points});
      }
    }



    return (
      <div>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color='blue' className="statsContainer">

                  {
                    newObject != undefined &&
                      <div>
                        <Grid.Row className="mcbox">
                          <Grid.Column>

                          </Grid.Column>
                          <Grid.Column>
                            <h4 className="mc label">Market Cap: {numeral(newObject.mc_usd).format('$0.00')}</h4>
                            <h2 className="price">{numeral(newObject.price_usd).format('$0.00')} @ {numeral(newObject.price_btc).format('0.00000000')}  BTC/EXP
                                <h6 className="changp">{numeral(newObject.change_usd).format('0.000')}%</h6>
                            </h2>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="lastblock">
                          <Grid.Column>
                            <p  className="label">Last Block</p>
                            <h1> {newObject.BlockNumebr}</h1>
                            <Moment unix fromNow>{parseInt(newObject.Foundat,10)}</Moment>

                          </Grid.Column>
                        </Grid.Row>

                        <Grid columns={2}>
                          <Grid.Row>
                            <Grid.Column className="hashrateContainer">

                                <p className="label">Hash Rate</p>
                                <h3> {numeral(newObject.Hashrate).format('00.000')}GH/s</h3>

                            </Grid.Column>
                            <Grid.Column className="difficultyConatiner">
                              <div className="box"><span className="label">Network Difficulty</span> <h3> {numeral(newObject.Difficulty/ Math.pow(1000, 4)).format('0.000')}GH/s</h3></div>

                            </Grid.Column>
                          </Grid.Row>
                        </Grid>

                       </div>

                  }

              </Segment>
              <Card className="full-width">
                 <Card.Content header="Blocks"/>
                <Link to={`blocks`}> <p className="view-all">View All</p></Link>
                <Scrollbars style={{height: 600 }}>
                  <div>
                    {
                      dataB.blocks.length > 0 &&
                      <HomeBlockList blocks = {dataB.blocks} moreblocks = {fromServer.mesg}/>
                    }
                  </div>
                </Scrollbars>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <div className="chart">
                <h3>7 Days Expanse Transaction History</h3>
                {

                  points.length > 0 &&
                  <Resizable>
                    {this.renderChart()}
                  </Resizable>
                }
              </div>
              <Card  className="full-width">
                <Card.Content header="Transactions" />
                <Scrollbars style={{height: 600 }}>
                  <div>

                    {

                      data.transactions.length > 0 &&
                      <HomeTransactionList transactions = {data.transactions} moretransactions = {fromServer.trans}/>
                    }
                  </div>
                </Scrollbars>


              </Card>
            </Grid.Column>
          </Grid.Row>

        </Grid>

      </div>
    );
  }
}

