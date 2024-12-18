import { useEffect, useState } from 'react';

import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapIcon from '../../assets/icons/SwapIcon';
import Button from '../Button/Button';
import Label from '../Typography/Label';
import Paragraph from '../Typography/Paragraph';
import { getExchangeRateBy } from '../../api/exchangeRatesApi';

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PLN');
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    try {
      const valueFrom =
        fromCurrency === 'PLN' ? 1 : await getExchangeRateBy(fromCurrency);
      const valueTo =
        toCurrency === 'PLN' ? 1 : await getExchangeRateBy(toCurrency);

      if (valueFrom && valueTo) {
        const rate = ((valueFrom * amount) / valueTo).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      } else {
        setResult('Error calculating exchange rate.');
      }
    } catch (error) {
      console.log('Error durin rate calculation: ', error);
      setResult('Error calculating exchange rate.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchExchangeRate();
  };

  useEffect(() => fetchExchangeRate, []);

  return (
    <form
      className="converter__form form"
      onSubmit={handleFormSubmit}
    >
      <div className="form__form-group">
        <Label>Enter Amount</Label>
        <input
          type="number"
          className="form__form-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="form__form-group form-currency-group">
        <div className="form__form-section">
          <Label>From</Label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => {
              setFromCurrency(e.target.value);
            }}
          />
        </div>
        <div
          className="form__swap-icon"
          onClick={handleSwapCurrencies}
        >
          <SwapIcon />
        </div>
        <div className="form__form-section">
          <Label>To</Label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => {
              setToCurrency(e.target.value);
            }}
          />
        </div>
      </div>

      <Button
        type="submit"
        className={
          isLoading ? 'form__submit-button loading' : 'form__submit-button'
        }
      >
        Get Exchange Rate
      </Button>
      <Paragraph className="form__exchange-rate-result">
        {isLoading ? 'Getting exchange rate...' : result}
      </Paragraph>
    </form>
  );
};

export default ConverterForm;
