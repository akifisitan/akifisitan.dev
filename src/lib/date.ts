export function formatDate(date: string) {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(new Date(date));
}
