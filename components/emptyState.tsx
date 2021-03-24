import React from "react";
import { Heading, Text, Flex } from "@chakra-ui/react";

import AddSiteModal from "./addSiteModal";

const EmptyState: React.FC = () => (
	<Flex
		width="100%"
		backgroundColor="white"
		borderRadius="8px"
		p={16}
		justify="center"
		align="center"
		direction="column"
	>
		<Heading size="lg" mb={2}>
			You haven't added any Site
		</Heading>
		<Text mb={4}>Welcom, let's get stated</Text>
		<AddSiteModal>Add your first site</AddSiteModal>
	</Flex>
);

export default EmptyState;
