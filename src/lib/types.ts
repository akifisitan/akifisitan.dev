export type PostComponent = {
	default: any;
	metadata: Post;
};

export type Post = {
	title: string;
	date: string;
	published: boolean;
};
