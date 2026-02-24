import ReactApexChart from 'react-apexcharts';
import { useMemo } from 'react';

export function SensorChart({ history, sensor, color }) {
  const series = useMemo(() => [{
    name: sensor,
    data: history.map(h => ({
      x: h.timestamp.getTime(),
      y: parseFloat(h[sensor]?.toFixed(2) ?? 0),
    })),
  }], [history, sensor]);

  const options = useMemo(() => ({
    chart: {
      type:      'area',
      height:    160,
      sparkline: { enabled: false },
      toolbar:   { show: false },
      zoom:      { enabled: false },
      animations: {
        enabled: true,
        dynamicAnimation: { enabled: true, speed: 800 },
      },
      background: 'transparent',
    },
    stroke:   { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom:    0.35,
        opacityTo:      0.02,
      },
    },
    colors:  [color ?? '#3b82f6'],
    xaxis: {
      type: 'datetime',
      labels: {
        style:    { colors: '#64748b', fontSize: '10px' },
        datetimeFormatter: { minute: 'HH:mm:ss' },
      },
      axisBorder: { show: false },
      axisTicks:  { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#64748b', fontSize: '10px' },
        formatter: v => v?.toFixed(1),
      },
    },
    grid: {
      borderColor: '#1e293b',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'dark',
      x:     { format: 'HH:mm:ss' },
    },
    dataLabels: { enabled: false },
  }), [color]);

  return (
    <ReactApexChart
      type="area"
      series={series}
      options={options}
      height={160}
    />
  );
}