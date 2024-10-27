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
    getUsersAllBlogByUserId: (userId: string) => `/blogs/user/${userId}`,
    getAllBlogs: `/blogs`,
    getAllMyBlogs: `/blogs/my-blogs`,
  },
  user: {
    getProfileByUserName: (username: string) => `/user/profile/${username}`,
  },
};

export default apiEndpoints;
