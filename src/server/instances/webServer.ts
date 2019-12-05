import { createServer } from "http";
import { expressApp } from "./expressApp";
import https from "https";

export const webServer = createServer(expressApp);

const port = process.env.PORT || 3000;

webServer.listen(port, (): void => {
  console.log(`Game is now locally available at http://localhost:${port}`);

  https.get({ hostname: "api.ipify.org" }, (response): void => {
    let publicIp = "";
    response.on("data", (chunk): void => {
      publicIp += chunk;
    });
    response.on("end", (): void => {
      console.log(`And publicly available at http://${publicIp}:${port}`);
    });
  });
});
