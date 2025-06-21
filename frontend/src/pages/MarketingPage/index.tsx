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

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        <Team />
        <Divider />
        <FAQ />
        <Divider />
        <Supporters />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
