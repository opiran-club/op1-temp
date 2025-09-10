// apps.jsx (fully updated with theme harmony & modular improvements)
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import CodeIcon from "@mui/icons-material/Code";
import Checklist from "@mui/icons-material/Checklist";
import { useTranslation } from "react-i18next";

import TutorialModal from "./TutorialModal";
import errorLogo from "../assets/vite.svg";

const osIcons = {
  Windows: <DesktopWindowsOutlinedIcon fontSize="large" />,
  Android: <AndroidIcon fontSize="large" />,
  iOS: <AppleIcon fontSize="large" />,
  Linux: <CodeIcon fontSize="large" />,
};

const getButtonStyles = (type, mode, colors) => {
  const defaults = {
    download: {
      backgroundColor: mode === "dark" ? "rgba(30, 144, 255, 0.5)" : "rgba(35, 103, 181, 0.8)",
      color: colors.BWColor.dark,
    },
    configuration: {
      backgroundColor: mode === "dark" ? "rgba(76, 175, 80, 0.5)" : "rgba(78, 191, 119, 0.8)",
      color: colors.BWColor.dark,
    },
    watchVideo: {
      backgroundColor: mode === "dark" ? "rgba(255, 193, 7, 0.5)" : "rgba(255, 208, 75, 0.8)",
      color: mode === "dark" ? colors.BWColor.dark : colors.BWColor.light,
    },
    default: {
      backgroundColor: mode === "dark" ? "rgba(255, 87, 34, 0.5)" : "rgba(255, 87, 34, 0.8)",
      color: colors.BWColor.light,
    },
  };
  return defaults[type] || defaults.default;
};

const renderButtonGrid = (icon, label, theme, t, link, app, onModal, shadowrocket) => {
  const { mode, colors } = theme.palette;
  const style = getButtonStyles(label, mode, theme.colors);

  const sharedProps = {
    item: true,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0.5,
    width: "100%",
    sx: {
      ...style,
      borderRadius: "1rem",
      padding: 1,
      cursor: "pointer",
      textDecoration: "none",
      "&:hover": { background: theme.colors.glassColor },
    },
  };

  const handleShadowrocketClick = () => {
    const encoded = btoa(shadowrocket);
    navigator.clipboard.writeText(`sub://${encoded}`);
    alert("Shadowrocket link copied!");
  };

  if (label === "watchVideo") {
    return (
      <Grid {...sharedProps} onClick={() => onModal(app)}>
        {icon}
        <Typography fontSize="smaller" textAlign="center" noWrap>
          {t(label)}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid
      {...sharedProps}
      component={shadowrocket ? "div" : "a"}
      target={!shadowrocket ? "_blank" : undefined}
      href={!shadowrocket ? link : undefined}
      onClick={shadowrocket ? handleShadowrocketClick : undefined}
    >
      {icon}
      <Typography fontSize="smaller" textAlign="center" noWrap>
        {t(label)}
      </Typography>
    </Grid>
  );
};

const renderAppAccordion = (app, index, lang, theme, t, subLink, onModal) => (
  <Accordion key={index} sx={getAccordionStyles(theme)}>
    <AccordionSummary
      expandIcon={<ArrowDropDownIcon sx={{ color: theme.colors.BWColorRevert[theme.palette.mode] }} />}
    >
      <Grid container alignItems="center" justifyContent="space-around" gap={1}>
        <Grid item xs={1} display="flex" justifyContent="center">
          <img
            src={app.logo}
            alt={`${app.name} logo`}
            style={{ width: 30, borderRadius: "20%" }}
            onError={(e) => (e.target.src = errorLogo)}
          />
        </Grid>
        <Grid item xs={10} display="flex" justifyContent="space-between" alignItems="center">
          <Typography>{app.name}</Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 50,
              backgroundColor: app.isAd
                ? theme.colors.apps.priceBtn.ad.btn[theme.palette.mode]
                : app.price === "0"
                ? theme.colors.apps.priceBtn.free.btn[theme.palette.mode]
                : theme.colors.apps.priceBtn.paid.btn[theme.palette.mode],
              color: app.isAd
                ? theme.colors.apps.priceBtn.ad.text[theme.palette.mode]
                : app.price === "0"
                ? theme.colors.apps.priceBtn.free.text[theme.palette.mode]
                : theme.colors.apps.priceBtn.paid.text[theme.palette.mode],
              textTransform: "capitalize",
              boxShadow: "0 0 3px 0px #99bbaf",
            }}
          >
            {app.price === "0" ? t("free") : app.isAd ? t("ad") : `${app.price} $`}
          </Button>
        </Grid>
      </Grid>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container direction="column" gap={".7rem"} alignItems="center">
        <Typography pb={2}>{lang === "fa" ? app.faDescription : app.description}</Typography>
        {app.downloadLink && !app.isAd &&
          renderButtonGrid(<ArrowCircleDownIcon />, "download", theme, t, app.downloadLink)}
        {app.isAd && renderButtonGrid(<Checklist />, app.adBtnText, theme, t, app.downloadLink)}
        {app.configLink &&
          renderButtonGrid(
            <AddCircleOutlineIcon />, "configuration", theme, t,
            app.configLink.replace("{url}", subLink),
            null, null, app.name === "Shadowrocket" ? subLink : null
          )}
        {app.tutorialSteps?.length > 0 &&
          renderButtonGrid(
            <PlayCircleFilledWhiteOutlinedIcon />, "watchVideo", theme, t, null, app, onModal
          )}
      </Grid>
    </AccordionDetails>
  </Accordion>
);

