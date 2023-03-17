import 'modern-css-reset/dist/reset.min.css' 
import { ChakraProvider, theme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/github-markdown.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
