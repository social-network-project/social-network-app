import { createServer, Model } from "miragejs";
import { v4 as uuid } from "uuid";

createServer({
  models: {
    users: Model,
    interests: Model,
  },
  seeds(server) {
      //users
    server.create("user", {
      id: uuid(),
      username: "asmaa-unique-name",
      displayName: "asmaa",
      email: "zaidane@gmail.com",
      password: "123",
    });
    server.create("user", {
        id: uuid(),
        username: "unique-name",
        displayName: "test",
        email: "test@gmail.com",
        password: "123",
      });
      //interests
      server.create("interest", {
        id: uuid(),
        title: "Artistic",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/interests/artistic.jpg",
        users: ['zaidane@gmail.com','test@gmail.com'],
      });
      server.create("interest", {
        id: uuid(),
        title: "Cooking & Baking",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/interests/cooking.jpg",
        users: ['zaidane@gmail.com','test@gmail.com'],
      });
      server.create("interest", {
        id: uuid(),
        title: "Foreign languages",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/interests/foreign-languages.jpg",
        users: ['test@gmail.com'],
      });
      server.create("interest", {
        id: uuid(),
        title: "Gaming",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/interests/gaming.jpg",
        users: ['zaidane@gmail.com','test@gmail.com'],
      });
      server.create("interest", {
        id: uuid(),
        title: "Outdoor activities",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/interests/outdoor-activities.jpg",
        users: [],
      });
      server.create("interest", {
        id: uuid(),
        title: "Travel",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/interests/travel.jpg",
        users: ['zaidane@gmail.com'],
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
    //interests
    this.namespace = "interests";
    this.get("/", (schema) => {
      return schema.db.interests;
    });
  },
});
