import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useAuth } from '@/providers/AuthProvider';

export default function OptionsMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <div>
      <Button
        id="options-button"
        aria-controls={open ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        onClick={handleClick}
        sx={{
          minWidth: 'auto',
          p: '4px',
          color: 'text.secondary',
        }}
      >
        <MoreVertRoundedIcon />
      </Button>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'options-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profil</MenuItem>
        <MenuItem onClick={handleClose}>Hesabım</MenuItem>
        <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
      </Menu>
    </div>
  );
}
