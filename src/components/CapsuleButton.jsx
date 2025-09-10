import { Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const CapsuleButton = ({ isActive, onClick, icon }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const activeColor = theme.colors.capsuleBtn.active[mode];
  const inactiveColor = theme.colors.capsuleBtn.notActive[mode];
  const background = theme.colors.capsuleBtn.background[mode];
  const hoverSlider = theme.colors.capsuleBtn.slider;

  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="contained"
      disableElevation
      sx={{
        borderRadius: "50px",
        px: 3,
        py: 1,
        backgroundColor: background,
        color: isActive ? activeColor : inactiveColor,
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: hoverSlider,
          color: activeColor,
        },
      }}
    >
      {icon}
    </Button>
  );
};

CapsuleButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};

export default CapsuleButton;
