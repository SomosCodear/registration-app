import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from 'store';
import { theme, GlobalStyles } from 'styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Head>
          <title>WebConf 2022</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
