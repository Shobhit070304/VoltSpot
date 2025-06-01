import app from "./src/index.js";
import http from "http";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
