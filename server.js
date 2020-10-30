const http = require("http");
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  removeBook,
} = require("./controllers/bookController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/books" && req.method === "GET") {
    getBooks(req, res);
  } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getBook(req, res, id);
  } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateBook(req, res, id);
  } else if (
    req.url.match(/\/api\/books\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    removeBook(req, res, id);
  } else if (req.url === "/api/books" && req.method === "POST") {
    createBook(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ msg: "404" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log("server!"));
