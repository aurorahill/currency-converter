import styles from "./App.module.scss";
import ConverterForm from "./components/ConverterForm/ConverterForm";

function App() {
  return (
    <div className={styles.converter}>
      <h2 className={styles.converter__title}>Currency converter</h2>
      <ConverterForm />
    </div>
  );
}

export default App;
