import DashboardShell from "components/dashboardShell";
import EmptyState from "components/emptyState";
import SiteTable from "components/siteTable";
import SiteTableSkeleton from "components/siteTableSkeleton";
import { useAuth } from "lib/auth";
import React from "react";
import useSWR from "swr";
import fetcher from "utils/fetcher";

const Dashboard: React.FC = () => {
	const auth = useAuth();
	const { data } = useSWR("/api/sites", fetcher);
	console.log(data);
	if (!data) {
		return (
			<DashboardShell>
				<SiteTableSkeleton />
			</DashboardShell>
		);
	}

	return (
		<DashboardShell>
			{data.sites && data.sites.length !== 0 ? (
				<SiteTable sites={data.sites} />
			) : (
				<EmptyState />
			)}
		</DashboardShell>
	);
};

export default Dashboard;
