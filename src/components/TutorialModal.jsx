import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";
import Looks6OutlinedIcon from "@mui/icons-material/Looks6Outlined";

const stepIcons = [
  <LooksOneOutlinedIcon fontSize="large" />,
  <LooksTwoOutlinedIcon fontSize="large" />,
  <Looks3OutlinedIcon fontSize="large" />,
  <Looks4OutlinedIcon fontSize="large" />,
  <Looks5OutlinedIcon fontSize="large" />,
  <Looks6OutlinedIcon fontSize="large" />,
];

const TutorialModal = ({ open, handleClose, data }) => {
  const { t, i18n } = useTranslation();
  const isLangFa = i18n.language === "fa";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{ direction: isLangFa ? "rtl" : "ltr" }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#000000a8",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {isLangFa && data?.faTitle ? data.faTitle : data?.title}
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: "#000000a8",
          maxHeight: "70vh",
          overflowY: "auto",
          color: "#fff",
        }}
      >
        {data?.tutorialSteps?.length > 0 ? (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              {t("tutorialTitle")}
            </Typography>

            {data.tutorialSteps.map((step, index) => (
              <Box
                key={`step-${index}`}
                mt={2}
                display="flex"
                flexDirection="column"
              >
                <Box display="flex" alignItems="center" mb={1}>
                  {stepIcons[index] || <LooksOneOutlinedIcon fontSize="large" />}
                  <Typography variant="subtitle1" ml={1}>
                    {isLangFa && step?.faStepText ? step.faStepText : step?.stepText}
                  </Typography>
                </Box>

                {step?.stepImage && (
                  <Box
                    component="img"
                    src={step.stepImage}
                    alt={`Step ${index + 1}`}
                    width="100%"
                    sx={{ borderRadius: "8px", marginTop: 1 }}
                  />
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>{t("noTutorial")}</Typography>
        )}

        {data?.videoLink && (
          <Box mt={4}>
            <iframe
              width="100%"
              height="315"
              src={data.videoLink}
              title={data?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "12px" }}
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

TutorialModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    faTitle: PropTypes.string,
    videoLink: PropTypes.string,
    tutorialSteps: PropTypes.arrayOf(
      PropTypes.shape({
        stepText: PropTypes.string,
        faStepText: PropTypes.string,
        stepImage: PropTypes.string,
      })
    ),
  }),
};

export default TutorialModal;
