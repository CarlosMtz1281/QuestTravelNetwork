import Content from "@/components/nav-user";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Content>{children}</Content>
		</section>
	);
}
