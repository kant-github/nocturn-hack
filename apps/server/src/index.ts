import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import { env } from './configs/env';
import router from './routes';

const PORT = env.SERVER_PORT;
const WEB_URL = env.SERVER_WEB_URL;
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: WEB_URL,
        credentials: true,
    }),
);

app.use('/api/v1', router);


server.listen(PORT, () => {
    console.warn('Application started at port : ', PORT);
});
