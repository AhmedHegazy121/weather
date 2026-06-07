import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// Components for Material UI
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudySnowingIcon from "@mui/icons-material/CloudySnowing";
import Button from "@mui/material/Button";

// Dropdown Selector Components from Material UI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherApiSlice";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM", "sans-serif"].join(","),
  },
  // Customizing Material UI Input styles to blend with your dark blue theme
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.7)",
          "&.Mui-focused": {
            color: "white",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "white",
        },
      },
    },
  },
});

moment.locale("ar");

function App() {
  const dispatch = useDispatch();

  // Safe Redux state extractor
  const {
    data: temp,
    isLoading,
    error,
  } = useSelector((state) => state.weather);

  // States
  const { t, i18n } = useTranslation();
  const [dataAndTime, setDataAndTime] = useState("");
  const [locale, setLocale] = useState("ar");
  const direction = locale === "ar" ? "rtl" : "ltr";

  // State to hold the current selected country name
  const [country, setCountry] = useState("Egypt");

  // Expanded list of 11 countries
  const countries = [
    { en: "Egypt", ar: "مصر" },
    { en: "Saudi Arabia", ar: "السعودية" },
    { en: "United Arab Emirates", ar: "الإمارات" },
    { en: "Jordan", ar: "الأردن" },
    { en: "Kuwait", ar: "الكويت" },
    { en: "Qatar", ar: "قطر" },
    { en: "Oman", ar: "عُمان" },
    { en: "Bahrain", ar: "البحرين" },
    { en: "France", ar: "فرنسا" },
    { en: "United States", ar: "أمريكا" },
    { en: "United Kingdom", ar: "بريطانيا" },
  ];

  // Event Handlers
  function handleLanguageClick() {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
    i18n.changeLanguage(nextLocale);
    moment.locale(nextLocale);
    setDataAndTime(moment().format("D MMMM YYYY، h:mm:ss a"));
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  // Effect tracks both locale changes AND country switches dynamically
  useEffect(() => {
    const promise = dispatch(fetchWeather({ city: country, lang: locale }));
    setDataAndTime(moment().format("D MMMM YYYY، h:mm:ss a"));

    return () => {
      promise.abort();
    };
  }, [dispatch, locale, country]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* Material‑UI Dropdown Selector Container */}
            <Box sx={{ width: "100%", mt: 3 }} dir={direction}>
              <FormControl fullWidth>
                <InputLabel id="country-select-label">
                  {locale === "ar" ? "اختر الدولة" : "Select Country"}
                </InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  value={country}
                  label={locale === "ar" ? "اختر الدولة" : "Select Country"}
                  onChange={handleCountryChange}
                  sx={{
                    textAlign: locale === "ar" ? "right" : "left",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      // Fixed padding structure to prevent the selected text from disappearing or overlapping
                      paddingLeft: locale === "ar" ? "14px !important" : "14px",
                      paddingRight:
                        locale === "ar" ? "32px !important" : "32px",
                    },
                    // Ensures the dropdown arrow icon flips sides correctly based on language direction
                    "& .MuiSelect-icon": {
                      right: locale === "ar" ? "unset" : "7px",
                      left: locale === "ar" ? "7px" : "unset",
                    },
                  }}
                >
                  {countries.map((c) => (
                    <MenuItem
                      key={c.en}
                      value={c.en}
                      sx={{
                        direction: direction,
                        justifyContent:
                          locale === "ar" ? "flex-end" : "flex-start",
                      }}
                    >
                      {locale === "ar" ? c.ar : c.en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Card Layout */}
            <div
              style={{
                background: "rgb(28 52 91 /36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
                width: "100%",
                marginTop: "100px",
              }}
              dir={direction}
            >
              <div>
                {/* City Title & Time Display */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    padding: "15px",
                  }}
                >
                  <Typography
                    variant="h3"
                    style={{ margin: "0 20px 0 20px", fontWeight: 500 }}
                  >
                    {t(country)}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dataAndTime}
                  </Typography>
                </div>
                <hr />

                {/* Conditional UI Engine: Loading Spinner */}
                {isLoading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "50px",
                    }}
                  >
                    <CircularProgress style={{ color: "white" }} />
                  </div>
                )}

                {/* Conditional UI Engine: Error Handling */}
                {error && (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <Typography color="error">
                      {t("Failed to load weather data.")}
                    </Typography>
                  </div>
                )}

                {/* Main Weather Information Display Layout */}
                {!isLoading && temp && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      padding: "10px",
                    }}
                  >
                    <div>
                      {/* Temp Degree */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h1" style={{ textAlign: "right" }}>
                          {temp.number}
                        </Typography>
                        <img src={temp.icon} alt={temp.description} />
                      </div>

                      {/* Description */}
                      <Typography variant="h6">{temp.description}</Typography>

                      {/* Min & Max Limits */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h5>
                          {t("Min")}: {temp.min}
                        </h5>
                        <h5 style={{ margin: "0px 35px" }}>|</h5>
                        <h5>
                          {t("Max")}: {temp.max}
                        </h5>
                      </div>
                    </div>

                    <CloudySnowingIcon
                      style={{ fontSize: "220px", color: "white" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Translation Action Toggler Container */}
            <div
              dir={direction}
              style={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                style={{ color: "white", textTransform: "capitalize" }}
                variant="text"
                onClick={handleLanguageClick}
              >
                {locale === "en" ? "عربى" : "English"}
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
