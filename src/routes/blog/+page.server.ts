import { getLocalPosts } from "$lib/posts.js";

export const load = async () => {
	try {
		return await getLocalPosts();
	} catch (e) {
		return { posts: [] };
	}
};
