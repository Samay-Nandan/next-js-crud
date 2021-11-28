const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDatabase() {

    // check the MongoDB URI
    if (!MONGODB_URI) {
        throw new Error('Define the MONGODB_URI environmental variable');
    }
    
    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster or Local Mongo URI
    await mongoose.connect(MONGODB_URI, opts);
    
}