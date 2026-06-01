import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// React
import { useEffect, useState } from "react";
// Extrnal Libraries
import axios from "axios";
import moment from "moment"; // Clean standard import
import "moment/min/locales"; // Loads all languages including ar-ly
import { useTranslation } from "react-i18next";

// Compnant for Matril UI
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudySnowingIcon from "@mui/icons-material/CloudySnowing";
import Button from "@mui/material/Button";
import { useRadioGroup } from "@mui/material/RadioGroup";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM", "sans-serif"].join(","),
  },
});
let cancelAxios = null;
moment.locale("ar");
function App() {
  // States
  const { t, i18n } = useTranslation();
  const [dataAndTime, setDataAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    min: null,
    max: null,
    description: "",
    icon: "",
  });
  const [locale, setLocale] = useState("ar");
  const direction = locale === "ar" ? "rtl" : "ltr";
  // Event Handlers
  function handleLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDataAndTime(moment().format("D MMMM YYYY، h:mm:ss a"));
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    setDataAndTime(moment().format("D MMMM YYYY، h:mm:ss a"));

    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=345da89c6ee741fabcb162818262705&q=Egypt&days=1&aqi=no&alerts=no",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.current.temp_c);
        const min = Math.round(
          response.data.forecast.forecastday[0].day.mintemp_c,
        );
        const max = Math.round(
          response.data.forecast.forecastday[0].day.maxtemp_c,
        );
        const description = response.data.current.condition.text;
        const icon = response.data.current.condition.icon;

        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: `https:${icon}`,
        });
      })
      .catch(function (error) {
        console.error("Error fetching temperature values:", error);
      });
    return () => {
      cancelAxios();
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Cotnent Container */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* Card */}
            <div
              style={{
                background: "rgb(28 52 91 /36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)|",
                width: "100%",
              }}
              dir={direction}
            >
              {/* Content */}
              <div>
                {/* City & Time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    padding: "15px",
                  }}
                >
                  <Typography
                    variant="h2"
                    style={{ margin: "0 20px 0 20px", fontWeight: 600 }}
                  >
                    {t("Egypt")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dataAndTime}
                  </Typography>
                </div>
                {/*-- City & Time-- */}
                <hr />
                {/* Degree & Description */}
                {/* Container of Degree + Cloud Icon */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "10px",
                  }}
                >
                  <div>
                    {/* Temp */}
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

                      <img src={temp.icon} />
                    </div>
                    {/* --Temp --*/}
                    <Typography variant="h6">{t(temp.description)}</Typography>
                    {/* Min & Max */}
                    <div
                      style={{
                        display: "flex",
                        textJustify: "space-between",
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
                    {/* --Min & Max --*/}
                  </div>

                  {/* --Degree & Description-- */}
                  <CloudySnowingIcon
                    style={{ fontSize: "220px", color: "white" }}
                  />
                </div>
                {/*-- Container of Degree + Cloud Icon -- */}
              </div>
              {/* --Content--- */}
            </div>
            {/* --Card-- */}
            {/* Translation Contaniner */}
            <div
              dir={direction}
              style={{
                width: "100%",
                marginTop: "20px",
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
            {/*---- Translation Contaniner-- */}
          </div>
          {/* ---- Cotnent Container --- */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
