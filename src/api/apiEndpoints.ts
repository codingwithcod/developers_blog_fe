const apiEndpoints = {
  auth: {
    signup: "/auth/signup",
    signin: "/auth/signin",
    oAuth: "/auth/oauth-signin",
  },
  blogs: {
    addBlog: `/blogs/add`,
    updateBlog: (blogId: string) => `/blogs/update/${blogId}`,
    getBlogById: (blogId: string) => `/blogs/${blogId}`,
    getBlogBySlug: (slug: string) => `/blogs/slug/${slug}`,
    getAllBlogs: `/blogs`,
    getAllMyBlogs: `/blogs/my-blogs`,
  },
};

export default apiEndpoints;
