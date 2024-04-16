import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const AddBlogSchema = Yup.object().shape({
  newBlogTitle: Yup.string()
    .required('Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  newBlogImage: Yup.string()
    .url('Invalid URL format')
    .required('Image URL is required'),
  newBlogContent: Yup.string()
    .required('Content is required')
});