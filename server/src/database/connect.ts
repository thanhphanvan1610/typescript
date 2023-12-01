import mongoose from "mongoose";
import env from '../utils/validateEnv'

const connect = async () => {
    try {
        let connection = await mongoose.connect(env.URI);
        console.log(`Connected to database`);
        return connection;
    } catch (error) {
        console.log(`Failed when connect to database!`);
    }
};

export default connect;
