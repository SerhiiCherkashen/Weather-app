import React, { useEffect } from "react";
import "./weather.css";
import sun from "../img/sun.png";
import rain from "../img/rain.png";
import clouds from "../img/clouds.png";
import mist from "../img/mist.png";
import snow from "../img/snow.png";
import thunderstorm from "../img/thunderstorm.png";
import termometr from "../img/termometr.png";
import termHot from "../img/termHot.png";
import { changeSelect, fetchData } from "../reduxToolkit/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Weather = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const selectCity = useSelector((state) => state.weatherReducer.selectCity);
  const history = useSelector((state) => state.weatherReducer.history);
  const weather = useSelector((state) => state.weatherReducer.weather);
  const description = useSelector(
    (state) => state.weatherReducer.weather.description
  );
  const fetchCurrent = useSelector((state) => state.weatherReducer.current[0]);

  useEffect(() => {
    dispatch(fetchData(fetchCurrent));
  });

  return (
    <div className="wrapperW">
      <div className="select-weather-W">
        <div>
          <select
            onChange={(e) => {
              let action = e.target.value;
              dispatch(changeSelect(action));
            }}
            className="selW">
            {selectCity.map((element) => {
              return <option>{element.city}</option>;
            })}
          </select>
        </div>
        <div className="forecast-weather-W">
          <h1>{t("forecast")}</h1>
          <div className="forecast-counters">
            <div>
              <h1> {description} </h1>
              <h1>
                {t("temp")}: {(weather.temp - 273.15).toFixed(1)} C
              </h1>
            </div>
            <div>
              <h1>
                {t("windSpeed")} : {weather.wind} {t("mSec")}
              </h1>
              <h1>
                {t("humidity")} : {weather.humidity} %
              </h1>
            </div>
          </div>
          {weather.temp - 273.15 > 10 ? (
            <img src={termHot} className="sky-img" />
          ) : (
            <img src={termometr} className="sky-img" />
          )}
          {weather.id > 800 ? (
            <img src={clouds} className="sky-img" />
          ) : weather.id === 800 ? (
            <img src={sun} className="sky-img" />
          ) : weather.id >= 700 ? (
            <img src={mist} className="sky-img" />
          ) : weather.id >= 600 ? (
            <img src={snow} className="sky-img" />
          ) : weather.id >= 500 ? (
            <img src={rain} className="sky-img" />
          ) : weather.id >= 200 ? (
            //
            <img src={thunderstorm} className="sky-img" />
          ) : (
            "sss"
          )}
        </div>
      </div>
      <div className="storyW">
        <button
          className="languageButton"
          onClick={() => i18n.changeLanguage("ua")}>
          UA
        </button>
        <button
          className="languageButton"
          onClick={() => i18n.changeLanguage("us")}>
          US
        </button>
        <h1>{t("story")}</h1>
        {}
        {history.map((element, index) => {
          if (index === 0) {
            return <div className="boxStory o">{element}</div>;
          } else return <div className="boxStory">{element}</div>;
        })}
      </div>
    </div>
  );
};

export default Weather;
