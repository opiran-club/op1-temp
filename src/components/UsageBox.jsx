import { Grid, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import BoxS from "./Box";
import CircularProgressWithLabel from "./CircularWithValueLabel";
import { useTranslation } from "react-i18next";

const UsageBox = ({ type, value, total, remaining }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const parseValue = (input = "") => {
    const numericMatch = input.match(/\d+/);
    const number = numericMatch ? numericMatch[0] : "0";
    const text = input.replace(/\d+/g, "").trim();
    return { number, text };
  };

  const getTypographyGradient = (v) => {
    if (v === Infinity || Number.isNaN(v)) {
      return theme.colors.gradients.high.typographyGradient;
    } else if (v <= 30) {
      return theme.colors.gradients.high.typographyGradient;
    } else if (v <= 70) {
      return theme.colors.gradients.medium.typographyGradient;
    } else {
      return theme.colors.gradients.low.typographyGradient;
    }
  };

  const labels = {
    usage: {
      title: t("remaining_volume"),
      totaltitle: t("initial_volume"),
    },
    time: {
      title: t("remaining_time"),
      totaltitle: t("initial_time"),
    },
  };

  const { title, totaltitle } = labels[type] || {};
  const remainingParsed = parseValue(remaining);
  const totalParsed = parseValue(total);

  return (
    <BoxS>
      {/* Circle */}
      <Grid item xs={4} display="flex" justifyContent="center">
        <CircularProgressWithLabel value={value} type={type} />
      </Grid>

      {/* Remaining Box */}
      <Grid
        item
        xs={type === "usage" ? 4 : 8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={0.5}
        textAlign="center"
      >
        <Typography
          fontSize="small"
          fontWeight="300"
          sx={{ opacity: 0.6 }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{
            background: getTypographyGradient(value),
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {remainingParsed.text === t("infinity")
            ? remainingParsed.text
            : remainingParsed.number}
        </Typography>

        <Typography
          fontSize="medium"
          fontWeight="300"
          sx={{ opacity: 0.6 }}
        >
          {remainingParsed.text}
        </Typography>
      </Grid>

      {/* Total Box (only if usage) */}
      {type === "usage" && (
        <Grid
          item
          xs={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={0.5}
          textAlign="center"
        >
          <Typography fontSize="small" fontWeight="300" sx={{ opacity: 0.6 }}>
            {totaltitle}
          </Typography>

          <Typography variant="h6" fontWeight="700">
            {totalParsed.text === t("infinity")
              ? totalParsed.text
              : totalParsed.number}
          </Typography>

          <Typography fontSize="medium" fontWeight="300" sx={{ opacity: 0.6 }}>
            {totalParsed.text}
          </Typography>
        </Grid>
      )}
    </BoxS>
  );
};

UsageBox.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.string,
  remaining: PropTypes.string.isRequired,
};

export default UsageBox;
