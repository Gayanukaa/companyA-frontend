import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function LoginBtn() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (menuItem) => {
    console.log(`Clicked on ${menuItem}`);
    handleClose();
  };

  return (
    <div>
      <Button sx={{ marginRight: 3,  height: 45, width: 130,backgroundColor: 'green', }} onClick={handleClick} variant="contained">Login</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/login/customer" onClick={handleClose}>Customer Login</MenuItem>
        <MenuItem component={Link} to="/login/manager" onClick={handleClose}>Manager Login</MenuItem>
        
      </Menu>
    </div>
  );
}
