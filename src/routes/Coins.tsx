import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { useQuery } from '@tanstack/react-query';
import { getCoins } from '../apis/coin';
import { Helmet } from 'react-helmet';
import { SiKucoin } from 'react-icons/si';
import { LuSunDim, LuMoonStar } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import { themes, themeState } from '../atom';

const Container = styled.div`
  padding: 0 5rem;
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
const CoinList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const CoinImg = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 1.5rem;
`;
const Coin = styled.li`
  background-color: ${(props) => props.theme.bgContainer};
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  height: 75px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.2s ease-in;
  }
  :last-child {
    margin-left: auto;
  }
`;
const RArr = styled.i``;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const [theme, setTheme] = useRecoilState(themeState);
  const { isLoading, data: coins } = useQuery<ICoin[]>({
    queryKey: ['allCoins'],
    queryFn: getCoins,
  });
  const onClick = () => {
    if (theme === themes.DARK) {
      setTheme(themes.LIGHT);
      return;
    }
    setTheme(themes.DARK);
  };
  return (
    <Container>
      <Helmet>
        <title>COIN</title>
      </Helmet>
      <Header icon={<SiKucoin />} title='coin' />
      <Button onClick={onClick}>
        {theme === themes.DARK ? <LuSunDim /> : <LuMoonStar />}
      </Button>
      <CoinList>
        {isLoading ? (
          <Loader height='60vh' />
        ) : (
          coins?.map((coin) => (
            <Link key={coin.id} to={`${coin.id}`} state={{ name: coin.name }}>
              <Coin>
                <CoinImg
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name}
                <RArr>&rarr;</RArr>
              </Coin>
            </Link>
          ))
        )}
      </CoinList>
    </Container>
  );
}
