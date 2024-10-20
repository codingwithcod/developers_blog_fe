const apiEndpoints = {
  blogs: {
    addBlog: `/blogs/add`,
    updateBlog: (blogId: string) => `/blogs/update/${blogId}`,
    getBlog: (blogId: string) => `/blogs/${blogId}`,
    getAllBlog: `/blogs`,
  },
};

export default apiEndpoints;
