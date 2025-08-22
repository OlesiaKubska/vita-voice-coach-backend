module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts",
      handler: "post.find",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/posts/:id",
      handler: "post.findOne",
      config: { auth: false },
    },
  ],
};
