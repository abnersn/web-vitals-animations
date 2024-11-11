import "./App.css";

import LCP from "./components/WebVitalsAnimations/LCP";
import CLS from "./components/WebVitalsAnimations/CLS";
import INP from "./components/WebVitalsAnimations/INP";
import MLS from "./components/WebVitalsAnimations/MLS";

function App() {
  return (
    <div className="App">
      <h1>Web Vitals animations</h1>
      <LCP />
      <CLS />
      <INP />
      <MLS />
    </div>
  );
}

export default App;
