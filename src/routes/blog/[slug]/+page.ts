type Post = {
	default: any;
	metadata: {
		title: string;
		date: string;
		published: boolean;
	};
};

export const load = async ({ params }) => {
	const { slug } = params;
	const post: Post = await import(`../../../lib/posts/${slug}.md`);
	return {
		content: post.default,
		metadata: post.metadata,
	};
};
