import React, { useCallback, useEffect, useState } from "react";
import {
  boxStyle,
  ContainerButtons,
  ContainerContent,
  ContainerHeader,
  ContainerImage,
  ContainerModal,
  TitleHeader,
} from "./style";
import Image from "../../assets/icon.png";
import PhoneImage from "../../assets/phone-icon.svg";
import { useAuth } from "../../hooks/useAuth";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [visibleModal, setVisibleModal] = useState(false);
  const handleClose = () => setVisibleModal(false);
  const handleOpen = () => {
    if (!user) return;
    setVisibleModal(true);
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSignOut = useCallback(() => {
    signOut();
    handleClose();
    navigate(0);
  }, [navigate, signOut]);

  return (
    <>
      <ContainerHeader>
        <ContainerContent>
          <ContainerImage onClick={() => navigate("/")}>
            <img src={Image} alt="TalkWithMe!" />
          </ContainerImage>

          <TitleHeader>Talk with me!</TitleHeader>

          <ContainerButtons>
            {user ? (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar src={user.avatar} alt="Avatar" />
                  <span>{user.name}</span>
                </Button>
              </>
            ) : (
              <img src={PhoneImage} alt="TalkWithMe!" />
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleOpen}>Logout</MenuItem>
            </Menu>
          </ContainerButtons>
        </ContainerContent>
      </ContainerHeader>
      <Modal open={visibleModal} onClose={handleClose}>
        <Box sx={boxStyle}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ marginBottom: "8px", width: "100%" }}
          >
            Do you want sign out?
          </Typography>
          <ContainerModal>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ marginX: "16px" }}
            >
              Cancel
            </Button>
            <Button onClick={handleSignOut} variant="outlined">
              Sign out
            </Button>
          </ContainerModal>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
