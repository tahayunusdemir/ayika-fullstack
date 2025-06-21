import { useColorScheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';

export default function ColorModeIconDropdown(props: IconButtonProps) {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
      {...props}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
