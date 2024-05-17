import { getLocalPosts } from "$lib/posts";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
	const { posts } = await getLocalPosts();

	return json(posts);
};
