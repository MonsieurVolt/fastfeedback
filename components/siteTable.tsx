import React from "react";
import { Box, Link } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./table";
import { parseISO, format } from "date-fns";

const SiteTable: React.FC<{ sites: any }> = ({ sites }) => {
	return (
		<Table>
			<thead>
				<Tr>
					<Th>Name</Th>
					<Th>Site Link</Th>
					<Th>Feedback Link</Th>
					<Th>Date Added</Th>
					<Th>{""}</Th>
				</Tr>
			</thead>
			<tbody>
				{sites.map(
					(site: { name: string; createdAt: string; url: string }) => (
						<Box as="tr" key={site.url}>
							<Td>{site.name}</Td>
							<Td>{site.url}</Td>
							<Td>
								<Link>View Feedback</Link>
							</Td>
							<Td>{format(parseISO(site.createdAt), "PPpp")}</Td>
						</Box>
					)
				)}
			</tbody>
		</Table>
	);
};

export default SiteTable;
