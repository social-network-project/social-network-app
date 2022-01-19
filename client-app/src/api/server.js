import { createServer, Model } from "miragejs";

createServer({
  models: {
    users: Model,
    interests: Model,
    posts: Model,
  },
  seeds(server) {
    //users
    server.create("user", {
      id: "user1",
      username: "asmaa-unique-name",
      displayName: "asmaa",
      email: "test",
      password: "123",
      userImage: "/images/user.png",
      bio: "",
    });
    server.create("user", {
      id: "user2",
      username: "therese-unique-name",
      displayName: "therese",
      email: "test@gmail.com",
      password: "123",
      userImage: "/images/user.png",
      bio: "",
    });
    server.create("user", {
      id: "user3",
      username: "sigridur-unique-name",
      displayName: "sigridur",
      email: "omakligt@gmail.com",
      password: "Magnusson13",
      userImage: "/images/user.png",
      bio: "",
    });
    //interests
    server.create("interest", {
      id: "group1",
      title: "Artistic",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "artistic.jpg",
      users: ["user1", "user2", "user3"],
      date: "10/01/2022",
    });
    server.create("interest", {
      id: "group2",
      title: "Cooking & Baking",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "baking.jpg",
      users: ["user1", "user2"],
      date: "01/01/2022",
    });
    server.create("interest", {
      id: "group3",
      title: "Foreign languages",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "languages.jpg",
      users: ["user2"],
      date: "03/01/2022",
    });
    server.create("interest", {
      id: "group4",
      title: "Gaming",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "gaming.jpg",
      users: ["user1", "user2"],
      date: "01/01/2022",
    });
    server.create("interest", {
      id: "group5",
      title: "Outdoor activities",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "outdoor.jpg",
      users: [],
      date: "10/01/2022",
    });
    server.create("interest", {
      id: "group6",
      title: "Travel",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "travel.jpg",
      users: ["user1"],
      date: "01/01/2022",
    });
    server.create("post", {
      id: "post1",
      idUser: "user1",
      idGroup: "group1",
      image: "/images/interests/posts/post1-artistic.jpg",
      title: "One of my last paintings",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.sit amet, consectetur adipiscing elit, sed do eiu",
      likes: 1,
      tags: "",
      comments: [
        { id: "comment1", userId: "user2", comment: "How artistic!" },
        { id: "comment2", userId: "user1", comment: "Thanks so much !" },
        { id: "comment3", userId: "user3", comment: "Great !" },
      ],
    });
    server.create("post", {
      id: "post2",
      idUser: "user2",
      idGroup: "group1",
      image: "/images/interests/posts/post2-artistic.jpg",
      title: "Painting",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempsit amet, consectetur adipiscing elit, sed do eiusit amet, consectetur adipiscing elit, sed do eiuor incididunt ut labore.",
      likes: 2,
      tags: "",
      comments: [
        { id: "comment4", userId: "user1", comment: "Good job !" },
        { id: "comment5", userId: "user3", comment: "Awesome !" },
      ],
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
    this.get("/:id", (schema, request) => {
      let id = request.params.id;
      return schema.db.interests.find(id);
    });
    this.put("/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      return schema.db.interests.update(request.params.id, newAttrs);
    });
    //posts
    this.namespace = "posts";
    this.get("/", (schema) => {
      return schema.db.posts;
    });
    this.post("/", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      return schema.db.posts.insert(attrs);
    });
    this.del("/:id", (schema, request) => {
      let id = request.params.id;
      schema.db.posts.remove(id);
      return schema.db.posts;
    });
    this.get("/:idGroup", (schema, request) => {
      let id = request.params.idGroup;
      return schema.db.posts.where({ idGroup: id });
    });
    this.put("/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      return schema.db.posts.update(request.params.id, newAttrs);
    });
  },
});
