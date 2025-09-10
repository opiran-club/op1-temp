import { Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CapsuleButton from "./CapsuleButton";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const RadioButtons = ({ setIsDarkMode }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const secondLang = import.meta.env.VITE_SECOND_LANG || "en";

  const [isLightMode, setIsLightMode] = useState(theme.palette.mode === "light");

  // Sync saved theme and language from cookies
  useEffect(() => {
    const savedTheme = Cookies.get("theme") || theme.palette.mode;
    const savedLang = Cookies.get("language") || currentLang;

    setIsLightMode(savedTheme === "light");
    setIsDarkMode(savedTheme === "dark");

    if (savedLang !== currentLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    const isLight = newTheme === "light";
    setIsLightMode(isLight);
    setIsDarkMode(!isLight);
    Cookies.set("theme", newTheme, { expires: 90 });
  };

  const handleLangChange = () => {
    const newLang = currentLang === "fa" ? secondLang : "fa";
    i18n.changeLanguage(newLang);
    Cookies.set("language", newLang, { expires: 90 });
  };

  const capsuleContainerStyle = {
    position: "relative",
    backgroundColor: theme.colors.capsuleBtn.background[theme.palette.mode],
    borderRadius: "50px",
    padding: "0.2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 0 7rem rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(12px)",
    overflow: "hidden",
  };

  const sliderStyle = (isActive) => ({
    position: "absolute",
    top: 0,
    left: isActive ? 0 : "50%",
    width: "50%",
    height: "100%",
    backgroundColor: theme.colors.capsuleBtn.slider,
    borderRadius: "50px",
    transition: "all 0.3s ease",
    zIndex: 0,
  });

  return (
    <Grid container item justifyContent="space-between" xs={11} sx={{ py: 2, gap: 2 }}>
      {/* Language Toggle */}
      <Grid item xs={5.5} sm={5} md={4.5} sx={capsuleContainerStyle}>
        <div style={sliderStyle(currentLang === "fa")} />
        <CapsuleButton
          label="فارسی"
          isActive={currentLang === "fa"}
          onClick={handleLangChange}
          icon="فارسی"
        />
        <CapsuleButton
          label={secondLang}
          isActive={currentLang === secondLang}
          onClick={handleLangChange}
          icon={secondLang === "ru" ? "Русский" : "English"}
        />
      </Grid>

      {/* Theme Toggle */}
      <Grid item xs={5.5} sm={5} md={4.5} sx={capsuleContainerStyle}>
        <div style={sliderStyle(isLightMode)} />
        <CapsuleButton
          label={t("light")}
          isActive={isLightMode}
          onClick={() => handleThemeChange("light")}
          icon={t("light")}
        />
        <CapsuleButton
          label={t("dark")}
          isActive={!isLightMode}
          onClick={() => handleThemeChange("dark")}
          icon={t("dark")}
        />
      </Grid>
    </Grid>
  );
};

RadioButtons.propTypes = {
  setIsDarkMode: PropTypes.func.isRequired,
};

export default RadioButtons;
