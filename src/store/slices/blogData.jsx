import { createSlice } from "@reduxjs/toolkit";

const storedBlogData = JSON.parse(localStorage.getItem('BlogData'));

const userHasBlogVerificationData = JSON.parse(localStorage.getItem('userHasBlogVerification'));


const initialState = {
    blogs: storedBlogData || [],
    userHasBlogVerification: userHasBlogVerificationData,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState, 
  reducers: {
    addBlog: (state, action) => {
      const { title, name, content, imageUrl, userId, userAvatar} = action.payload;
      const newBlogId = Math.round(Math.random() * 99999);
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); 
      const day = ('0' + currentDate.getDate()).slice(-2);

      const formattedDate = `${year}-${month}-${day}`;
      const newBlog = { Like:[] ,id: newBlogId, name ,title, content, imageUrl, userId, userAvatar, createdAt: formattedDate };
      const updatedBlogs = [...state.blogs, newBlog];

      state.blogs = updatedBlogs;
      localStorage.setItem('BlogData', JSON.stringify(updatedBlogs));
    },
    
    clearOneBlogData: (state, action) => {
      const { id } = action.payload;

      const updatedBlogs = state.blogs.filter(blog => blog.id !== id);
      localStorage.setItem('BlogData', JSON.stringify(updatedBlogs));
      state.blogs = updatedBlogs;
    },

    IncreaseLike: (state, action) => {
      const { id, userId } = action.payload;
      const index = state.blogs.findIndex(blog => blog.id === id);
    
      if (index !== -1) {
        const likedByUser = state.blogs[index].Like.includes(userId);
        if (!likedByUser) {
          state.blogs[index].Like.push(userId);
          localStorage.setItem('BlogData', JSON.stringify(state.blogs));
        }
        if (likedByUser) {
          const userIndex = state.blogs[index].Like.indexOf(userId);
          if (userIndex !== -1) {
            state.blogs[index].Like.splice(userIndex, 1);
            localStorage.setItem('BlogData', JSON.stringify(state.blogs));
          }
        }
      }
    },
    
    

    // editBlogData: (state, action) => {
    //   const { id, title, name, content, imageUrl, userId } = action.payload;
    
    //   const index = state.blogs.findIndex(blog => blog.id === id);
    
    //   if (index !== -1) {
    //     const updatedBlogContent = { name, title, body: content, imageUrl, userId };
    //     const updatedBlog = { id, content: JSON.stringify(updatedBlogContent) };
    //     state.blogs[index] = updatedBlog;
    
    //     localStorage.setItem('BlogData', JSON.stringify(state.blogs));
    //   }
    // },

    editBlogData: (state, action) => {
      const { id, title, name, content, imageUrl, userId } = action.payload;
    
      const index = state.blogs.findIndex(blog => blog.id === id);
    
      if (index !== -1) {
      const existingBlog = state.blogs[index];
      const existingBlogContent = JSON.parse(existingBlog.content);
    

      const updatedBlogContent = {
        ...existingBlogContent,
        name: name || existingBlogContent.name,
        title: title || existingBlogContent.title,
        body: content || existingBlogContent.body,
        imageUrl: imageUrl || existingBlogContent.imageUrl,
        userId: userId || existingBlogContent.userId,
      };
    
     
      const updatedBlog = { 
        ...existingBlog, 
        content: JSON.stringify(updatedBlogContent), 
      };
    
      state.blogs[index] = updatedBlog;
    
      localStorage.setItem('BlogData', JSON.stringify(state.blogs));
      }
  },
    
    BlogVerificationByUserId: (state, action) => {
      const { userId } = action.payload;
      const userHasBlog = state.blogs.some(blog => {
        const blogContent = JSON.parse(blog.content);
        return blogContent.userId === userId;
      });
      localStorage.setItem('userHasBlogVerification', JSON.stringify(userHasBlog))
      state.userHasBlogVerification = userHasBlog;
    },

    CreateComment: (state, action) => {
      const { id, name, body, imageUrl, userId, createdAt } = action.payload;
      const index = state.blogs.findIndex(blog => blog.id === id);
      
      if (index !== -1) {
        const newComment = { id: Math.round(Math.random() * 99999), name, body, imageUrl, userId, createdAt };
        
        const existingComments = state.blogs[index].comments || [];
        
        const updatedComments = [...existingComments, newComment];
        
        state.blogs[index] = {
          ...state.blogs[index],
          comments: updatedComments,
        };
        
        localStorage.setItem('BlogData', JSON.stringify(state.blogs));
      }
    },

    editComment: (state, action) => {
      const { blogId, commentId, name, body, imageUrl, userId } = action.payload;
      
      const blogIndex = state.blogs.findIndex(blog => blog.id === blogId);
      
      if (blogIndex !== -1) {
        const commentIndex = state.blogs[blogIndex].comments.findIndex(comment => comment.id === commentId);
        
        if (commentIndex !== -1) {
          state.blogs[blogIndex].comments[commentIndex] = {
            ...state.blogs[blogIndex].comments[commentIndex],
            name: name || state.blogs[blogIndex].comments[commentIndex].name,
            body: body || state.blogs[blogIndex].comments[commentIndex].body,
            imageUrl: imageUrl || state.blogs[blogIndex].comments[commentIndex].imageUrl,
            userId: userId || state.blogs[blogIndex].comments[commentIndex].userId,
          };
    
          localStorage.setItem('BlogData', JSON.stringify(state.blogs));
        }
      }
    },
    
    deleteComment: (state, action) => {
      const { blogId, commentId } = action.payload;
      
      const blogIndex = state.blogs.findIndex(blog => blog.id === blogId);
      
      if (blogIndex !== -1) {
        const commentIndex = state.blogs[blogIndex].comments.findIndex(comment => comment.id === commentId);
        
        if (commentIndex !== -1) {
          state.blogs[blogIndex].comments.splice(commentIndex, 1);
    
          localStorage.setItem('BlogData', JSON.stringify(state.blogs));
        }
      }
    },
    
    increaseCommentLike: (state, action) => {
      const { blogId, commentId, userId } = action.payload;
      const blogIndex = state.blogs.findIndex(blog => blog.id === blogId);
    
      if (blogIndex !== -1) {
        const commentIndex = state.blogs[blogIndex].comments.findIndex(comment => comment.id === commentId);
    
        if (commentIndex !== -1) {
          if (!state.blogs[blogIndex].comments[commentIndex].Like) {
            state.blogs[blogIndex].comments[commentIndex].Like = [];
          }
    
          const likedByUser = state.blogs[blogIndex].comments[commentIndex].Like.includes(userId);
          if (!likedByUser) {
            state.blogs[blogIndex].comments[commentIndex].Like.push(userId);
            localStorage.setItem('BlogData', JSON.stringify(state.blogs));
          } else {
            const userIndex = state.blogs[blogIndex].comments[commentIndex].Like.indexOf(userId);
            if (userIndex !== -1) {
              state.blogs[blogIndex].comments[commentIndex].Like.splice(userIndex, 1);
              localStorage.setItem('BlogData', JSON.stringify(state.blogs));
            }
          }
        }
      }
    },
    
  }
});

export const { 
  addBlog, 
  clearOneBlogData, 
  editBlogData, 
  BlogVerificationByUserId, 
  IncreaseLike, 
  ClickBlog,
  CreateComment,
  editComment,
  deleteComment,
  increaseCommentLike
} = blogSlice.actions;

export default blogSlice.reducer;
