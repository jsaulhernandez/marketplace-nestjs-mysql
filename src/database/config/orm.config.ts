import 'dotenv/config';
import { stringToBoolean } from 'src/utils/strings.utils';

export const TypeOrmConfig = () => ({
    port: Number(process.env.HTTP_PORT),
    host: process.env.HTTP_HOST,
    database: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_URL,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: stringToBoolean(process.env.DATABASE_SYNCHRONIZE),
        connectTimeout: Number(process.env.DATABASE_CONNECTION_TIME_OUT),
        // acquireTimeout: Number(process.env.DATABASE_ACQUIRE_TIME_OUT),
        extra: {
            connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT),
        },
        logging: stringToBoolean(process.env.DATABASE_SHOW_SQL),
    },
});
