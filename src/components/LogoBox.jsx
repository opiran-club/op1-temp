import { Grid, useTheme } from "@mui/material";
import BoxS from "./Box";
import { useTranslation } from "react-i18next";

const LogoBox = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const brandName = import.meta.env.VITE_BRAND_NAME || "OPIran";
  const logoSrc =
    import.meta.env.VITE_LOGO_SRC ||
    "https://raw.githubusercontent.com/opiran-club/public-assets/refs/heads/main/icons/uranus.svg";

  return (
    <BoxS>
      {/* Logo */}
      <Grid
        item
        xs={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ px: ".5rem", py: ".3rem" }}
      >
        <img
          src={logoSrc}
          alt={`${brandName} Logo`}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "60px",
            objectFit: "contain",
          }}
        />
      </Grid>

      {/* Text */}
      <Grid
        item
        xs={9}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: "center" }}
      >
        <Grid
          item
          sx={{
            color: theme.colors.BWColor[theme.palette.mode],
            fontSize: "1.2rem",
            fontWeight: 600,
            mb: ".5rem",
          }}
        >
          {t("userPanelTitle").replace("{brandName}", brandName)}
        </Grid>
        <Grid
          item
          sx={{
            color: theme.colors.grayColor[theme.palette.mode],
            fontSize: ".9rem",
            opacity: 0.8,
          }}
        >
          {t("userPanelWelcome").replace("{brandName}", brandName)}
        </Grid>
      </Grid>
    </BoxS>
  );
};

export default LogoBox;
