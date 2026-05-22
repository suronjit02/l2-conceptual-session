import { orderService } from "../service/order.service";
import type { Order, Req, Res } from "../types";
import { extractRequestInfo, sendResponse } from "../utils";

export const orderRoute = async (req: Req, res: Res) => {
  const { url, method, params, body } =
    await extractRequestInfo<Omit<Order, "id">>(req);
  const orderId = params?.[1];
  try {
    //   get all order
    if (method === "GET" && !orderId) {
      const order = await orderService.get();

      sendResponse(
        res,
        { message: "Order retrieved successfully", data: order },
        200,
      );
      return;
    }

    //   get by id
    if (method === "GET" && orderId) {
      const order = await orderService.getById(orderId);
      sendResponse(
        res,
        {
          message: order ? "Order retrieved successfully" : "Order Not Found",
          data: order,
          error: order ? false : true,
        },
        order ? 200 : 404,
      );
      return;
    }
    //   get by id
    if (method === "GET" && orderId) {
      const order = await orderService.getById(orderId);
      sendResponse(
        res,
        {
          message: order ? "Order retrieved successfully" : "Order Not Found",
          data: order,
          error: order ? false : true,
        },
        order ? 200 : 404,
      );
      return;
    }

    //   delete
    if (method === "DELETE" && orderId) {
      const deleted = await orderService.delete(orderId);
      sendResponse(
        res,
        {
          message: deleted ? "Order deleted successfully" : "Order Not Found",
          error: deleted ? false : true,
        },
        deleted ? 200 : 404,
      );
      return;
    }

    //   create : post
    if (method === "POST" && !orderId && body) {
      const newOrder = orderService.create(body);
      sendResponse(res, { message: "Order created", data: newOrder }, 201);
      return;
    }

    //   update : put
    if (method === "PUT" && body && orderId) {
      const updated = await orderService.update(orderId, body);
      sendResponse(
        res,
        { message: updated ? "Order updated" : "", data: updated },
        updated ? 201 : 404,
      );
      return;
    }

    sendResponse(res, { message: "Not found" }, 405);
  } catch (error) {
    sendResponse(
      res,
      { message: error instanceof Error ? error.message : "Server Error" },
      500,
    );
  }
};
