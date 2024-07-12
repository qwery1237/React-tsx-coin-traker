import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IPriceData } from './Coin';

const Overview = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 100px;
  background-color: ${(props) => props.theme.bgContainer};
  padding: 2rem 1.5rem;
  border-radius: 0.75rem;
`;
const OverviewItem = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;
const Title = styled.span`
  opacity: 0.7;
`;
const Val = styled.span`
  font-size: larger;
`;
const Percent = styled.div<{ percentChange: number }>`
  display: flex;
  align-items: center;
  color: ${(props) => {
    if (props.percentChange === 0) return props.theme.textColor;
    if (props.percentChange === -1) return props.theme.accentColorNegative;
    return props.theme.accentColor;
  }};
`;
const Symbol = styled.div`
  color: inherit;
  padding-top: 0.3rem;
  margin-right: 0.1rem;
  font-size: x-small;
`;
const Time = styled.span`
  opacity: 0.5;
  font-size: smaller;
  margin-left: 0.5rem;
`;
const Ath = styled.div`
  display: flex;
  gap: 0.75rem;
`;
const abbreviateNumber = (price: number): string => {
  if (price >= 1e12) {
    return (price / 1e12).toFixed(2) + 'T';
  } else if (price >= 1e9) {
    return (price / 1e9).toFixed(2) + 'B';
  } else if (price >= 1e6) {
    return (price / 1e6).toFixed(2) + 'M';
  } else if (price >= 1e3) {
    return (price / 1e3).toFixed(2) + 'K';
  } else {
    return price.toString();
  }
};

const detectChange = (percent: number): number => {
  if (percent === 0) return 0;
  if (percent < 0) return -1;
  return 1;
};
const generateSymbol = (percent: number): string => {
  if (percent === 0) return '';
  if (percent < 0) return '▼';
  return '▲';
};
export default function Detail() {
  const { priceInfo } =
    (useLocation().state as { priceInfo: IPriceData }) || {};
  const detail = priceInfo.quotes.USD || {};
  return (
    <>
      {!detail ? (
        <span>Detail does not exist</span>
      ) : (
        <Overview>
          <OverviewItem>
            <Title>Current Price</Title>
            <Val>${Number(detail.price.toFixed(2)).toLocaleString()}</Val>
          </OverviewItem>
          <OverviewItem>
            <Title>Market Cap</Title>
            <Val>${abbreviateNumber(detail.market_cap)}</Val>
          </OverviewItem>
          <OverviewItem>
            <Title>Volume 24h</Title>
            <Val>${abbreviateNumber(detail.volume_24h)}</Val>
          </OverviewItem>
          <OverviewItem>
            <Title>Price Change (1h)</Title>
            <Percent percentChange={detectChange(detail.percent_change_1h)}>
              <Symbol>{generateSymbol(detail.percent_change_1h)}</Symbol>
              {`${Math.abs(detail.percent_change_1h)}%`}
            </Percent>
          </OverviewItem>
          <OverviewItem>
            <Title>Price Change (24h)</Title>
            <Percent percentChange={detectChange(detail.percent_change_24h)}>
              <Symbol>{generateSymbol(detail.percent_change_24h)}</Symbol>
              {`${Math.abs(detail.percent_change_24h)}%`}
            </Percent>
          </OverviewItem>
          <OverviewItem>
            <Title>Price Change (7d)</Title>
            <Percent percentChange={detectChange(detail.percent_change_7d)}>
              <Symbol>{generateSymbol(detail.percent_change_7d)}</Symbol>
              {`${Math.abs(detail.percent_change_7d)}%`}
            </Percent>
          </OverviewItem>
          <OverviewItem>
            <div>
              <Title>All Time High</Title>
              <Time>
                {Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(Date.parse(detail.ath_date))}
              </Time>
            </div>
            <Ath>
              <Val>${Number(detail.ath_price.toFixed(2)).toLocaleString()}</Val>
              <Percent percentChange={detectChange(detail.percent_change_7d)}>
                <Symbol>{generateSymbol(detail.percent_from_price_ath)}</Symbol>
                {`${Math.abs(detail.percent_from_price_ath)}%`}
              </Percent>
            </Ath>
          </OverviewItem>
        </Overview>
      )}
    </>
  );
}
