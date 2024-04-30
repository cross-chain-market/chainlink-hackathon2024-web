export const shortAddress = (address: string) => {
  return address.slice(0, 7) + "....." + address.slice(-5);
};

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
};

export const getDigits = (number: number | string) => {
  const numStr = String(number);

  // Split the string into an array of characters
  const digitsArray = numStr.split("");

  // Map each character back to a number
  return digitsArray.map((digit) => Number(digit));
};

  return date.getTime() > Date.now();
}
