const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', eventListener => {
    eventListener.preventDefault();
    submit();
});

async function submit() {
    const artist = document.querySelector('#artist');
    const song = document.querySelector('#song');
    const lyrics = document.querySelector('#lyrics');

    loadingIcon(lyrics);   

    try {
        const lyricsResponse = await lyricSearch(artist.value, song.value);
        const data = await lyricsResponse.json();
        if (data.lyrics) {
            lyrics.innerHTML = data.lyrics;
        } else {
            lyrics.innerHTML = data.error;
        }
    } catch (err) {
        console.log(err);
    }
}

function loadingIcon(lyrics) {
    lyrics.innerHTML = '<div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div>';
}

function lyricSearch(artist, song) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}
