const nepaliText = document.getElementById("nepali_text");
const englishText = document.getElementById("english_text");
const translateButton = document.getElementById("translate-button");

translateButton.addEventListener("click", async () => {
  const input = nepaliText.value.trim();

  if (!input) {
    alert("Please enter some text to translate.");
    return;
  }

  try {
    translateButton.textContent = "Translating...";
    translateButton.disabled = true;

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: input,
        source: "ne",
        target: "en",
        format: "text"
      })
    });

    if (!response.ok) {
      throw new Error("Translation service is currently unavailable.");
    }

    const data = await response.json();

    if (data && data.translatedText) {
      englishText.value = data.translatedText;
    } else {
      alert("Translation failed. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during translation. Please try again later.");
  } finally {
    translateButton.textContent = "Translate";
    translateButton.disabled = false;
  }
});