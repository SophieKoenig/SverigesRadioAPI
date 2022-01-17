let fetchApi = () => {
  fetch("http://api.sr.se/api/v2/channels?mp3&format=json")
    .then((response) => response.json())
    .then((data) => audioPicFunction(data));
};
fetchApi();

//function to use data from API --> not useable outside of "fetchApi" or "picLoop"
function audioPicFunction(data) {
  /////////////////////////////////VISIBLE AUDIOPLAYER////////////////////////////////////////////////////////////////////////
  let radioURL = document.getElementById("radioPlayerContainer");
  radioURL.innerHTML = `<audio
    id="radioPlayer"
    controls
    src="${data.channels[0].liveaudio.url}"
    type="audio/mpeg"
  ></audio>`;
  //is set to first radio-URL

  //making data visible in console to know where is what
  console.log(data);

  ////////////////////////////////FOR LOOP TO GET ALL IMAGES FROM API/////////////////////////////////////////////////////////
  for (let i = 0; i < data.channels.length; i++) {
    let radioPic = document.getElementById("radioPicContainer");
    radioPic.innerHTML += `<img id="imageRadio_${i}" src="${data.channels[i].image}" alt="logo of ${data.channels[i].name}" />`; //"i" needed because to get into loop index
  }
  //imageRadio${i} --> collects the different indexes of the array --> connect the picture to the array-index

  ///////////////////////////////FOR LOOP TO GET ID FROM HTML + SET URL IN VISIBLE PLAYER/////////////////////////////////
  for (let i = 0; i < data.channels.length; i++) {
    document
      .getElementById(`imageRadio_${i}`)
      .addEventListener("click", function () {
        data.channels[this.id.split("_")[1]].liveaudio.url; //the item in the square brackets are "i" --> whole line is the source which is connected to the radiostation which is connected to the image that has been clicked
        radioURL.innerHTML = `<audio
        id="radioPlayer"
        controls
        autoplay
        src="${data.channels[this.id.split("_")[1]].liveaudio.url}"
        type="audio/mpeg"
      ></audio>`;

        //this.id.split("_")[1]; //the line is referring to the i in the previous for-loop //so it knows which is pressed
      });
  }
}
//gettingStuff(); //don't need this cause I am "calling" the function in "fetchApi"

//`<a id="pictureLink" href="${data.channels[i].liveaudio.url}"><button><img id="imageRadio${i}" src="${data.channels[i].image}" alt="logo of ${data.channels[i].name}" /><button></a>`;
