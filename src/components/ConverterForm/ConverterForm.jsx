import CurrencySelect from "../CurrencySelect/CurrencySelect";
import SwapIcon from "../../assets/icons/SwapIcon";
import Button from "../Button/Button";
import Label from "../Typography/Label";
import Paragraph from "../Typography/Paragraph";
import useConverterForm from "./useConverterForm";
import styles from "./ConverterForm.module.scss";

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
      className={`${styles.form}`}
      onSubmit={handleFormSubmit}
    >
      <div className={`${styles["form__form-group"]}`}>
        <Label>Enter Amount</Label>
        <input
          type="number"
          className={`${styles["form__form-input"]}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className={`${styles["form__currency-group"]}`}>
        <div className={`${styles["form__form-section"]}`}>
          <Label>From</Label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => {
              setFromCurrency(e.target.value);
            }}
          />
        </div>
        <div
          className={`${styles["form__swap-icon"]}`}
          onClick={handleSwapCurrencies}
        >
          <SwapIcon />
        </div>
        <div className={`${styles["form__form-section"]}`}>
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
      <Paragraph className={`${styles["form__exchange-rate-result"]}`}>
        {formResult}
      </Paragraph>
    </form>
  );
};

export default ConverterForm;
