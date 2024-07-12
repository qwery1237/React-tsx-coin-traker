import { Outlet } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DarkTheme, lightTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { themes, themeState } from './atom';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
* {
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding-bottom: 1.5rem;
}
a{
  text-decoration: none;
  color: inherit
}
`;

export default function App() {
  const themeColor = useRecoilValue(themeState);
  const theme = themeColor === themes.DARK ? DarkTheme : lightTheme;
  console.log(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
    </>
  );
}
