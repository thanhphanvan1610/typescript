import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import 'dotenv/config';
import env from './utils/validateEnv';
import connect from './database/connect';
import noteRoutes from './routes/note.routes';

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use('/api/v1/notes', noteRoutes);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "An unknown error occurred!";
    let statusCode = 500;

    if (isHttpError(error)) {
        // Use type assertion to tell TypeScript that 'error' is an HttpError
        const httpError = error as createHttpError.HttpError;
        statusCode = httpError.status;
        errorMessage = httpError.message;
    }

    res.status(statusCode).json({ message: errorMessage });
});

app.listen(PORT, async () => {
    await connect();
    console.log(`Server running on port ${PORT}`);
});
