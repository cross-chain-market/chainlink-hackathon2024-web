export const getEthPrice = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        const ethPrice = data.ethereum.usd;
        console.log(`Current ETH price: $${ethPrice}`);
        return ethPrice;
      } catch (error) {
        console.error('Error fetching ETH price:', error);
        return null;
      }
}