import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const teamMembers = [
  {
    name: 'Taha Yunus Demir',
    title: 'Bilgisayar Mühendisliği - 4. Sınıf',
    university: 'Kütahya Dumlupınar Üniversitesi',
    image: '/team/taha.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/taha-yunus-demir',
      github: 'https://github.com/tahayunusdemir',
      email: 'mailto:tahayunusdemir@gmail.com',
    },
  },
  {
    name: 'Harun Celen',
    title: 'Bilgisayar Mühendisliği - 4. Sınıf',
    university: 'Kırıkkale Üniversitesi',
    image: '/team/harun.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/harun-celen-566665258',
      github: 'https://github.com/HarunCelen',
      email: 'mailto:haruncelen89@gmail.com',
    },
  },
  {
    name: 'Hamza Erdal',
    title: 'Bilgisayar Mühendisliği - 4. Sınıf',
    university: 'Kütahya Dumlupınar Üniversitesi',
    image: '/team/hamza.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/hamza-erdal-29b58519b',
      github: 'https://github.com/Toruk-Makto-01',
      email: 'mailto:hamzaerdal123@gmail.com',
    },
  },
  {
    name: 'Doç. Dr. Durmuş Özdemir',
    title: 'Akademik Danışman',
    university: 'Kütahya Dumlupınar Üniversitesi',
    image: '/team/durmus.jpg',
    social: {
      email: 'mailto:durmus.ozdemir@dpu.edu.tr',
    },
  },
];

export default function Team() {
  return (
    <Container
      id="team"
      sx={{
        py: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Ekibimiz
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Projemizi hayata geçiren, kendini işine adamış ekibimizle tanışın.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={member.image}
                  sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }}
                />
                <Typography variant="h6" component="div" gutterBottom>
                  {member.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {member.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {member.university}
                </Typography>
              </CardContent>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{ mt: 'auto' }}
              >
                {member.social.linkedin && (
                  <IconButton
                    component={Link}
                    href={member.social.linkedin}
                    target="_blank"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <LinkedInIcon />
                  </IconButton>
                )}
                {member.social.github && (
                  <IconButton
                    component={Link}
                    href={member.social.github}
                    target="_blank"
                    aria-label={`${member.name} GitHub`}
                  >
                    <GitHubIcon />
                  </IconButton>
                )}
                <IconButton
                  component={Link}
                  href={member.social.email}
                  aria-label={`${member.name} Email`}
                >
                  <EmailIcon />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 