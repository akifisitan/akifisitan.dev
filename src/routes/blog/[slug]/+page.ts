import type { PostComponent } from "$lib/types.js";

export const load = async ({ params }) => {
	const { slug } = params;
	const post: PostComponent = await import(`../../../../posts/${slug}/${slug}.md`);
	return {
		content: post.default,
		metadata: post.metadata,
	};
};
