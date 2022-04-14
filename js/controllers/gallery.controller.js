'use strict'

function renderGallery() {
  const keyWords = Object.keys(getKeyWordMap())
  let strHTML = `
    <section class="tag-menu">
    <input type="text" placeholder="Search" />
    <ul>
      <li><button>${keyWords[0]}</button></li>
      <li><button>${keyWords[1]}</button></li>
      <li><button>${keyWords[2]}</button></li>
      <li><button>${keyWords[3]}</button></li>
      <li><button onclick ="renderTags()">...more</button></li>
      
    </ul>
    
  </section>
  <div class="meme-gallery">`
  const imgs = getImgs()
  strHTML += imgs
    .map(
      (img) =>
        `<img class="meme" data-id="${img.id}" src="${img.url}" alt="image${img.id}" />`
    )
    .join('')

  document.querySelector('.main-content').innerHTML = strHTML

  document
    .querySelectorAll('.meme-gallery .meme')
    .forEach((elMeme) =>
      elMeme.addEventListener('click', renderEditor.bind(this))
    )
}

function renderTags() {
  const keyWords = Object.keys(getKeyWordMap())
  let strHTML = keyWords
    .map((keyWord) => `<li><button>${keyWord}</button></li>`)
    .join('')

  strHTML += `<li><button onclick ="renderGallery()">...less</button></li>`
  document.querySelector('.tag-menu ul').innerHTML = strHTML
}
