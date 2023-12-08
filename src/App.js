import logo from "./logo.svg";
import "./App.css";
import Weather from "./component/weather";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <h1>{t("weather")}</h1>
      {/* <h1>---Weather---</h1> */}
      <Weather />
    </div>
  );
}

export default App;
