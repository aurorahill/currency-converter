import { SwapIcon } from "../../assets/icons/SwapIcon";
import { Button } from "../Button/Button";
import { CurrencySelect } from "../CurrencySelect/CurrencySelect";
import { Label } from "../Typography/Label";
import { Paragraph } from "../Typography/Paragraph";
import { useConverterForm } from "./useConverterForm";

export const ConverterForm = () => {
  const {
    amount,
    toCurrency,
    formResult,
    fromCurrency,
    buttonDynamicClassName,
    setAmount,
    setToCurrency,
    setFromCurrency,
    handleFormSubmit,
    handleSwapCurrencies,
  } = useConverterForm();

  return (
    <form className="converter__form form" onSubmit={handleFormSubmit}>
      <div className="form__form-group">
        <Label className="form__form-label">Enter Amount</Label>
        <input
          type="number"
          className="form__form-input"
          value={amount}
          onChange={({ target: { value } }) => setAmount(value)}
          required
        />
      </div>

      <div className="form__form-group form-currency-group">
        <div className="form__form-section">
          <Label className="form__form-label">Form</Label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={({ target: { value } }) => {
              setFromCurrency(value);
            }}
          />
        </div>
        <div className="form__swap-icon" onClick={handleSwapCurrencies}>
          <SwapIcon />
        </div>
        <div className="form__form-section">
          <Label className="form__form-label">To</Label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={({ target: { value } }) => {
              setToCurrency(value);
            }}
          />
        </div>
      </div>

      <Button type="submit" className={buttonDynamicClassName}>
        Get Exchange Rate
      </Button>
      <Paragraph className={"form__exchange-rate-result"}>
        {formResult}
      </Paragraph>
    </form>
  );
};
