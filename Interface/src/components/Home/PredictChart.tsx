import { FC } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useCameraContext } from 'context/Home/CameraContext';


const Loader = styled(Box)(() => ({
  textIndent: '-9999em',
  margin: 'auto',
  position: 'absolute',
  right: 'calc(50% - 6.8px)',
  top: 'calc(50% - 16px)',
  background: '#42A5F5',
  animation: 'loading-keys-app-loading 0.8s infinite ease-in-out',
  width: '13.6px',
  height: '32px',
  animationDelay: '0.16s !important',
  '&::before, &::after': {
    position: 'absolute',
    top: 0,
    content: '""',
    background: '#42A5F5',
    width: '13.6px',
    height: '32px',
    animation: 'loading-keys-app-loading 0.8s infinite ease-in-out',
  },
  '&::before': {
    left: '-19.992px',
  },
  '&::after': {
    left: '19.992px',
    animationDelay: '0.32s !important',
  },
  '@keyframes loading-keys-app-loading': {
    '0%, 80%, 100%': {
      opacity: 0.75,
      boxShadow: '0 0 #42A5F5',
      height: '32px',
    },
    '40%': {
      opacity: 1,
      boxShadow: '0 -8px #42A5F5',
      height: '40px',
    }
  }
}));

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
          <Loader />
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