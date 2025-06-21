import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '@/theme/shared-theme/AppTheme';
import AppAppBar from '@/pages/MarketingPage/components/AppAppBar';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KvkkModal from './components/KvkkModal';
import GonullulukModal from './components/GonullulukModal';
import FormGroup from '@mui/material/FormGroup';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(15),
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

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [cities, setCities] = React.useState<{ id: number; name: string }[]>([]);

  React.useEffect(() => {
    fetch('/iller.json')
      .then((response) => response.json())
      .then((data) => setCities(data));
  }, []);

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [tcKimlikNoError, setTcKimlikNoError] = React.useState(false);
  const [tcKimlikNoErrorMessage, setTcKimlikNoErrorMessage] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');
  const [isKvkkOpen, setIsKvkkOpen] = React.useState(false);
  const [isGonullulukOpen, setIsGonullulukOpen] = React.useState(false);
  const [kvkkChecked, setKvkkChecked] = React.useState(false);
  const [gonullulukChecked, setGonullulukChecked] = React.useState(false);
  const [termsError, setTermsError] = React.useState(false);

  const handleKvkkOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsKvkkOpen(true);
  };

  const handleKvkkClose = () => {
    setIsKvkkOpen(false);
  };

  const handleGonullulukOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsGonullulukOpen(true);
  };

  const handleGonullulukClose = () => {
    setIsGonullulukOpen(false);
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('firstName') as HTMLInputElement;
    const tcKimlikNo = document.getElementById('tcKimlikNo') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Şifre en az 6 karakter uzunluğunda olmalıdır.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Ad alanı zorunludur.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    const tcRegex = /^[0-9]{11}$/;
    if (!tcKimlikNo.value || !tcRegex.test(tcKimlikNo.value)) {
      setTcKimlikNoError(true);
      setTcKimlikNoErrorMessage('T.C. Kimlik Numarası 11 rakamdan oluşmalıdır.');
      isValid = false;
    } else {
      setTcKimlikNoError(false);
      setTcKimlikNoErrorMessage('');
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.value || !phoneRegex.test(phone.value.replace(/\s/g, ''))) {
      setPhoneError(true);
      setPhoneErrorMessage('Telefon numarası 10 rakamdan oluşmalıdır (örn: 5551234567).');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }

    if (!kvkkChecked || !gonullulukChecked) {
      setTermsError(true);
      isValid = false;
    } else {
      setTermsError(false);
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      tcKimlikNo: data.get('tcKimlikNo'),
      phone: data.get('phone'),
      city: data.get('city'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Gönüllü Ol
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">Ad</FormLabel>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    placeholder="Adınız"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">Soyad</FormLabel>
                  <TextField
                    autoComplete="family-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    placeholder="Soyadınız"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="tcKimlikNo">T.C. Kimlik Numarası</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="tcKimlikNo"
                    name="tcKimlikNo"
                    placeholder="T.C. Kimlik Numaranız"
                    error={tcKimlikNoError}
                    helperText={tcKimlikNoErrorMessage}
                    color={tcKimlikNoError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="phone">Telefon Numarası</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="5551234567"
                    error={phoneError}
                    helperText={phoneErrorMessage}
                    color={phoneError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <FormLabel id="city-select-label">Yaşadığınız Şehir</FormLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                name="city"
                defaultValue=""
                required
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">E-posta</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="ornek@eposta.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Şifre</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Şifreyi Doğrula</FormLabel>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                variant="outlined"
              />
            </FormControl>
            <FormControl
              required
              error={termsError}
              component="fieldset"
              variant="standard"
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={kvkkChecked}
                      onChange={(e) => setKvkkChecked(e.target.checked)}
                      name="kvkk"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      <Link
                        component="button"
                        type="button"
                        onClick={handleKvkkOpen}
                        sx={{ verticalAlign: 'baseline' }}
                      >
                        KVKK Onay Metni
                      </Link>
                      'ni okudum, anladım ve kabul ediyorum.
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gonullulukChecked}
                      onChange={(e) => setGonullulukChecked(e.target.checked)}
                      name="gonulluluk"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      <Link
                        component="button"
                        type="button"
                        onClick={handleGonullulukOpen}
                        sx={{ verticalAlign: 'baseline' }}
                      >
                        Gönüllülük Esasları
                      </Link>
                      'nı okudum ve kabul ediyorum.
                    </Typography>
                  }
                />
              </FormGroup>
              {termsError && (
                <FormHelperText>
                  Devam etmek için her iki kutucuğu da işaretlemelisiniz.
                </FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<Diversity1Icon />}
            >
              Gönüllü Ol
            </Button>
            <KvkkModal open={isKvkkOpen} handleClose={handleKvkkClose} />
            <GonullulukModal open={isGonullulukOpen} handleClose={handleGonullulukClose} />
            <Typography sx={{ textAlign: 'center' }}>
              Zaten bir hesabın var mı?{' '}
              <Link
                component={RouterLink}
                to="/signin"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Giriş yap
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
