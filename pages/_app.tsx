import "modern-css-reset/dist/reset.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/github-markdown.css";
import theme from "@/styles";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
