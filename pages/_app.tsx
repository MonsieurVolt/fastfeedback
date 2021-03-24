import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { Props } from "framer-motion/types/types";

import { AuthProvider } from "lib/auth";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { Component, ComponentProps } from "react";
import customTheme from "styles/theme";

const GlobalStyle: React.FC = ({ children }) => {
	return (
		<>
			<CSSReset />
			<Global
				styles={css`
					html {
						min-width: 360px;
						scroll-behavior: smooth;
					}
					#__next {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
					}
				`}
			/>
			{children}
		</>
	);
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={customTheme}>
			<AuthProvider>
				<GlobalStyle>
					<Component {...pageProps} />
				</GlobalStyle>
			</AuthProvider>
		</ChakraProvider>
	);
};

export default App;
