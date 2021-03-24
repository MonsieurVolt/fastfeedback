import React from "react";
import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Heading,
	Button,
	Flex,
	Link,
	Avatar,
	Icon,
} from "@chakra-ui/react";
interface Props {
	children: React.ReactChild;
}
import { useAuth } from "lib/auth";
import { Logo } from "styles/theme";
import AddSiteModal from "./addSiteModal";

const DashboardShell: React.FC<Props> = ({ children }) => {
	const { user, signout } = useAuth();

	return (
		<Box backgroundColor="gray.100" h="100vh">
			<Flex backgroundColor="white" mb={16} w="full">
				<Flex
					alignItems="center"
					justifyContent="space-between"
					pt={4}
					pb={4}
					maxW="1250px"
					margin="0 auto"
					w="full"
					px={8}
				>
					<Flex align="center">
						<Logo mr={8} boxSize="32px"></Logo>
						<Link mr={4}>Sites</Link>
						<Link>Feedback</Link>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<Button variant="ghost" mr={2} onClick={() => signout()}>
							Log Out
						</Button>
						<Avatar size="sm" src={user ? user.photoUrl : ""} />
					</Flex>
				</Flex>
			</Flex>
			<Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
				<Breadcrumb>
					<BreadcrumbItem>
						<BreadcrumbLink>Sites</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<Flex justifyContent="space-between">
					<Heading mb={8}>My Sites</Heading>
					<AddSiteModal>+ Add Site</AddSiteModal>
				</Flex>
				{children}
			</Flex>
		</Box>
	);
};

export default DashboardShell;
