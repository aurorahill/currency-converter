import { useEffect, useState } from "react";
import { getExchangeRateBy } from "../../api/exchangeRatesApi";

export const useConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PLN");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const buttonDynamicClassName = isLoading
    ? "form__submit-button loading"
    : "form__submit-button";
  const formResult = isLoading ? "Getting exchange rate..." : result;

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchExchangeRate();
  };

  const fetchExchangeRate = async () => {
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
      console.error("Error during rate calculation:", error);
      setResult("Error calculating exchange rate.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    amount,
    isLoading,
    formResult,
    toCurrency,
    fromCurrency,
    buttonDynamicClassName,
    setAmount,
    setToCurrency,
    setFromCurrency,
    handleFormSubmit,
    handleSwapCurrencies,
  };
};
