import axios from 'axios';

const BASE_URL = 'https://api.coinpaprika.com/v1/';

export const getCoins = async () => {
  const { data } = await axios.get(`${BASE_URL}coins`);
  const top100 = data.slice(0, 100);

  return top100;
};

export const getCoin = async (coinId?: string) => {
  const { data } = await axios.get(`${BASE_URL}coins/${coinId}`);
  return data;
};
export const getPrice = async (coinId?: string) => {
  const { data } = await axios.get(`${BASE_URL}tickers/${coinId}`);
  return data;
};

export const getFakeCoins = async () => {
  const { data } = await axios.get('/fakeCoins.json');

  return data;
};

export const getFakeCoin = async (coinId?: string) => {
  const { data } = await axios.get(`/coins/${coinId}.json`);

  return data;
};
export const getFakePrice = async (coinId?: string) => {
  const { data } = await axios.get(`/tickers/${coinId}.json`);

  return data;
};

export const getCoinHistory = async (coinId?: string) => {
  const { data } = await axios.get(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  return data;
};
