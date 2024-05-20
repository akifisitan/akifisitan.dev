import type { PostComponent } from "$lib/types.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
	const { slug } = params;
	try {
		const post: PostComponent = await import(`../../../posts/${slug}/${slug}.md`);
		return {
			content: post.default,
			metadata: post.metadata,
		};
	} catch (e: any) {
		if (e?.message?.includes("Unknown variable dynamic import:")) {
			error(404, "Post not found");
		} else {
			error(500, e?.message);
		}
	}
};
