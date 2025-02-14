export const getCurrencySymbol = (currencyCode: string): string => {
  return (0)
    .toLocaleString("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
};
