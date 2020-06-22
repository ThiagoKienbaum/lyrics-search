const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', eventListener => {
    eventListener.preventDefault();
    submit();
});

function submit() {
    const artist = document.querySelector('#artist');
    const song = document.querySelector('#song');
    const lyrics = document.querySelector('#lyrics');

    loadingIcon(lyrics);
    lyricSearch(artist.value, song.value)
        .then(response => response.json())
        .then(data => {
            if (data.lyrics) {
                lyrics.innerHTML = data.lyrics;
            } else {
                lyrics.innerHTML = data.error;
            }
        }, err => {
            lyrics.innerHTML = "Error loading lyrics"
            console.error(err)
        })
}

function loadingIcon(lyrics) {
    lyrics.innerHTML = '<div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div>';
}

function lyricSearch(artist, song) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}
