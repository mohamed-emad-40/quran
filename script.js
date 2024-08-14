const apiurl = "https://mp3quran.net/api/v3";
const reciters = "reciters";
const language = "ar";

async function getResiters() {
  const chooseresiter = document.querySelector("#choosereciter");
  const res = await fetch(`${apiurl}/reciters?language=${language}`);
  const data = await res.json();

  data.reciters.forEach((reciter) => {
    chooseresiter.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`;
  });

  chooseresiter.addEventListener("change", (e) => getmoshaf(e.target.value));
}
getResiters();

async function getmoshaf(reciter) {
  const choosemoshaf = document.querySelector("#choosemoshaf");
  const res = await fetch(
    `${apiurl}/reciters?language=${language}&reciter=${reciter}`
  );
  const data = await res.json();
  const moshafs = data.reciters[0].moshaf;
  moshafs.forEach((moshaf) => {
    choosemoshaf.innerHTML += `<option value="${moshaf.id}"  data-server="${moshaf.server}" data-surahList="${moshaf.surah_list}">${moshaf.name}</option>`;
  });
  choosemoshaf.addEventListener("change", (e) => {
    const selectedmoshaf = choosemoshaf.options[choosemoshaf.selectedIndex];
    const surahserver = selectedmoshaf.dataset.server;
    const surahlist = selectedmoshaf.dataset.surahlist;

    getsurah(surahserver, surahlist);
  });
}
async function getsurah(surahserver, surahlist) {
  const choosesurah = document.querySelector("#choosesurah");
  const res = await fetch("https://mp3quran.net/api/v3/suwar");
  const data = await res.json();
  const surahnames = data.suwar;
  surahlist = surahlist.split(",");
  surahlist.forEach((surah) => {
    const padsurah = surah.padStart(3, "0");
    surahnames.forEach((surahname) => {
      if (surahname.id == surah) {
        choosesurah.innerHTML += `<option value="${surahserver}${padsurah}.mp3">${surahname.name}</option>`;
      }
    });
  });

  choosesurah.addEventListener("change", (e) => {
    const selectedsurah = choosesurah.options[choosesurah.selectedIndex];

    playsurah(selectedsurah.value);
  });
}
function playsurah(surahMp3) {
  const audioplayer = document.querySelector("#audioplayer");
  audioplayer.src = surahMp3;
  audioplayer.play();
}
