import { Button, Grid, useTheme } from "@mui/material";
import BoxS from "./Box";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import QrModal from "./QrModal";
import QrCodeOutlinedIcon from "@mui/icons-material/QrCodeOutlined";

const UserBox = ({ data, subLink }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [statusData, setStatusData] = useState("");
  const [qrLink, setQrLink] = useState(subLink);
  const [openQrModal, setOpenQrModal] = useState(false);

  useEffect(() => {
    if (data?.status) {
      setStatusData(data.status);
    } else if (data?.expired || data?.data_limit_reached) {
      setStatusData("expired");
    } else if (!data?.enabled) {
      setStatusData("disabled");
    } else if (data?.is_active) {
      setStatusData("active");
    } else if (data?.activated === null) {
      setStatusData("on_hold");
    }
  }, [data]);

  useEffect(() => {
    if (subLink) setQrLink(subLink);
  }, [subLink]);

  const handleQrModalOpen = () => setOpenQrModal(true);
  const handleQrModalClose = () => setOpenQrModal(false);

  const getStatusBackgroundColor = (status) => {
    const colorMap = theme.colors.userBox.statusBtn.btn;
    return colorMap[status]?.[theme.palette.mode] || "transparent";
  };

  const getStatusTextColor = (status) => {
    const colorMap = theme.colors.userBox.statusBtn.text;
    return colorMap[status]?.[theme.palette.mode] || theme.palette.text.primary;
  };

  const supportUrl = import.meta.env.VITE_SUPPORT_URL;

  return (
    <>
      <BoxS>
        {/* Left Avatar/Icon */}
        <Grid item xs={3} display="flex" justifyContent="center" sx={{ p: ".5rem" }}>
          <SupervisedUserCircleIcon
            fontSize="large"
            sx={{
              color: theme.colors.userBox.logoColor[theme.palette.mode],
              width: "100%",
              height: "auto",
            }}
          />
        </Grid>

        {/* Right Side */}
        <Grid item xs={8} display="flex" flexDirection="column" sx={{ color: theme.colors.BWColor[theme.palette.mode] }}>
          {/* Username and QR Button */}
          <Grid container alignItems="baseline" paddingBottom={1}>
            <Grid item xs={8} sx={{ fontWeight: 500, fontSize: "medium", paddingBottom: ".7rem", pr: ".4rem" }} textAlign="start">
              {data?.username || t("unknownUser")}
            </Grid>
            <Grid item xs={4} textAlign="end">
              <Button
                onClick={handleQrModalOpen}
                sx={{
                  background: theme.colors.glass,
                  color: theme.palette.text.primary,
                  backdropFilter: "blur(.5rem)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255)",
                  padding: "0.5rem 1rem",
                  height: "100%",
                }}
              >
                <QrCodeOutlinedIcon fontSize="small" />
              </Button>
            </Grid>
          </Grid>

          {/* Status and Support Button */}
          <Grid
            container
            justifyContent={supportUrl ? "space-around" : "flex-start"}
            alignItems="center"
          >
            <Grid item xs={supportUrl ? 5 : 6} textAlign="center">
              <Button
                sx={{
                  borderRadius: "50px",
                  backgroundColor: getStatusBackgroundColor(statusData),
                  color: getStatusTextColor(statusData),
                  textTransform: "capitalize",
                  boxShadow: "0 0 3px 0px #99bbaf",
                  width: "90%",
                  fontWeight: "bold",
                  fontSize: "small",
                  whiteSpace: "nowrap",
                }}
              >
                {t(`status.${statusData}`)}
              </Button>
            </Grid>

            {supportUrl && (
              <Grid item xs={7} textAlign="center">
                <Button
                  onClick={() => window.open(supportUrl, "_blank")}
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: theme.colors.userBox.supportBox[theme.palette.mode],
                    paddingX: ".5rem",
                    color: "#fff",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    textTransform: "capitalize",
                    gap: "1rem",
                    width: "90%",
                    fontWeight: "lighter",
                  }}
                >
                  <QuestionAnswerOutlinedIcon />
                  {t("support")}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </BoxS>

      {/* QR Modal */}
      <QrModal
        open={openQrModal}
        handleClose={handleQrModalClose}
        title={t("subQRCode")}
        link={qrLink}
        id="switch"
      />
    </>
  );
};

UserBox.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string,
    status: PropTypes.string,
    expired: PropTypes.bool,
    data_limit_reached: PropTypes.bool,
    enabled: PropTypes.bool,
    is_active: PropTypes.bool,
    activated: PropTypes.any,
  }).isRequired,
  subLink: PropTypes.string,
};

export default UserBox;
