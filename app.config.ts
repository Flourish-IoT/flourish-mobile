import 'dotenv/config';

export default {
	hooks: {
		postPublish: [
			{
				file: "sentry-expo/upload-sourcemaps",
				config: {
					organization: process.env.SENTRY_PROJECT_NAME,
					project: process.env.SENTRY_ORG_NAME,
					authToken: process.env.SENTRY_AUTH
				}
			}
		]
	}
};
