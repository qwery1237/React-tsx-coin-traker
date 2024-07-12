import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCoinHistory } from '../apis/coin';
import Loader from '../components/Loader';
import ApexChart from 'react-apexcharts';
import styled, { useTheme } from 'styled-components';

interface IDayHistory {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

const ChartContainer = styled.div`
  svg {
    border-radius: 0.75rem;
  }
  .apexcharts-tooltip {
    box-shadow: 0 0 6px -1px #999 !important;
  }
  .apexcharts-tooltip-candlestick {
    background-color: #292a33;
    color: ${(props) => props.theme.textColor};
    padding: 0.75rem;
    border-radius: 0.25rem;
  }
  .apexcharts-tooltip-candlestick span {
    color: ${(props) => props.theme.accentColor};
    font-weight: 800;
  }
`;

export default function Chart() {
  const theme = useTheme();
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IDayHistory[]>({
    queryKey: ['coinHistory', coinId],
    queryFn: () => getCoinHistory(coinId),
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ChartContainer>
          {!data ? (
            <span>Chart does not exist</span>
          ) : (
            <ApexChart
              options={{
                chart: {
                  background: theme.bgContainer,
                  redrawOnParentResize: true,
                  redrawOnWindowResize: false,
                  toolbar: {
                    show: false,
                  },
                },
                grid: {
                  show: false,
                },
                xaxis: {
                  axisBorder: { show: false },
                  axisTicks: {
                    show: false,
                  },
                  labels: {
                    show: false,
                  },
                },
                yaxis: {
                  show: false,
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: theme.accentColor,
                      downward: theme.accentColorNegative,
                    },
                  },
                },
                tooltip: {
                  theme: 'dark',
                  custom: function ({ seriesIndex, dataPointIndex, w }) {
                    const o = `$ ${w.globals.seriesCandleO[seriesIndex][
                      dataPointIndex
                    ].toFixed(2)}`;
                    const h = `$ ${w.globals.seriesCandleH[seriesIndex][
                      dataPointIndex
                    ].toFixed(2)}`;
                    const l = `$ ${w.globals.seriesCandleL[seriesIndex][
                      dataPointIndex
                    ].toFixed(2)}`;
                    const c = `$ ${w.globals.seriesCandleC[seriesIndex][
                      dataPointIndex
                    ].toFixed(2)}`;
                    return (
                      '<div class="apexcharts-tooltip-candlestick">' +
                      '<div>Open: <span class="value">' +
                      o +
                      '</span></div>' +
                      '<div>High: <span class="value">' +
                      h +
                      '</span></div>' +
                      '<div>Low: <span class="value">' +
                      l +
                      '</span></div>' +
                      '<div>Close: <span class="value">' +
                      c +
                      '</span></div>' +
                      '</div>'
                    );
                  },
                },
              }}
              type='candlestick'
              series={[
                {
                  data:
                    data?.map((hist) => {
                      return {
                        x: new Date(hist.time_open * 1000),
                        y: [+hist.open, +hist.high, +hist.low, +hist.close],
                      };
                    }) || [],
                },
              ]}
            />
          )}
        </ChartContainer>
      )}
    </>
  );
}
