import { createServer } from "node:http";
import { sendResponse } from "./utils";
import { orderRoute } from "./routes/order.route";
import "./service/order.service";
import type { Req } from "./types";

const server = createServer(async (req, res) => {
  const url = req.url ?? "/";

  if (url == "/") {
    sendResponse(res, { message: "welcpme to our fodi server" }, 200);
    return;
  }

  if (url.startsWith("/order")) {
    await orderRoute(req as Req, res);
    return;
  }

  sendResponse(res, { message: "Not Found" }, 404);
});

server.listen(3000, () => {
  console.log("Server running at port 3000");
});