const getAccordionStyles = (theme) => ({
  marginBottom: ".8rem",
  background: theme.palette.mode === "light" ? theme.colors.glassColor : "rgba(0,0,0,0.1)",
  color: theme.colors.BWColorRevert[theme.palette.mode],
});

const Apps = ({ subLink }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const theme = useTheme();

  const [systems, setSystems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_JSON_APPS_URL ||
        "https://raw.githubusercontent.com/opiran-club/public-assets/refs/heads/main/json/os.json"
    )
      .then((res) => res.json())
      .then((data) => setSystems(data.operatingSystems));
  }, []);

  const handleModalOpen = (app) => {
    setModalData({
      title: app.name,
      videoLink: app.videoLink,
      tutorialSteps: app.tutorialSteps,
    });
    setModalOpen(true);
  };

  return (
    <>
      <Grid sx={{ py: 2 }} xs={11} item>
        <Accordion
          sx={{
            direction: lang === "fa" ? "rtl" : "ltr",
            background: theme.colors.apps[theme.palette.mode],
            borderRadius: "16px",
            py: ".4rem",
            color: "#fff",
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon fontSize="large" sx={{ color: "#fff" }} />}
          >
            <Grid container alignItems="center" justifyContent="space-around">
              <Grid item xs={1} display="flex" justifyContent="center">
                <Checklist
                  fontSize="large"
                  sx={{
                    marginInlineStart: "1rem",
                    background: "#fff",
                    padding: 0.4,
                    borderRadius: "10px",
                    color: theme.colors.apps.light,
                  }}
                />
              </Grid>
              <Grid item xs={10} display="flex" justifyContent="center">
                <Typography>{t("operatingSystems")}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            {systems.map((os, idx) => (
              <Accordion key={idx} sx={getAccordionStyles(theme)}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon sx={{ color: theme.colors.BWColorRevert.light }} />}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={1} display="flex" justifyContent="center">
                      {osIcons[os.engName] || <CancelPresentationOutlinedIcon />}
                    </Grid>
                    <Grid item xs={10} display="flex" justifyContent="center">
                      <Typography>{lang === "fa" ? os.name : os.engName}</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  {os.apps.map((app, i) =>
                    renderAppAccordion(app, i, lang, theme, t, subLink, handleModalOpen)
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <TutorialModal open={modalOpen} handleClose={() => setModalOpen(false)} data={modalData} />
    </>
  );
};

Apps.propTypes = {
  subLink: PropTypes.string,
};

export default Apps;
