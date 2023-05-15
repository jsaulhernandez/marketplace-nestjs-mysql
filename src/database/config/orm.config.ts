import 'dotenv/config';

export const TypeOrmConfig = () => ({
    port: process.env.HTTP_PORT || 3000,
    host: process.env.HTTP_HOST || 'localhost',
    database: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_URL,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
        connectTimeout: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
        // acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT),
        extra: {
            connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT),
        },
    },
});
