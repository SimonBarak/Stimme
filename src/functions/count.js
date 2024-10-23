const MINIMAL_CHARGE = 20;
const CHARGE_PER_HARACTER = 0.01;

export const countPrice = (text) => {
  const length = text.length;
  const rawPrice = length * CHARGE_PER_HARACTER;
  const priceRound = Math.round(rawPrice);
  const trashHoldPrice =
    priceRound > MINIMAL_CHARGE ? priceRound : MINIMAL_CHARGE;
  return trashHoldPrice;
};

export const getPlainText = (schema) => {
  const paragrafs = schema.map(({ children }) => {
    const lines = children.map(({ text }) => text);
    return lines.join(" ");
  });

  const plainText = paragrafs.join(" ");

  return plainText;
};
