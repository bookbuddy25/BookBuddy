import chalk from "chalk";
import mongoose from "mongoose";

const DATABASE = {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    url: process.env.DATABASE_URL
}

const connect = async() => {
    try {
        const connection_string = DATABASE.url
            .replace("<db_user>", DATABASE.user)
            .replace("<db_password>", DATABASE.pass)

        await mongoose.connect(connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(chalk.blue("Database connected successfully"));

    } catch (error) {
        console.log(chalk.red(error))
    }
}

export default connect;