const exchangeRatesURL = "https://api.nbp.pl/api/exchangerates/rates/A";

export const getExchangeRateBy = async (currency) => {
  try {
    const response = await fetch(`${exchangeRatesURL}/${currency}/`);
    if (!response.ok) {
      throw new Error(`Error fetching exchange rate for ${currency}`);
    }
    const data = await response.json();
    return data.rates[0].mid;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
