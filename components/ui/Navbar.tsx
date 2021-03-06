import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "../../context/ui";
import NextLink from "next/link";

export const Navbar = () => {
  const { sidemenuOpen, openSideMenu, closeSideMenu } = useContext(UIContext);

  const handleMenuStatus = () => {
    if (sidemenuOpen) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={handleMenuStatus}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href={'/'} passHref>
          <Link underline="none" color='white'>
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
