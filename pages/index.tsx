import Head from "next/head";
import {
	Button,
	Heading,
	Text,
	Code,
	Flex,
	useRadioGroup,
} from "@chakra-ui/react";
import { Logo } from "styles/theme";
import { useAuth } from "lib/auth";
import { useRouter } from "next/router";

const Home = () => {
	const router = useRouter();
	const auth = useAuth();
	return (
		<Flex
			as="main"
			direction="column"
			align="center"
			justify="center"
			h="100vh"
		>
			<Head>
				<title>Fast Feedback</title>
			</Head>

			<Logo boxSize="64px" />
			{auth?.user ? (
				<Button mt={4} size="sm" onClick={(e) => auth?.signout()}>
					Sign Out
				</Button>
			) : (
				<Button mt={4} size="sm" onClick={(e) => auth?.signinWithGitHub()}>
					Sign In
				</Button>
			)}
			<Button onClick={() => router.push("/dashboard")}>DashBoard</Button>
		</Flex>
	);
};

export default Home;
