const API_URL = `https://api.nbp.pl/api/exchangerates/rates/A`;

export const getExchangeRateBy = async (currency) => {
  try {
    const response = await fetch(`${API_URL}/${currency}`);
    if (!response.ok) {
      throw Error(`Error fetching exchange rate for ${currency}`);
    }
    const data = await response.json();
    return data.rates[0].mid;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
