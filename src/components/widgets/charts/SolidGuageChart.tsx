import React from "react";
import GaugeChart from "react-gauge-chart";

const styles = {
  dial: {
    display: "inline-block",
    width: "220px",
    height: "auto",
    color: "#000",
    padding: "2px",
    marginTop : "-15px"
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};

interface SolidGaugeChartProps {
  value?: number;
}

const SolidGaugeChart: React.FC<SolidGaugeChartProps> = ({ value = 40 }) => {
  let percent = value / 100;

  return (

    <div style={styles.dial}>
      <GaugeChart
        nrOfLevels={30}
        colors={["#00cccc", "#00ffff", "#ff0000"]}
        arcWidth={0.5}
        percent={percent}
        textColor={"#FFFFFF"}
        needleColor={"#999" }
        formatTextValue={(value) => value}
      />
      <div style={styles.title}>{""}</div>
    </div>

  );
};

export default SolidGaugeChart;
