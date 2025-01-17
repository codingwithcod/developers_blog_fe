const apiEndpoints = {
  auth: {
    signup: "/auth/signup",
    signin: "/auth/signin",
    oAuth: "/auth/oauth-signin",
  },
  blogs: {
    addBlog: `/blogs/add`,
    updateBlog: (blogId: string) => `/blogs/update/${blogId}`,
    likeUnlikeBlog: (blogId: string) => `/blogs/like/${blogId}`,
    getBlogById: (blogId: string) => `/blogs/${blogId}`,
    getBlogBySlug: (slug: string) => `/blogs/slug/${slug}`,
    getUsersAllBlogByUserId: (userId: string) => `/blogs/user/${userId}`,
    getAllBlogs: `/blogs`,
    getAllMyBlogs: `/blogs/my-blogs`,
    getAllCommentsForABlog: (blogId: string) => `/blogs/comment/${blogId}`,
    commentToABlog: `/blogs/comment`,
    requestThumbnailUpload: (fileName: string) => `/blogs/upload/thumbnail?fileName=${fileName}`,
    getUsersLikedBlogs: `/blogs/like`,
    getUsersReadLaterBlogs: `/blogs/read-later`,
    addBlogToReadLater: (blogId: string) => `/blogs/read-later/add/${blogId}`,
    removeBlogFromReadLater: (blogId: string) => `/blogs/read-later/remove/${blogId}`,
  },
  user: {
    getProfileByUserName: (username: string) => `/user/profile/${username}`,
    followUser: (followingId: string) => `/user/follow/${followingId}`,
    unFollowUser: (followingId: string) => `/user/unfollow/${followingId}`,
    updateUserProfile: `user/profile/update`,
    uploadProfileImage: `/user/profile/upload/profile-picture`,
  },
};

export default apiEndpoints;
