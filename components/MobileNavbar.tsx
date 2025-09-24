import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarItems from '@/components/SidebarItems';
export default function MobileNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      {/* Menu button */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <SidebarItems isDrawer={true} />
        </Box>
      </Drawer>
    </Box>
  );
}
