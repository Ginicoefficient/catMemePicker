import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);
memeModalCloseBtn.addEventListener("click", function () {
  memeModal.style.display = "none";
});
getImageBtn.addEventListener("click", renderCat);

//changes highlight style for only html option that is selected
function highlightCheckedOption(e) {
  //all elements with class radio
  const radios = document.getElementsByClassName("radio");
  //iterate through all those elements
  for (let radio of radios) {
    //for each item, remove highlight class
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

// renders the correct cat object image into the modal, makes visible
function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `<img 
  class="cat-img" 
  src="/images/${catObject.image}"
  alt="${catObject.alt}"
  >`;
  memeModal.style.display = "flex";
}

//gets a single matching cat object based on user input
function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const n = Math.floor(Math.random() * catsArray.length - 1);
    return catsArray[n];
  }
}

//gets an array of all cat objects that match user input
function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;

    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif === true;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

//Creates array of all emotions from data
function getEmotionsArray(cats) {
  const catEmotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (catEmotionsArray.includes(emotion) != true) {
        //could also use !catEmotionArray.include(emotion)
        catEmotionsArray.push(emotion);
      }
    }
  }
  return catEmotionsArray;
}

//renders out all the emotion options into the html
function renderEmotionsRadios(cats) {
  let emotionText = "";
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    emotionText += `<div class="radio"> 
      <label for="${emotion}">${emotion}</label>
      <input
        type = "radio"
        id = "${emotion}"
        value = "${emotion}"
        name = "emotions">
      </input>
    </div>`;
  }
  emotionRadios.innerHTML = emotionText;
}

renderEmotionsRadios(catsData);
