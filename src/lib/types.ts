export type SendOptions = {
	method: string;
	headers: Record<string, string>;
	body?: string | FormData;
};
