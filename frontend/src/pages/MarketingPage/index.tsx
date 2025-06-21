import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '@/theme/shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Team from './components/Team';
import Supporters from './components/Supporters';
import Footer from './components/Footer';
import Box from '@mui/material/Box';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box id="features" sx={{ scrollMarginTop: '64px' }}>
          <Features />
        </Box>
        <Divider />
        <Box id="highlights" sx={{ scrollMarginTop: '64px' }}>
          <Highlights />
        </Box>
        <Divider />
        <Box id="team" sx={{ scrollMarginTop: '64px' }}>
          <Team />
        </Box>
        <Divider />
        <Box id="faq" sx={{ scrollMarginTop: '64px' }}>
          <FAQ />
        </Box>
        <Divider />
        <Box id="supporters" sx={{ scrollMarginTop: '64px' }}>
          <Supporters />
        </Box>
        <Divider />
        <Footer />
      </Box>
    </AppTheme>
  );
}
