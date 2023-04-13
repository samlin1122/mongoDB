const http = require("http");
const Room = require("./models/room");
const { handleError, handleSuccess } = require("./handler");

const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};

const requestListener = async (req, res) => {
  const { url, method } = req;
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  // req.on("end", () => {
  //   console.log(JSON.parse(body));
  // });
  if (url === "/rooms") {
    switch (method) {
      case "GET":
        const rooms = await Room.find();
        handleSuccess(res, { numResults: rooms.length, rooms });

        break;
      case "POST":
        req.on("end", async () => {
          try {
            const { name, price, rating } = JSON.parse(body),
              newRoom = await Room.create({ name, price, rating });
            handleSuccess(res, { rooms: newRoom });
          } catch ({ errors }) {
            handleError(res, errors);
          }
        });
        break;
      case "DELETE":
        const deletedRooms = await Room.deleteMany();
        handleSuccess(res, { rooms: deletedRooms });
        break;
      default:
        handleError(res);
        break;
    }
  } else if (method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else if (url.startsWith("/rooms/")) {
    switch (method) {
      case "DELETE":
        const id = url.split("/").pop(),
          // deletedRoom = await Room.deleteOne({ id });
          deletedRoom = await Room.findByIdAndDelete(id);
        handleSuccess(res, { rooms: deletedRoom });
        break;
      case "PATCH":
        req.on("end", async () => {
          try {
            const data = JSON.parse(body),
              id = url.split("/").pop(),
              patchRoom = await Room.findByIdAndUpdate(id, data);
            // patchRoom = await Room.replaceOne({ id }, data );
            console.log({ patchRoom });
            handleSuccess(res, { rooms: patchRoom });
          } catch ({ errors }) {
            handleError(res, errors);
          }
        });
        break;
    }
  } else {
    handleError(res, null, "Not found", 404);
  }
};

module.exports = http.createServer(requestListener);
