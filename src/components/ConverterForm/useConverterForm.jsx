import { useEffect, useState, useCallback } from "react";
import { getExchangeRateBy } from "../../api/exchangeRatesApi";
import styles from "../Button/Button.module.scss";

const useConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PLN");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formResult = isLoading ? "Getting exchange rate..." : result;
  const buttonDynamicClassName = isLoading
    ? `${styles["submit-button"]} ${styles["loading"]}`
    : styles["submit-button"];

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fetchExchangeRate = useCallback(async () => {
    setIsLoading(true);
    try {
      const valueFrom =
        fromCurrency === "PLN" ? 1 : await getExchangeRateBy(fromCurrency);
      const valueTo =
        toCurrency === "PLN" ? 1 : await getExchangeRateBy(toCurrency);

      if (valueFrom && valueTo) {
        const rate = ((valueFrom * amount) / valueTo).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      } else {
        setResult("Error calculating exchange rate.");
      }
    } catch (error) {
      console.log("Error durin rate calculation: ", error);
      setResult("Error calculating exchange rate.");
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetchExchangeRate;
  }, [fetchExchangeRate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchExchangeRate();
  };

  return {
    amount,
    buttonDynamicClassName,
    formResult,
    fromCurrency,
    handleFormSubmit,
    handleSwapCurrencies,
    toCurrency,
    setAmount,
    setFromCurrency,
    setToCurrency,
  };
};

export default useConverterForm;
