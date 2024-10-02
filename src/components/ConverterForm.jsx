import { useEffect, useState } from 'react';

import CurrencySelect from './CurrencySelect';

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
        <label className="form__form-label">Enter Amount</label>
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
          <label className="form__form-label">From</label>
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
          <svg
            width="16"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>
        <div className="form__form-section">
          <label className="form__form-label">To</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => {
              setToCurrency(e.target.value);
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        className={
          isLoading ? 'form__submit-button loading' : 'form__submit-button'
        }
      >
        Get Exchange Rate
      </button>
      <p className="form__exchange-rate-result">
        {isLoading ? 'Getting exchange rate...' : result}
      </p>
    </form>
  );
};

export default ConverterForm;
