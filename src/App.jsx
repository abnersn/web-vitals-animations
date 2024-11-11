import './App.css';
import LCP from './components/LCP';
import CLS from './components/CLS';

function App() {
  return (
    <div className="App">
      <h1>Web Vitals animations</h1>
      <LCP />
      <CLS />
    </div>
  );
}

export default App;
