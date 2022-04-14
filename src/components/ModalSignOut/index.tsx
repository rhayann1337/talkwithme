import { Box, Button, Typography } from "@mui/material";
import { boxStyle, ContainerModal } from "./style";

type ModalSignOutProps = {
  handleClose: () => void;
  handleSignOut: () => void;
};

const ModalSignOut: React.FC<ModalSignOutProps> = ({
  handleClose,
  handleSignOut,
}) => {
  return (
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
  );
};

export default ModalSignOut;
