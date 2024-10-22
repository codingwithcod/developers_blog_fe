const apiEndpoints = {
  auth: {
    signup: "/auth/signup",
    signin: "/auth/signin",
    oAuth: "/auth/oauth-signin",
  },
  blogs: {
    addBlog: `/blogs/add`,
    updateBlog: (blogId: string) => `/blogs/update/${blogId}`,
    getBlog: (blogId: string) => `/blogs/${blogId}`,
    getAllBlogs: `/blogs`,
  },
};

export default apiEndpoints;
