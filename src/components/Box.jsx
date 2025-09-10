import { Box, Grid, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import i18n from "../utils/i18n";

const BoxS = ({ children }) => {
  const theme = useTheme();
  const language = i18n.language;
  const mode = theme.palette.mode;

  return (
    <Grid item xs={11} container justifyContent="center">
      <Box
        sx={{
          width: "100%",
          borderRadius: 3,
          mt: 2,
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          direction: language === "fa" ? "rtl" : "ltr",
          backgroundColor: theme.colors.box[mode],
          border: theme.colors.box.border[mode],
          boxShadow:
            mode === "dark"
              ? "0 0 30px rgba(255, 255, 255, 0.03)"
              : "0 0 30px rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

BoxS.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoxS;
