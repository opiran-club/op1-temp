import { createTheme } from "@mui/material/styles";

const commonColors = {
  white: "rgba(255, 255, 255, 1)",
  black: "rgba(0, 0, 0, 1)",
  transparentWhite: "rgba(255, 255, 255, 0.3)",
  transparentBlack: "rgba(0, 0, 0, 0.1)",
  darkGray: "rgba(38, 42, 62, 1)",
  lightGray: "rgba(243, 244, 254, 1)",
  lightPurple: "rgba(156, 39, 176, 1)",
  darkPurple: "rgba(106, 27, 154, 1)",
};

const getColors = (isDarkMode) => ({
  gradients: {
    light: `linear-gradient(to right, ${commonColors.white}, rgba(52, 0, 79, 0.12))`,
    dark: `linear-gradient(to right, rgba(34, 34, 34, 0.8), rgba(91, 7, 122, 0.1))`,
    purpleLight: commonColors.lightPurple,
    purpleDark: commonColors.darkPurple,
    low: {
      colors: {
        light: ["rgba(255, 102, 102, 1)", "rgba(153, 0, 0, 1)"],
        dark: ["rgba(255, 102, 102, .5)", "rgba(153, 0, 0, .9)"],
      },
      background: "rgba(255, 235, 230, 0.2)",
      typographyGradient: "linear-gradient(0deg, rgba(255, 102, 102, 1), rgba(153, 0, 0, 1))",
    },
    medium: {
      colors: {
        light: ["rgba(255, 193, 7, 1)", "rgba(255, 152, 0, 1)"],
        dark: ["rgba(255, 193, 7, 0.3)"],
      },
      background: "rgba(255, 243, 205, 0.2)",
      typographyGradient: "linear-gradient(0deg, rgba(214, 194, 35, 1), rgba(255, 165, 0, 1))",
    },
    high: {
      colors: {
        light: ["rgba(144, 238, 144, 1)", "rgba(0, 100, 0, 1)"],
        dark: ["rgba(144, 238, 144, 0.6)"],
      },
      background: "rgba(220, 255, 220, 0.2)",
      typographyGradient: "linear-gradient(0deg, rgba(144, 238, 144, 1), rgba(0, 100, 0, 1))",
    },
  },
  apps: {
    light: "rgba(72, 76, 112, 1)",
    dark: "rgba(117, 122, 166, 1)",
    priceBtn: {
      free: {
        btn: { dark: "rgba(26, 41, 39, 1)", light: "rgba(226, 241, 239, 1)" },
        text: {
          dark: "rgba(136, 192, 166, 1)",
          light: "rgba(108, 185, 173, 1)",
        },
      },
      paid: {
        btn: {
          dark: "rgba(255, 50, 50, 0.7)",
          light: "rgba(255, 90, 90, 0.7)",
        },
        text: { dark: commonColors.white, light: "rgba(255,255,255,0.9)" },
      },
      ad: {
        btn: {
          dark: "rgba(255, 255, 255, 0.65)",
          light: "rgba(255, 255, 255, 0.65)",
        },
        text: { dark: commonColors.black, light: commonColors.black },
      },
    },
  },
  configs: {
    light: commonColors.white,
    dark: "rgba(72, 76, 122, 1)",
    revert: {
      dark: commonColors.white,
      light: "rgba(72, 76, 122, 1)",
    },
  },
  capsuleBtn: {
    active: {
      dark: commonColors.white,
      light: "rgba(82, 88, 125, 1)",
    },
    notActive: {
      dark: commonColors.white,
      light: "rgba(121, 124, 146, 1)",
    },
    background: {
      dark: "rgba(72, 76, 111, 1)",
      light: commonColors.lightGray,
    },
    slider: "rgba(143, 141, 179, 0.6)",
  },
  box: {
    dark: "rgba(72, 76, 111, 1)",
    light: commonColors.white,
    border: {
      dark: "1px solid rgba(255,255,255,0.05)",
      light: "1px solid rgba(0,0,0,0.05)",
    },
  },
  userBox: {
    statusBtn: {
      btn: {
        active: { dark: "rgba(26, 41, 39, 1)", light: "rgba(226, 241, 239, 1)" },
        expired: { dark: "rgba(102, 0, 0, 1)", light: "rgba(255, 153, 153, 1)" },
        onHold: { dark: "rgba(76, 0, 153, 1)", light: "rgba(204, 153, 255, 1)" },
        disabled: { dark: "rgba(34, 34, 34, 1)", light: "rgba(128, 128, 128, 1)" },
      },
      text: {
        active: { dark: "rgba(136, 192, 166, 1)", light: "rgba(108, 185, 173, 1)" },
        expired: { dark: commonColors.white, light: commonColors.white },
        onHold: { dark: commonColors.white, light: commonColors.white },
        disabled: { dark: commonColors.white, light: "rgba(77, 77, 77, 1)" },
      },
    },
    logoColor: {
      dark: "rgba(192, 192, 192, 1)",
      light: "rgba(83, 72, 141, 1)",
    },
    supportBox: {
      dark: "rgba(25, 40, 160, 1)",
      light: "rgba(50, 77, 221, 1)",
    },
  },
  glassColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
  BWColor: {
    light: commonColors.black,
    dark: commonColors.white,
  },
  BWColorRevert: {
    light: commonColors.white,
    dark: commonColors.black,
  },
  grayColor: {
    light: "rgba(84, 84, 84, 1)",
    dark: "rgba(204, 204, 204, 1)",
  },
  background: {
    dark: commonColors.darkGray,
    light: commonColors.lightGray,
  },
});

const getTheme = (isDarkMode) => {
  const colors = getColors(isDarkMode);

  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: {
        default: colors.background.dark,
        paper: "transparent",
      },
      primary: {
        main: commonColors.darkPurple,
        contrastText: commonColors.white,
      },
      secondary: {
        main: commonColors.lightPurple,
      },
      error: {
        main: "rgba(255, 102, 102, 1)",
      },
      success: {
        main: "rgba(0, 128, 0, 1)",
      },
      warning: {
        main: "rgba(255, 165, 0, 1)",
      },
    },
    components: {
      // Your component overrides here...
    },
    colors,
  });
};

export default getTheme;
