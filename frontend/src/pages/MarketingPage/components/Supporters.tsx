import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const logos = [
  {
    name: 'TÜBİTAK',
    url: 'https://tubitak.gov.tr/sites/default/files/2025-02/TUBITAK-Logo_0.svg',
    link: 'https://tubitak.gov.tr/tr',
  },
  {
    name: 'Kütahya Dumlupınar Üniversitesi',
    url: 'https://www.dpu.edu.tr/app/views/panel/ckfinder/userfiles/1/images/logolar/dpu-logo.png',
    link: 'https://www.dpu.edu.tr/',
  },
];

export default function Supporters() {
  const theme = useTheme();

  return (
    <Container
      id="supporters"
      sx={{
        py: { xs: 8, sm: 12 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '80%' },
          textAlign: 'center',
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Destekçilerimiz
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>
          Projemizin gelişimine katkıda bulunan değerli kurumlar.
        </Typography>
      </Box>
      <Grid container spacing={5} justifyContent="center">
        {logos.map((logo) => (
          <Grid
            size={{ xs: 12, sm: 4, md: 4 }}
            key={logo.name}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 120,
                width: 280,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box
                component="img"
                src={logo.url}
                alt={logo.name}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  filter:
                    theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 