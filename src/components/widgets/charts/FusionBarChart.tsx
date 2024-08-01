import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import Umber from 'fusioncharts/themes/fusioncharts.theme.umber'
// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    // caption: "Countries with Highest Deforestation Rate",
    // subcaption: "For the year 2023",
    // yaxisname: "Deforested Area{br}(in Hectares)",
    decimals: "1",
    theme: "umber",
    // bgColor : "white"
  },
  data: [
    {
    //   label: "Brazil",
      value: "356287"
    },
    {
    //   label: "Indonesia",
      value: "101977"
    },
    // {
    //   label: "DR Congo",
    //   value: "94495"
    // },
    // {
    //   label: "Angola",
    //   value: "48865"
    // },
  ]
};


ReactFC.fcRoot(FusionCharts, charts, Umber);
const FusionBarChart = () => {
  return (
    <ReactFC
      type="Bar3d"
      width="100%"
      height="23%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default FusionBarChart;


