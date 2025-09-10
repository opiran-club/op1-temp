import {
  Grid,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";

import getTheme from "./theme/Theme";
import LogoBox from "./components/LogoBox";
import UserBox from "./components/UserBox";
import UsageBox from "./components/UsageBox";
import Apps from "./components/Apps";
import Configs from "./components/Configs";
import RadioButtons from "./components/RadioButtons";
import GetInfoRequest from "./utils/GetInfoRequest";
import {
  formatTraffic,
  calculateUsedTimePercentage,
  calculateRemainingTime,
} from "./utils/Helper";
import LanguageIcon from "@mui/icons-material/Language";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [dataLinks, setDataLinks] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  useEffect(() => {
    GetInfoRequest.getInfo()
      .then((res) => setData(res?.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data) return;

    if (data.links) {
      const links = data.links.at(-1) === "False" ? data.links.slice(0, -1) : data.links;
      setDataLinks(links);
    } else {
      GetInfoRequest.getConfigs().then((res) => {
        const links = res?.data?.trim();
        const decoded = links?.includes("vmess") || links?.includes("vless")
          ? links
          : decodeBase64(links);
        const configArray = decoded ? decoded.split("\n") : [];
        const validLinks = configArray.at(-1) === "False" ? configArray.slice(0, -1) : configArray;
        setDataLinks(validLinks);
      });
    }
  }, [data]);

  const decodeBase64 = (encoded) => {
    try {
      return atob(encoded);
    } catch (err) {
      console.error("Base64 decode failed:", err);
      return "";
    }
  };

  const getAdjustedUrl = (subURL) => {
    if (!subURL) return "#";
    if (import.meta.env.VITE_PANEL_DOMAIN) {
      return subURL.replace(/https?:\/\/[^/]+/, import.meta.env.VITE_PANEL_DOMAIN);
    }
    return subURL.startsWith("http") ? subURL : `${window.location.origin}${subURL}`;
  };

  const title = data?.username
    ? `${data.username} Sub Info`
    : `${import.meta.env.VITE_BRAND_NAME || "OPIran"} Sub Info`;

  const isOffSections = useMemo(() => {
    try {
      const envValue = import.meta.env.VITE_OFF_SECTIONS;
      return envValue ? JSON.parse(envValue) : getDefaultSections();
    } catch (err) {
      console.error("Failed to parse VITE_OFF_SECTIONS:", err);
      return getDefaultSections();
    }
  }, []);

  const getDefaultSections = () => ({
    appsBox: true,
    logoBox: true,
    timeBox: true,
    usageBox: true,
    userBox: true,
    supportBox: true,
    configs: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Powered by https://github.com/opiran-club" />
      </Helmet>

      <Grid container justifyContent="center">
        <Grid
          item
          container
          justifyContent="center"
          xs={11.5}
          sm={7}
          md={6}
          lg={5}
          xl={3.5}
        >
          {loading ? (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              style={{ height: "100vh" }}
            >
              <ClipLoader size={50} color="#3498db" />
            </Grid>
          ) : (
            data && (
              <>
                <RadioButtons setIsDarkMode={setIsDarkMode} />

                {isOffSections.logoBox && <LogoBox />}

                {isOffSections.userBox && (
                  <UserBox
                    data={data}
                    subLink={getAdjustedUrl(data?.subscription_url)}
                  />
                )}

                {isOffSections.usageBox && (
                  <UsageBox
                    type="usage"
                    value={Number(
                      ((data?.used_traffic / data?.data_limit) * 100).toFixed(2)
                    )}
                    total={formatTraffic(data?.data_limit, t)}
                    remaining={
                      data?.data_limit === null
                        ? formatTraffic(null, t)
                        : formatTraffic(data?.data_limit - data?.used_traffic, t)
                    }
                  />
                )}

                {isOffSections.timeBox && (
                  <UsageBox
                    type="time"
                    value={calculateUsedTimePercentage(
                      data?.expire || data?.expire_date
                    )}
                    remaining={calculateRemainingTime(
                      data?.expire || data?.expire_date,
                      t
                    )}
                  />
                )}

                {isOffSections.appsBox && (
                  <Apps subLink={getAdjustedUrl(data?.subscription_url)} />
                )}

                {isOffSections.configs && (
                  <Configs
                    title={t("configsList")}
                    style={{
                      direction: lang === "fa" ? "rtl" : "ltr",
                      background: theme.colors.configs[theme.palette.mode],
                      boxShadow: "0 0 30px 10px rgba(0, 0, 0, 0.1)",
                      width: "100%",
                      border:
                        theme.palette.mode === "light"
                          ? "1px solid #ffffff6b"
                          : "none",
                      borderRadius: "16px",
                      paddingY: ".4rem",
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255)"
                          : "rgb(0 0 0)",
                    }}
                    iconColor={theme.colors.configs.revert[theme.palette.mode]}
                    icon={
                      <LanguageIcon
                        fontSize="large"
                        sx={{
                          marginInlineStart: "1rem",
                          color:
                            theme.colors.configs.revert[theme.palette.mode],
                        }}
                      />
                    }
                    configs={dataLinks}
                    btnStyle={{
                      cursor: "pointer",
                      borderRadius: "30%",
                      padding: ".3rem",
                      background: theme.colors.glassColor,
                      "&:hover": {
                        background:
                          theme.colors.configs.revert[theme.palette.mode],
                      },
                    }}
                    liStyle={{
                      background: theme.colors.glassColor,
                    }}
                    isFirst={!isOffSections.appsBox}
                  />
                )}
              </>
            )
          )}
        </Grid>

        <ToastContainer
          position="top-right"
          theme="colored"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ marginTop: "1rem", borderRadius: "16px" }}
        />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
