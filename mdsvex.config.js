import { defineMDSveXConfig as defineConfig } from "mdsvex";
import relativeImages from "mdsvex-relative-images";
import remarkExternalLinks from "remark-external-links";

const config = defineConfig({
	extensions: [".svelte.md", ".md", ".svx"],

	remarkPlugins: [
		relativeImages,
		// external links open in a new tab
		[remarkExternalLinks, { target: "_blank", rel: "noopener" }],
	],
});

export default config;
