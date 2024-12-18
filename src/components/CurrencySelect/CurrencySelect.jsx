// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { currencyCodes } from '../../consts/currencyCodes';

const CurrencySelect = ({ selectedCurrency, handleCurrency }) => {
  const countryCode = selectedCurrency.substring(0, 2);
  // const [currencyCodes, setCurrencyCodes] = useState([]);

  // const currencyCodesAPI = async () => {
  //   const API_URL_CODES = `https://api.nbp.pl/api/exchangerates/tables/a/`;

  //   try {
  //     const response = await fetch(API_URL_CODES);
  //     if (!response.ok) throw Error('Something went wrong!');
  //     const data = await response.json();
  //     let currencyCodes = [];
  //     data[0].rates.forEach((element) => {
  //       currencyCodes.push(element.code);
  //     });
  //     currencyCodes.push('PLN');
  //     currencyCodes = currencyCodes.filter((el) => el !== 'XDR');
  //     const sortedCodes = currencyCodes.sort();
  //     setCurrencyCodes(sortedCodes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => currencyCodesAPI, []);
  // console.log(currencyCodes);

  return (
    <div className="form__currency-select currency-select">
      <img
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        alt="Flag"
      />
      <select
        onChange={handleCurrency}
        className="currency-select__currency-dropdown"
        value={selectedCurrency}
      >
        {currencyCodes.map((currency) => (
          <option
            key={currency}
            value={currency}
          >
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;

CurrencySelect.propTypes = {
  selectedCurrency: PropTypes.string.isRequired,
  handleCurrency: PropTypes.func.isRequired,
};
