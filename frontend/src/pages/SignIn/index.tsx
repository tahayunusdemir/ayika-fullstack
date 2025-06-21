import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './components/ForgotPassword';
import AppTheme from '@/theme/shared-theme/AppTheme';
import AppAppBar from '@/pages/MarketingPage/components/AppAppBar';
import Grid from '@mui/material/Grid';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [tcKimlikNoError, setTcKimlikNoError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [tcKimlikNoErrorMessage, setTcKimlikNoErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    tcKimlikNo: '',
    password: '',
    form: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    setLoading(true);
    setErrors({
      tcKimlikNo: '',
      password: '',
      form: '',
    });

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    const data = new FormData(event.currentTarget);
    const tcKimlikNo = data.get('tcKimlikNo');
    const password = data.get('password');

    try {
      // 1. Token al
      const tokenResponse = await axios.post('http://127.0.0.1:8000/api/auth/token/', {
        tc_kimlik_no: tcKimlikNo,
        password,
      });
      
      localStorage.setItem('accessToken', tokenResponse.data.access);
      localStorage.setItem('refreshToken', tokenResponse.data.refresh);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.access}`;

      const userResponse = await axios.get('http://127.0.0.1:8000/api/auth/me/');
      
      login(userResponse.data);

      navigate('/dashboard');

    } catch (error: any) {
      console.error('Giriş başarısız:', error.response?.data);
      if (error.response?.data?.detail) {
        setErrors((prev) => ({...prev, form: error.response.data.detail}));
      } else {
        setErrors((prev) => ({...prev, form: 'Giriş sırasında bir hata oluştu.'}));
      }
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    const tcKimlikNo = document.getElementById('tcKimlikNo') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!tcKimlikNo.value || !/^\d{11}$/.test(tcKimlikNo.value)) {
      setTcKimlikNoError(true);
      setTcKimlikNoErrorMessage('Lütfen 11 haneli T.C. Kimlik Numaranızı girin.');
      isValid = false;
    } else {
      setTcKimlikNoError(false);
      setTcKimlikNoErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Şifre en az 6 karakter uzunluğunda olmalıdır.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Giriş yap
          </Typography>
          {location.state?.message && (
            <Alert severity="success">{location.state.message}</Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="tcKimlikNo">T.C. Kimlik Numarası</FormLabel>
              <TextField
                error={tcKimlikNoError}
                helperText={tcKimlikNoErrorMessage}
                id="tcKimlikNo"
                type="text"
                name="tcKimlikNo"
                placeholder="T.C. Kimlik Numaranız"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={tcKimlikNoError ? 'error' : 'primary'}
                inputProps={{
                  maxLength: 11,
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Şifre</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Beni Hatırla"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Giriş yap
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Link
                href="#"
                variant="body2"
                onClick={(event) => {
                  event.preventDefault();
                  handleClickOpen();
                }}
              >
                Şifreni mi unuttun?
              </Link>
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                Hesabın yok mu? Gönüllü Ol
                <Diversity1Icon fontSize="small" />
              </Link>
            </Box>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
