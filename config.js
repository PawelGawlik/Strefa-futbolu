module.exports = {
    keySession: ['sesja'],
    maxAgeSession: 3600 * 1000,
    db: process.env.MONGODB_URI
    // db: "mongodb+srv://Pawgaw:CcaD5900@cluster0.dx8wf.mongodb.net/sf?retryWrites=true&w=majority"
}