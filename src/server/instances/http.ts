import { createServer } from "http";
import { app } from "./app";

export const http = createServer(app);

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
