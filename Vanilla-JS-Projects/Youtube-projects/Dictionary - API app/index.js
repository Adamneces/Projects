const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById('result');
const sound = document.getElementById('sound');

const btn = document.getElementById('search-btn');

btn.addEventListener('click', () => {
    let inputWord = document.getElementById('inp-word').value;
    fetch(`${url}${inputWord}`)
    .then((response) => 
        response.json()
    ).then((data) => {
        console.log(data[0]);
        result.innerHTML = `
        <div class="word">
                <h3>${inputWord}</h3>
                <button class="sound-btn" onclick="playSound()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 8a5 5 0 0 1 0 8" />
                    <path d="M17.7 5a9 9 0 0 1 0 14" />
                    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                  </svg>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
               <span>Synonyms:</span>
               ${data[0].meanings[0].synonyms[0]},
               ${data[0].meanings[0].synonyms[1]},
               ${data[0].meanings[0].synonyms[2]}
            </p>`
            sound.setAttribute('src', `${data[0].phonetics[0].audio}`);
            ;
    });
});
function playSound(){
    sound.play();
}