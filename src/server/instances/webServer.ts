import { createServer } from "http";
import { expressApp } from "./expressApp";

export const webServer = createServer(expressApp);

const port = process.env.PORT || 3000;

webServer.listen(port, (): void => {
  console.log(`Server started on port ${port}`);
});
