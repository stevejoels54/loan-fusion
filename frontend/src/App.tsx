import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import { useEffect } from "react";
import { useAppStore } from "./config/stores";
import UnderDevelopment from "./components/common/UnderDevelopment";
import Loans from "./containers/loans/Loans";

function App() {
  const appStore = useAppStore();
  const { activeApplication } = appStore;

  useEffect(() => {
    document.title = `Loan Fusion - ${activeApplication}`.toLocaleUpperCase();
  }, [activeApplication]);

  if (activeApplication === "loans") {
    return <MainLayout children={<Loans />} />;
  } else {
    return <MainLayout children={<UnderDevelopment />} />;
  }
}

export default App;
