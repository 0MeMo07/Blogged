import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Logo from '../assets/favicon.ico';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useFetchUsersQuery, useAuthTokenVerificationMutation } from '../store';
import { useDispatch } from 'react-redux';
import { Authorization, rememberMeUser } from '../store/slices/userData';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/validationSchemas'; 
import axios from 'axios';

const defaultTheme = createTheme();

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [ LoginFail, setLoginFail ] = useState(false)
  const { data: usersData, error: usersError, isLoading: usersLoading } = useFetchUsersQuery();
  const [AuthTokenVerification] = useAuthTokenVerificationMutation({
    fixedCacheKey: 'login'
  });
  const initialValues = {
    username: '',
    password: '',
  };

  // const response = await axios.post('https://dummyjson.com/auth/login', {
  //     username: values.username,
  //     password: values.password
  // }, {
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // });


  const handleLogin = async (values) => {
    try {
      if (usersData) {
        const user = usersData.users.find(user => user.username === values.username && user.password === values.password);
        if (user) {
          const authTokenResult = await AuthTokenVerification({username: values.username, password: values.password});
          const token = authTokenResult.data.token;
          
          dispatch(Authorization({ token }));
          navigate('/');
          window.location.reload();
          if (rememberMe){
            dispatch(rememberMeUser({username: values.username, password: values.password}))
          }
        } else {
          setLoginFail(true);
          setTimeout(() => {
            setLoginFail(false);
          }, 5000); 
        }
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop:"50px"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <img src={Logo} alt="" style={{ width: "100%" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
            log in
            </Typography>
            {LoginFail ? (
              <Typography variant="body2" color="red" align="center" style={{ marginTop: '1rem' }}>
                Your username or password is incorrect
              </Typography>
            ): null}
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  handleLogin(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form sx={{ mt: 10 }}>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                  <ErrorMessage name="username" component="p" style={{ color: 'red', display:'contents' }} />

                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage name="password" component="p" style={{ color: 'red',display:'contents' }} />

                  <FormControlLabel
                    style={{display:'flex'}} 
                    control={<Checkbox value={rememberMe} color="primary" onChange={(e) => setRememberMe(e.target.checked)} />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting || usersLoading}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            <Box mt={5}>
              <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/0memo07" style={{ textDecoration: "none" }}>
                  MeMo
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;


