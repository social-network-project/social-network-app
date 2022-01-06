import { createServer, Model } from "miragejs";
import { v4 as uuid } from "uuid";

createServer({
  models: {
    users: Model,
  },
  seeds(server) {
    server.create("user", {
      id: uuid(),
      username: "asmaa-unique-name",
      displayName: "asmaa",
      email: "zaidane.asmaa@gmail.com",
      password: "123",
    });
    server.create("user", {
        id: uuid(),
        username: "unique-name",
        displayName: "test",
        email: "test@gmail.com",
        password: "123",
      });
  },
  routes() {
    this.namespace = "users";
    this.get("/", (schema) => {
      return schema.db.users;
    });
    this.get("/:id", (schema, request) => {
      let id = request.params.id;
      return schema.db.users.find(id);
    });
    this.post("/", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      return schema.db.users.insert(attrs);
    });
    this.put("/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      return schema.db.users.update(request.params.id, newAttrs);
    });
    this.del("/:id", (schema, request) => {
      let id = request.params.id;
      schema.db.users.remove(id);
      return schema.db.users;
    });
  },
});
