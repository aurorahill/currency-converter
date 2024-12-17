import './App.css';
import ConverterForm from './components/ConverterForm/ConverterForm';

function App() {
  return (
    <div className="converter">
      <h2 className="converter__title">Currency converter</h2>
      <ConverterForm />
    </div>
  );
}

export default App;
