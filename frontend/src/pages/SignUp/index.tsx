import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import axios from 'axios';

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
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('/iller.json')
      .then((response) => response.json())
      .then((data) => setCities(data));
  }, []);

  const [isKvkkOpen, setIsKvkkOpen] = React.useState(false);
  const [isGonullulukOpen, setIsGonullulukOpen] = React.useState(false);
  const [kvkkChecked, setKvkkChecked] = React.useState(false);
  const [gonullulukChecked, setGonullulukChecked] = React.useState(false);
  
  const [errors, setErrors] = React.useState<{ [key: string]: string | string[] }>({});
  const [loading, setLoading] = React.useState(false);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    if (!kvkkChecked || !gonullulukChecked) {
      setErrors({ terms: 'Lütfen gerekli tüm onayları işaretleyin.' });
      setLoading(false);
      return;
    }
  
    const data = new FormData(event.currentTarget);
  
    const payload = {
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      tc_kimlik_no: data.get('tcKimlikNo'),
      phone_number: data.get('phone'),
      city: data.get('city'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirm: data.get('passwordConfirm'),
    };
  
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register/', payload);
      navigate('/signin', { state: { message: 'Kaydınız başarıyla oluşturuldu. Lütfen giriş yapın.' } });
    } catch (error: any) {
      if (error.response?.data && typeof error.response.data === 'object') {
        const backendErrors = error.response.data;
        const newErrors: { [key: string]: string } = {};
        for (const key in backendErrors) {
            newErrors[key] = Array.isArray(backendErrors[key]) ? backendErrors[key][0] : backendErrors[key];
        }
        setErrors(newErrors);
      } else {
        setErrors({ form: 'Bilinmeyen bir hata oluştu.'});
      }
    } finally {
      setLoading(false);
    }
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
                    error={!!errors.first_name}
                    helperText={errors.first_name}
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
                    error={!!errors.last_name}
                    helperText={errors.last_name}
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
                    error={!!errors.tc_kimlik_no}
                    helperText={errors.tc_kimlik_no}
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
                    error={!!errors.phone_number}
                    helperText={errors.phone_number}
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
                error={!!errors.email}
                helperText={errors.email}
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
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Şifreyi Doğrula</FormLabel>
              <TextField
                required
                fullWidth
                name="passwordConfirm"
                placeholder="••••••"
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
                variant="outlined"
                error={!!errors.password_confirm}
                helperText={errors.password_confirm}
              />
            </FormControl>
            <FormControl
              required
              error={!!errors.terms}
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
              {errors.terms && (
                <FormHelperText>
                  {errors.terms}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<Diversity1Icon />}
              disabled={loading}
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
