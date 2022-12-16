import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");

getImageBtn.addEventListener("click", getMatchingCatsArray);
emotionRadios.addEventListener("change", highlightCheckedOption);

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedRadio = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    console.log(selectedRadio);
  }
}

//can use ctrl f5 to view console wo debug
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
