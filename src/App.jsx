import "./App.css";
import LCP from "./components/WebVitalsAnimations/LCP";
import CLS from "./components/WebVitalsAnimations/CLS";
import INP from "./components/WebVitalsAnimations/INP";

function App() {
  return (
    <div className="App">
      <h1>Web Vitals animations</h1>
      <LCP />
      <CLS />
      <INP />
    </div>
  );
}

export default App;
