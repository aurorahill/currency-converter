import CurrencySelect from '../CurrencySelect/CurrencySelect';
import SwapIcon from '../../assets/icons/SwapIcon';
import Button from '../Button/Button';
import Label from '../Typography/Label';
import Paragraph from '../Typography/Paragraph';
import useConverterForm from './useConverterForm';

const ConverterForm = () => {
  const {
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
  } = useConverterForm();

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
        className={buttonDynamicClassName}
      >
        Get Exchange Rate
      </Button>
      <Paragraph className="form__exchange-rate-result">{formResult}</Paragraph>
    </form>
  );
};

export default ConverterForm;
