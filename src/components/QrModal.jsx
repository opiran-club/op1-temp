import { Modal, Fade, Backdrop, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";
import { handleCopyToClipboard } from "../utils/Helper";
import { useTheme } from "@mui/material/styles";

const QrModal = ({ open, handleClose, title, link, id }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const styles = {
    modalBox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 360,
      borderRadius: "16px",
      padding: "2rem",
      background: theme.colors.glassColor,
      backdropFilter: "blur(12px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)"
      }`,
      boxShadow: "0 0 25px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    title: {
      marginBottom: "1.5rem",
      padding: ".5rem 1rem",
      borderRadius: "10px",
      background: isDarkMode
        ? "rgba(50, 60, 120, 0.4)"
        : "rgba(180, 200, 255, 0.6)",
      color: isDarkMode ? "#fff" : "#111",
      fontWeight: "bold",
    },
    qrCode: {
      padding: "1rem",
      border: `1px solid ${
        isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)"
      }`,
      borderRadius: "10px",
      cursor: "pointer",
      backgroundColor: "transparent",
    },
  };

  return (
    <Modal
      aria-labelledby={`qr-modal-title-${id}`}
      aria-describedby={`qr-modal-description-${id}`}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={styles.modalBox}>
          <Typography
            id={`qr-modal-title-${id}`}
            variant="h6"
            component="h2"
            sx={styles.title}
          >
            {title}
          </Typography>

          <QRCode
            value={link}
            bgColor="transparent"
            fgColor={isDarkMode ? "#ffffff" : "#000000"}
            style={styles.qrCode}
            onClick={() => handleCopyToClipboard(link)}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

QrModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default QrModal;
