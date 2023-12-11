"use client";

import {
  Avatar,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {useState, MouseEvent} from "react";

import {authContext} from "../../components/auth";
import {prefixBaseApiPath} from "@/utils/path";
import {useRouter} from "next/navigation";

export default function LoginAvatar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [getFaRaw, setGetFaRaw] = useState(authContext.getFaRaw);

  const {push} = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    fetch(prefixBaseApiPath("/auth/logout"), {
      method: "POST",
    }).finally(() => {
      authContext.profile = null;
      return push("/");
    });
  };

  return (
    <>
      <Box sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
        <Typography sx={{minWidth: 100}}>{authContext.profile ? authContext.profile.name : ""}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ml: 2}}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={authContext.profile ? authContext.profile.picture : ""}
              sx={{width: 55, height: 55}}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
      >
        <MenuItem>Token: {authContext.profile ? authContext.profile.sub : ""}</MenuItem>
        <MenuItem>Given Name: {authContext.profile ? authContext.profile.given_name : ""}</MenuItem>
        <MenuItem>Middle Name: {authContext.profile ? authContext.profile.middle_name : ""}</MenuItem>
        <MenuItem>Family Name: {authContext.profile ? authContext.profile.family_name : ""}</MenuItem>
        <MenuItem>Gender: {authContext.profile ? authContext.profile.gender : ""}</MenuItem>
        <MenuItem>Birthdate: {authContext.profile ? authContext.profile.birthdate : ""}</MenuItem>
        <MenuItem>Email: {authContext.profile ? authContext.profile.email : ""}</MenuItem>
        <MenuItem>Phone: {authContext.profile ? authContext.profile.phone_number : ""}</MenuItem>
        <MenuItem>Address: {authContext.profile ? JSON.stringify(authContext.profile.address) : ""}</MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="medium" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={getFaRaw}
                    onChange={(event) => {
                      authContext.getFaRaw = event.target.checked;
                      setGetFaRaw(authContext.getFaRaw);
                    }}
                  />
                }
                label="Get Raw FA"
              />
            </FormGroup>
          </FormControl>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
