import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Loader from '../components/Loader';
import styled from 'styled-components';
import Header from '../components/Header';
import { useQuery } from '@tanstack/react-query';
import { getCoin, getPrice } from '../apis/coin';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  padding: 0 5rem;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgContainer};
  padding: 1rem 2rem;
  border-radius: 0.75rem;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  :first-child {
    text-transform: uppercase;
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.bgContainer};
  color: ${(props) => props.theme.textColor};
  width: 37px;
  height: 37px;
  position: fixed;
  right: 35px;
  top: 60px;
  border-radius: 0.5rem;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.bgContainer};
  }
`;

const Description = styled.p`
  margin: 3rem 0;
  padding: 0 2rem;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 2rem 0;
  padding: 0;
`;
const Tab = styled.span<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.bgContainer};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    width: 100%;
    height: 100%;
    line-height: 48px;
  }
`;
interface IRouterState {
  name: string;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}
export default function Coin() {
  const { coinId } = useParams();
  const { name } = (useLocation().state as IRouterState) || '';

  const detailMatch = useMatch('/:coinId/detail');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: info } = useQuery<IInfoData>({
    queryKey: ['info', coinId],
    queryFn: () => getCoin(coinId),
  });
  const { isLoading: priceLoading, data: priceInfo } = useQuery<IPriceData>({
    queryKey: ['priceInfo', coinId],
    queryFn: () => getPrice(coinId),
    refetchInterval: 5000,
  });

  const loading = infoLoading || priceLoading;

  const navigate = useNavigate();

  const backToMain = () => {
    navigate('../');
  };

  return (
    <Container>
      <Helmet>
        <title>{info?.name || 'Loading...'}</title>
      </Helmet>
      <Header title={name ? name : info?.name || 'Loading'} />
      <Button onClick={backToMain}>&larr;</Button>
      {loading ? (
        <Loader height='40vh' />
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>
                $
                {Number(
                  priceInfo?.quotes.USD.price.toFixed(2)
                ).toLocaleString()}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total supply</span>
              <span>{priceInfo?.total_supply.toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max supply</span>
              <span>{priceInfo?.max_supply.toLocaleString()}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <Tabs>
        <Tab isActive={detailMatch !== null}>
          <Link to='detail' state={{ priceInfo }}>
            Detail
          </Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link to='chart'>Chart</Link>
        </Tab>
      </Tabs>
      <Outlet />
    </Container>
  );
}
