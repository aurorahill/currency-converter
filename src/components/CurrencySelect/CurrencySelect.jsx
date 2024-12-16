import PropTypes from "prop-types";
import { currencyCodes } from "../../consts/currencyCodes";

export const CurrencySelect = ({ selectedCurrency, handleCurrency }) => {
  const countryCode = selectedCurrency.substring(0, 2);

  return (
    <div className="form__currency-select currency-select">
      <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="flag" />
      <select
        value={selectedCurrency}
        onChange={handleCurrency}
        className="currency-select__currency-dropdown"
      >
        {currencyCodes.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrencySelect.propTypes = {
  selectedCurrency: PropTypes.string.isRequired,
  handleCurrency: PropTypes.func.isRequired,
};
