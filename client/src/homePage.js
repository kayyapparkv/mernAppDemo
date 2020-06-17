import React from 'react';
import axios from'axios';
import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
let milkPriceDataPoints = [];
let milkProductionPoints = [];
let snfPoints = [];
let fatPoints = [];

CanvasJS.addColorSet("customColorSet1",
[
    "rgb(8, 191, 6)",
]);
CanvasJS.addColorSet("customColorSet2",
[
    "orange",
    "blue",
]);
class homePage extends React.Component {

      componentDidMount = () => {
        this.getBlogPost();
      }

      getBlogPost = () => {
        var milkProductionChart = this.milkProductionChart;
        var milkPriceChart = this.milkPriceChart;
        var snfFatChart = this.snfFatChart;


        axios({
          url: 'api',
          method: 'GET'
        }).then((response) => {
          const data = response.data;
          this.setState({data: data});
          console.log('Data has been received!!',data);
          console.log(data, data.length);
          let len = data.length;
          for(let i=len - 1; i>= 0; i--){
            milkPriceDataPoints.push({
                label: new Date(`${data[i]["DATE "]}`).toLocaleDateString(),
                y: data[i]["MILK PRICE"]
            });
            milkProductionPoints.push({
                label: new Date(`${data[i]["DATE "]}`).toLocaleDateString(),
                y: data[i]["MILK PRODUCTION "]
            });
            snfPoints.push({
                label: new Date(`${data[i]["DATE "]}`).toLocaleDateString(),
                y: data[i]["SNF"]
            });
            fatPoints.push({
                label: new Date(`${data[i]["DATE "]}`).toLocaleDateString(),
                y: data[i]["FAT"]
            })
          }
          milkProductionChart.render();
          milkPriceChart.render();
          snfFatChart.render();
          milkPriceDataPoints = [];
         milkProductionPoints = [];
         snfPoints = [];
         fatPoints = [];
        }).catch(() => {
          console.log('Error retrieving error');
        })
      }
	render() {
        const optionsMilkProduction = {
            colorSet: "customColorSet1",
            theme: "light2",
            title: {
                text: 'MILK PRODUCTION OVERVIEW',
                fontColor: "white",
                backgroundColor: "rgb(198, 252, 3)",
                padding: 15
            },
			axisY: {
				includeZero: false
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
                dataPoints: milkProductionPoints,
                indexLabel: "{y}",
                indexLabelPlacement: "inside"
			}]
		}

        let optionsMilkPrice = {
            colorSet: "customColorSet1",
            title: {
                text: 'Milk Price Overview (Last 7 days)',
                fontColor: "white",
                backgroundColor: "rgb(198, 252, 3)",
                padding: 10,
            },
            
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
                dataPoints: milkPriceDataPoints,
                indexLabel: "{y}",
                indexLabelPlacement: "top"
			}
			]
        }
        
        let optionsFatSnf = {
            colorSet: "customColorSet2",
            title: {
                text: 'Fat and SNF OVERVIEW (Last 7 days)',
                fontColor: "white",
                backgroundColor: "rgb(198, 252, 3)",
                padding: 10
            },
            animationEnabled: true,	
            axisY : {
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "SNF",
                showInLegend: true,
                dataPoints: snfPoints,
                indexLabel: "{y}",
                indexLabelPlacement: "top",
            },
            {
                type: "spline",
                name: "FAT",
                showInLegend: true,
                dataPoints: fatPoints,
                indexLabel: "{y}",
                indexLabelPlacement: "top",
            }]
    }
		return (
        <div>
            <div className="graph-div">
                <div className="graph1">
                    <CanvasJSChart options = {optionsMilkProduction} onRef={ref => this.milkProductionChart = ref}/>
                </div>
                <div className="graph1">
                    <CanvasJSChart options = {optionsMilkPrice } onRef={ref => this.milkPriceChart = ref} />
                </div>
            </div>
            <div className="graph-div">
                <div className="graph2">
                    <CanvasJSChart options = {optionsFatSnf} onRef={ref => this.snfFatChart = ref}/>
                </div>
            </div>
        </div>
		);
	}
}
export default homePage;  