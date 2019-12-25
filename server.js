import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started http://localhost:${port}/`);
});
