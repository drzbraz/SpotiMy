let playlist = []

// carregamento da playlist
onload = () => {
  const musics = JSON.parse(localStorage.getItem('playlist'))
  if (musics) playlist = musics
  showPlaylist()
  document.querySelector('#inputArtist').oninput = watchField
  document.querySelector('#inputMusic').oninput = watchField
  document.querySelector('#inputUrl').oninput = watchField
  document.querySelector('#inputChangeArtist').oninput = watchFieldChange
  document.querySelector('#inputChangeMusic').oninput = watchFieldChange
  document.querySelector('#inputChangeUrl').oninput = watchFieldChange
  document.querySelector('#inputUrl').onkeypress = (e) => {
    if (e.key == 'Enter') newMusic()
  }
  document.querySelector('#inputChangeUrl').onkeypress = (e) => {
    if (e.key == 'Enter') saveChanges()
  }

  document.querySelector('#btnAdd').onclick = () => {
    document.querySelector('#btnNew').disabled = true
    show('tela2')
    document.querySelector('#inputArtist').focus()
  }

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputArtist').value = ''
    document.querySelector('#inputMusic').value = ''
    document.querySelector('#inputUrl').value = ''
    show('tela1')
  }

  document.querySelector('#btnCanc2').onclick = () => {
    let artist = document.querySelector('#inputChangeArtist')
    let music = document.querySelector('#inputChangeMusic')
    let url = document.querySelector('#inputChangeUrl')
    artist.value = ''
    music.value = ''
    url.value = ''
    artist.removeAttribute('data-id')
    show('tela1')
  }

  document.querySelector('#btnNew').onclick = () => {
    newMusic()
  }

  document.querySelector('#btnAlt').onclick = () => {
    saveChanges()
  }

  document.querySelector('#btnDel').onclick = () => {
    deleteMusic()
  }
}

const showPlaylist = () => {
  const myList = document.querySelector('#playlist')
  myList.innerHTML = ''
  playlist.forEach((t) => {
    let elementItem = document.createElement('li')
    let music = document.createElement('p')
    let artist = document.createElement('p')
    let url = document.createElement('a')

    music.innerHTML = `Musica: ` + t.music
    artist.innerHTML = `Artista: ` + t.artist
    url.innerHTML = `Url: ` + t.url
    url.href = t.url
    url.target = '_blank'

    elementItem.innerHTML = artist.outerHTML + music.outerHTML + url.outerHTML

    elementItem.setAttribute('data-id', t.id)

    elementItem.onclick = () => {
      let artist = document.querySelector('#inputChangeArtist')
      let music = document.querySelector('#inputChangeMusic')
      let url = document.querySelector('#inputChangeUrl')
      show('tela3')
      artist.value = t.artist
      music.value = t.music
      url.value = t.url
      artist.setAttribute('data-id', t.id)
      artist.focus()
    }
    myList.appendChild(elementItem)
  })
  document.querySelector('#estado').innerText = `Playlist - Total: ${playlist.length}`
  if (playlist.length > 0) {
    myList.classList.remove('hidden')
    document.querySelector('#blank').classList.add('hidden')
  } else {
    myList.classList.add('hidden')
    document.querySelector('#blank').classList.remove('hidden')
  }
}

const show = (comp) => {
  let windows = document.querySelectorAll('body > .component')
  windows.forEach((c) => c.classList.add('hidden'))
  document.querySelector('#' + comp).classList.remove('hidden')
}
// adicionar nova música
const newMusic = () => {
  let artist = document.querySelector('#inputArtist')
  let music = document.querySelector('#inputMusic')
  let url = document.querySelector('#inputUrl')
  if (artist.value.length > 0 && music.value.length > 0 && url.value.length > 0) {
    playlist.push({
      id: Math.random().toString().replace('0.', ''),
      artist: artist.value,
      music: music.value,
      url: url.value
    })
    artist.value = ''
    music.value = ''
    url.value = ''
    show('tela1')
    savePlaylist()
    showPlaylist()
  }
}
// liberar os botões para as açõess
const watchField = (e) => {
  let button = document.querySelector('#btnNew')
  if (e.target.value.length > 0) button.disabled = false
  else button.disabled = true
}
// salva as alterações
const saveChanges = () => {
  let artist = document.querySelector('#inputChangeArtist')
  let music = document.querySelector('#inputChangeMusic')
  let url = document.querySelector('#inputChangeUrl')
  let idMusic = artist.getAttribute('data-id')
  let i = playlist.findIndex((t) => t.id == idMusic)
  console.log(playlist[i].artist)
  console.log(playlist[i])
  playlist[i].artist = artist.value
  playlist[i].music = music.value
  playlist[i].url = url.value
  artist.value = ''
  music.value = ''
  url.value = ''
  artist.removeAttribute('data-id')
  music.removeAttribute('data-id')
  url.removeAttribute('data-id')
  show('tela1')
  savePlaylist()
  showPlaylist()
}
// apagar musica
const deleteMusic = () => {
  let artist = document.querySelector('#inputChangeArtist')
  let music = document.querySelector('#inputChangeMusic')
  let url = document.querySelector('#inputChangeUrl')
  let idMusic = artist.getAttribute('data-id')
  playlist = playlist.filter((t) => t.id != idMusic)
  music.value = ''
  url.value = ''
  artist.removeAttribute('data-id')
  show('tela1')
  savePlaylist()
  showPlaylist()
}
// liberar os botões para as ações
const watchFieldChange = (e) => {
  let button = document.querySelector('#btnAlt')
  if (e.target.value.length > 0) button.disabled = false
  else button.disabled = true
}

const savePlaylist = () => {
  console.log('hereeee')
  localStorage.setItem('playlist', JSON.stringify(playlist))
  console.log('save')
}
