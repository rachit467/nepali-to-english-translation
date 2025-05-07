const translateButton = document.getElementById('translate-button');
const englishText = document.getElementById('english_text');
const nepaliText = document.getElementById('nepali_text');

const API_URL = 'your_api_endpoint';
const HEADERS = { 'Content-Type': 'application/json' };

// Pointer movement handler for dynamic styling
const syncPointer = ({ x: pointerX, y: pointerY }) => {
  const x = pointerX.toFixed(2);
  const y = pointerY.toFixed(2);
  const xp = (pointerX / window.innerWidth).toFixed(2);
  const yp = (pointerY / window.innerHeight).toFixed(2);
  document.documentElement.style.setProperty('--x', x);
  document.documentElement.style.setProperty('--xp', xp);
  document.documentElement.style.setProperty('--y', y);
  document.documentElement.style.setProperty('--yp', yp);
};
document.body.addEventListener('pointermove', syncPointer);

translateButton.addEventListener('click', async () => {
  const textToTranslate = nepaliText.value.trim();

  if (!textToTranslate) {
    alert('Please enter Nepali text to translate.');
    return;
  }

  try {
    translateButton.textContent = 'Translating...';
    translateButton.disabled = true;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        text: textToTranslate,
        sourceLanguage: 'ne', // Nepali language code
        targetLanguage: 'en', // English language code
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.translatedText;

    if (translatedText) {
      englishText.value = translatedText;
    } else {
      alert('Translation failed. Please try again later.');
    }
  } catch (error) {
    console.error('Error translating text:', error);
    alert('An error occurred during translation. Please try again later.');
  } finally {
    translateButton.textContent = 'Translate';
    translateButton.disabled = false;
  }
});
