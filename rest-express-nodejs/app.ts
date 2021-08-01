import express from "express";

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
	await res.send('Hello World');
});

app.listen(PORT, async () => {
	await console.log(`Running on port ${PORT}`);
});
