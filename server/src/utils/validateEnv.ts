import {
    cleanEnv, port, str,
} from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        JWT_SECRET: str(),
        MONGO_PATH: str(),
        SERVER_PORT: port(),
    });
}

export default validateEnv;
