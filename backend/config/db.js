const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // Deprecated in Mongoose 6+
            // useFindAndModify: false // Deprecated in Mongoose 6+
        });
        console.log('MongoDB Conectado...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Salir del proceso con fallo
    }
};

module.exports = connectDB;