import React from "react";
import { Pie } from "react-chartjs-2";

export type ChartData = {
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
  labels: string[];
};

export type Props = {
  data: ChartData;
  width: number;
  height: number;
};

// [FIY] https://www.chartjs.org/docs/latest/
const Chart: React.FC<Props> = ({ data, width, height }) => {
  return (
    <Pie
      data={data}
      width={width}
      height={height}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default Chart;
