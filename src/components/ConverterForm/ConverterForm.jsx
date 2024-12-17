import { useEffect, useState } from 'react';

import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapIcon from '../../assets/icons/SwapIcon';
import Button from '../Button/Button';
import Label from '../Typography/Label';
import Paragraph from '../Typography/Paragraph';

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

  const getExchangeRate = async () => {
    const API_URL_FROM = `https://api.nbp.pl/api/exchangerates/rates/A/${fromCurrency}/`;

    const API_URL_TO = `https://api.nbp.pl/api/exchangerates/rates/A/${toCurrency}/`;

    setIsLoading(true);

    try {
      if (fromCurrency === 'PLN') {
        const value_from = 1;
        let value_to;
        try {
          const response_to = await fetch(API_URL_TO);
          if (!response_to.ok)
            throw Error('Something went wrong with API call for value_to');
          const data_to = await response_to.json();
          value_to = data_to.rates[0].mid;
        } catch (error) {
          console.log(error);
        }
        const rate = ((value_from * amount) / value_to).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      } else if (toCurrency === 'PLN') {
        const response_from = await fetch(API_URL_FROM);
        if (!response_from.ok)
          throw Error('Something went wrong with API call for value_from');

        const data_from = await response_from.json();
        const value_from = data_from.rates[0].mid;
        const value_to = 1;
        const rate = ((value_from * amount) / value_to).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      } else {
        const response_from = await fetch(API_URL_FROM);
        if (!response_from.ok)
          throw Error('Something went wrong with API call for value_from');

        const data_from = await response_from.json();
        const value_from = data_from.rates[0].mid;
        let value_to;
        try {
          const response_to = await fetch(API_URL_TO);
          if (!response_to.ok)
            throw Error('Something went wrong with API call for value_to');
          const data_to = await response_to.json();
          value_to = data_to.rates[0].mid;
        } catch (error) {
          console.log(error);
        }
        const rate = ((value_from * amount) / value_to).toFixed(2);
        setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };

  useEffect(() => getExchangeRate, []);

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
