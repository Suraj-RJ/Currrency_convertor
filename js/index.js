const calculateButton = document.getElementById("calculate");
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from");
const toCurrencySelect = document.getElementById("to");
const outputElement = document.getElementById("output");

calculateButton.addEventListener("click", () => {
  const amount = amountInput.value;
  const from = fromCurrencySelect.value;
  const to = toCurrencySelect.value;

  // Check if the input amount is valid
  if (amount <= 0) {
    alert("Invalid amount. Please enter a positive value.");
    return;
  }

  // Fetch the exchange rates from an external API
  fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${from}`)
    .then((res) => res.json())
    .then((response) => {
      const conversionRate = response.conversion_rates[to];
      if (conversionRate !== undefined) {
        const result = (amount * conversionRate).toFixed(2);
        outputElement.textContent = `${amount} ${from} = ${result} ${to}`;
        outputElement.style.display = "block"; // Display the result
      } else {
        alert("Invalid currency selection. Please try again.");
      }
    })
    .catch((e) => {
      alert("Something went wrong. Please try again later.");
    });
});
