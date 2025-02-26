import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
