import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import TurkeyMap from '../../Dashboard/components/TurkeyMap';
import 'leaflet/dist/leaflet.css';

const mapBoxStyle = (theme: Theme) => ({
  mt: { xs: 8, sm: 10 },
  height: { xs: 300, sm: 500 },
  width: '100%',
  borderRadius: '10px',
  outline: '1px solid',
  outlineColor:
    theme.palette.mode === 'light'
      ? alpha('#BFCCD9', 0.5)
      : alpha('#999', 0.1),
  boxShadow:
    theme.palette.mode === 'light'
      ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
      : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
  overflow: 'hidden',
});

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${import.meta.env.VITE_TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${import.meta.env.VITE_TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg')`,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              textAlign: 'center',
              color: 'white',
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            Acil Yardım ve İhtiyaç Koordinasyon Ağı
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.9)',
              width: { sm: '100%', md: '80%' },
              textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
            }}
          >
            İhtiyaçlarınıza özel olarak tasarlanmış yüksek kaliteli çözümler sunan
            son teknoloji gösterge panelimizi keşfedin. Üst düzey özellikler ve
            hizmetlerle deneyiminizi bir üst seviyeye taşıyın.
          </Typography>
        </Stack>
        <Box id="map" sx={mapBoxStyle}>
          <TurkeyMap />
        </Box>
      </Container>
    </Box>
  );
}
