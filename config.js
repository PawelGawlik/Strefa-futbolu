module.exports = {
    keySession: ['sesja'],
    maxAgeSession: 3600 * 1000,
    db: process.env.MONGODB_URI
}