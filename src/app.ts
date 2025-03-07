import app from './server'

const PORT: string = process.env.PORT ?? '3000'

app.listen(PORT, function (): void {
    console.log("Server is running on port " + PORT);
});