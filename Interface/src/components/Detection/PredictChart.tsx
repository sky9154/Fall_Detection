import { FC } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Box from '@mui/material/Box';
import { useCameraContext } from 'context/CameraContext';
import Wave from 'components/Loader/Wave';




const PredictChart: FC = () => {
  const { isLoading, predict } = useCameraContext();

  const data = {
    series: [
      {
        data: Object.values(predict.value)
      }
    ],
    categories: [
      'Safety',
      'Warning',
      'Fall'
    ]
  };

  const chart: ApexChart = {
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'easein',
      speed: 500,
      animateGradually: {
        enabled: true,
        delay: 500
      },
      dynamicAnimation: {
        enabled: true,
        speed: 500
      }
    },
    height: '100%'
  };

  const colors: string[] = [
    '#03A9F4',
    '#FF9800',
    '#EF5350'
  ]

  const plotOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 12,
      columnWidth: '50%',
      barHeight: "80%",
      borderRadiusApplication: 'around',
      distributed: true,
      horizontal: false,
      rangeBarGroupRows: true,
      colors: {
        backgroundBarColors: colors,
        backgroundBarOpacity: 0.1,
        backgroundBarRadius: 12
      },
    },
  }

  const enabledFalse: ApexDataLabels | ApexTooltip = {
    enabled: false
  }

  const showFalse: boolean | ApexGrid = {
    show: false
  }

  const options: ApexOptions = {
    chart: chart,
    colors: colors,
    plotOptions: plotOptions,
    xaxis: {
      categories: data.categories,
      labels: showFalse
    },
    yaxis: {
      show: false,
      max: 100
    },
    dataLabels: enabledFalse,
    grid: showFalse,
    tooltip: enabledFalse
  };

  const series = data.series;

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Box
        position="absolute"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {(isLoading.value) ? (
          <Wave />
        ) : (
          <Chart
            options={options}
            series={series}
            type="bar"
            height="100%"
          />
        )}
      </Box>
    </Box>
  );
}

export default PredictChart;