import React from "react";

const useAmountFormatter = () => {
  const cleanRegex = /[^\d]+/g;
  const maximum = 200000;
  const minimum = 0;

  const formatAmount = (value) => {
    const cleanValue = value.replaceAll(cleanRegex, '');
    let NEW_VALUE_NUMBER = Number(cleanValue) || minimum;

    if (NEW_VALUE_NUMBER < minimum) {
      NEW_VALUE_NUMBER = minimum;
    }

    if (NEW_VALUE_NUMBER > maximum) {
      NEW_VALUE_NUMBER = maximum;
    }

    return NEW_VALUE_NUMBER;
  };

  return { formatAmount };
};

export default useAmountFormatter;
