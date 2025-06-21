import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '@/theme/shared-theme/ColorModeIconDropdown';
import AyikaIcon from './AyikaIcon';
import Diversity1Icon from '@mui/icons-material/Diversity1';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <AyikaIcon />
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              <Button
                variant="text"
                color="info"
                size="small"
                component={Link}
                to="/#features"
              >
                Özellikler
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                component={Link}
                to="/#highlights"
              >
                Öne Çıkanlar
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                component={Link}
                to="/#team"
              >
                Ekibimiz
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                component={Link}
                to="/#faq"
              >
                SSS
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                component={Link}
                to="/#supporters"
              >
                Destekçilerimiz
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                component="a"
                href="https://docs.google.com/forms/d/12Lw1k2e3hpawyUF-pVSG04n-MFIK1kx96PRtG5ZtzL0/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                İletişim
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button color="primary" variant="text" size="small">
                Giriş yap
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button
                color="primary"
                variant="contained"
                size="small"
                startIcon={<Diversity1Icon />}
              >
                Gönüllü Ol
              </Button>
            </Link>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem component={Link} to="/#features" onClick={() => setOpen(false)}>
                  Özellikler
                </MenuItem>
                <MenuItem component={Link} to="/#highlights" onClick={() => setOpen(false)}>
                  Öne Çıkanlar
                </MenuItem>
                <MenuItem component={Link} to="/#team" onClick={() => setOpen(false)}>
                  Ekibimiz
                </MenuItem>
                <MenuItem component={Link} to="/#faq" onClick={() => setOpen(false)}>
                  SSS
                </MenuItem>
                <MenuItem component={Link} to="/#supporters" onClick={() => setOpen(false)}>
                  Destekçilerimiz
                </MenuItem>
                <MenuItem
                  component="a"
                  href="https://docs.google.com/forms/d/12Lw1k2e3hpawyUF-pVSG04n-MFIK1kx96PRtG5ZtzL0/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  İletişim
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Link to="/signup" style={{ textDecoration: 'none', width: '100%' }}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      startIcon={<Diversity1Icon />}
                    >
                      Gönüllü Ol
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
                    <Button color="primary" variant="outlined" fullWidth>
                      Giriş yap
                    </Button>
                  </Link>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
