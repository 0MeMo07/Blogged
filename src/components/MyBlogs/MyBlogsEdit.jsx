import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { editBlogData } from '../../store/slices/blogData';
import { Modal, Grid, Card, Container, CardActionArea, CardContent, TextField, IconButton } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BlogPreviewCard from './MyBlogsEditCard'
import { trimText } from '../../helpers/MaxLenght';

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EditContainer = styled.div`
    background-color: white;
    padding: 20px;
    max-width: 800px;
    width: 100%;
    border-radius: 8px;
`;

const CenteredIconButton = styled(IconButton)`
    display: flex;
`;

const validationSchema = Yup.object().shape({
    editTitle: Yup.string()
        .max(50, 'Max 50 characters allowed')
        .required('Title is required'),
    editContent: Yup.string()
        .max(5000, 'Max 5000 characters allowed')
        .required('Content is required'),
    editImageUrl: Yup.string()
        .url('Invalid URL format')
        .required('Image URL is required'),
});

const MyBlogsEdit = ({ open, handleClose, editId, title, content, imageUrl, userId, name, userAvatar, Like, createdAt}) => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        dispatch(editBlogData({
            id: editId,
            Like: Like,
            createdAt: createdAt,
            title: values.editTitle,
            name: name,
            userId: userId,
            imageUrl: values.editImageUrl,
            content: values.editContent,
            userAvatar: userAvatar
        }));
        handleClose();
        resetForm();
    };

    const MAX_TITLE_LENGTH = 12;
    const MAX_CONTENT_LENGTH = 20;

    const trimmedContent = trimText(content, MAX_CONTENT_LENGTH);
    const trimmedTitle = trimText(title, MAX_TITLE_LENGTH);

    return (
        <StyledModal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-modal"
            aria-describedby="edit-modal-description"
        >
            <EditContainer onClick={(e) => e.stopPropagation()}>
                <Formik
                    initialValues={{
                        editTitle: title,
                        editContent: content,
                        editImageUrl: imageUrl,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    
                    {({ values,errors, touched }) => (
                        <>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                        <Card sx={{ display: 'flex', borderRadius: "0", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className='BlogCart'>
                                            <CardContent sx={{ flex: 1 }}>
                                            <BlogPreviewCard trimmedTitle={trimmedTitle} trimmedContent={trimmedContent} editImageUrl={values.editImageUrl} />
                                                <Field
                                                    as={TextField}
                                                    name="editTitle"
                                                    label="Title"
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    error={touched.editTitle && !!errors.editTitle}
                                                    helperText={touched.editTitle && errors.editTitle}
                                                />
                                                <Field
                                                    as={TextField}
                                                    name="editContent"
                                                    label="Content"
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    multiline
                                                    rows={4}
                                                    error={touched.editContent && !!errors.editContent}
                                                    helperText={touched.editContent && errors.editContent}
                                                />
                                                <Field
                                                    as={TextField}
                                                    name="editImageUrl"
                                                    label="Image URL"
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    error={touched.editImageUrl && !!errors.editImageUrl}
                                                    helperText={touched.editImageUrl && errors.editImageUrl}
                                                />
                                            </CardContent>
                                        </Card>
                                </Grid>
                            </Grid>
                            <CenteredIconButton
                                aria-label="edit"
                                sx={{ display: "flex", justifyContent: "center", color: "blue", alignItems: "center" }}
                                type="submit"
                                size="large"
                            >
                                <MdEdit />
                            </CenteredIconButton>
                        </Form>
                        </>
                    )}
                </Formik>
            </EditContainer>
        </StyledModal>
    );
};

export default MyBlogsEdit;
