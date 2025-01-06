/** @type {import ("drizzle-kit").Config} */
export default{
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:jLEbR12DWCvG@ep-divine-glade-a579ithf.us-east-2.aws.neon.tech/interview-ai?sslmode=require',
    }
};