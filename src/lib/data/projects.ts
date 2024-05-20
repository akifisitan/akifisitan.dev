const projects = {
	healtrack: {
		name: "HealTrack",
		description:
			"Medication management app that ensures timely doses, alerts caregivers to issues, and offers a chatbot for answering medication-related questions.",
		link: undefined,
		icon: "healtrack",
	},
	ovatify: {
		name: "Ovatify",
		description:
			"Music platform focused on sharing and viewing music information, designed to offer tailored experiences to music enjoyers.",
		link: "https://github.com/akifisitan/ovatify",
		icon: "ovatify",
	},
	tictactoe_network: {
		name: "TicTacToe-Network",
		description:
			"Socket programming project which allows multiple players to engage in the classic TicTacToe game over network.",
		link: "https://github.com/akifisitan/tictactoe-network",
		icon: "tictactoe",
	},
	rhythms_of_code: {
		name: "Rhythms of Code",
		description:
			"Data science project exploring the connection between programming, music listening habits, and sleep patterns.",
		link: "https://github.com/akifisitan/rhythms-of-code",
		icon: "rhythms-of-code",
	},
	newsapp: {
		name: "NewsApp",
		description:
			"Android native app which allows users to read news, and post and view comments about them.",
		link: "https://github.com/akifisitan/newsapp",
		icon: "newsapp",
	},
	hang7e: {
		name: "Hang7e",
		description:
			"Web application which allows users to play Hangman and Word7e, and see their points via the leaderboard.",
		link: "https://github.com/akifisitan/hang7e",
		icon: "hang7e",
	},
	unocord: {
		name: "unocord",
		description: "A bot that allows server members to play Uno inside Discord.",
		link: "https://github.com/akifisitan/unocord",
		icon: "unocord",
	},
	gpa_calc: {
		name: "gpa-calc",
		description:
			"An easy-to-use tool that enables Sabanci University students to calculate their semester and overall GPAs on the fly.",
		link: "https://github.com/akifisitan/gpa-calc",
		icon: "gpa-calc",
	},
	sveltere: {
		name: "SvelteRE",
		description:
			"Fullstack web project which allows users to create, edit and view property listings.",
		link: "https://github.com/akifisitan/sveltere",
		icon: "sveltere",
	},
	real_estate_app_api: {
		name: "Real Estate App API",
		description:
			"Backend API project built for RealEstateApp & SvelteRE with CRUD operations, user authentication and image uploads.",
		link: "https://github.com/akifisitan/RealEstateApp.Api",
		icon: "real-estate-app-api",
	},
	gmpbot: {
		name: "GMPBot",
		description:
			"A Discord bot which has reminders, emoji scraping and rock paper scissors built in.",
		link: "https://github.com/akifisitan/gmpbot",
		icon: "gmpbot",
	},
	suchedule_plus: {
		name: "Suchedule+",
		description: "Suchedule but better",
		link: "https://github.com/akifisitan/suchedule",
		icon: "suchedule-plus",
	},
	sucraper: {
		name: "Sucraper",
		description: "A web scraper for ???",
		link: "https://github.com/akifisitan/sucraper",
		icon: "sucraper",
	},
	ovatify_on_the_cloud: {
		name: "Ovatify On The Cloud",
		description:
			"Ovatify the music platform redesigned and adapted to run as a Cloud Native application.",
		link: undefined,
		icon: "ovatify-on-the-cloud",
	},
} as const;

export const projectSections = [
	{
		title: "Current Focus",
		projects: [projects.healtrack, projects.ovatify_on_the_cloud],
	},
	{
		title: "Course Projects",
		projects: [
			projects.ovatify,
			projects.tictactoe_network,
			projects.rhythms_of_code,
			projects.newsapp,
			projects.hang7e,
		],
	},
	{
		title: "Hobby Projects",
		projects: [
			projects.unocord,
			projects.gpa_calc,
			projects.sveltere,
			projects.real_estate_app_api,
			projects.gmpbot,
		],
	},
] as const;

export const homeProjects = [
	projects.ovatify,
	projects.gpa_calc,
	projects.tictactoe_network,
	projects.sveltere,
	projects.real_estate_app_api,
	projects.gmpbot,
	projects.rhythms_of_code,
	projects.unocord,
] as const;
