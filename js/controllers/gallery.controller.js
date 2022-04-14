'use strict'

let gAllTags = false

function renderGallery() {
  window.removeEventListener('resize', resizeCanvas)
  let keyWords = getKeyWords()
  let strHTML = `
  <section class="tag-menu">
  <input list="tag-search" placeholder="Search tags" onchange="onFilterBy(this.value)">
  <datalist id="tag-search">
    ${keyWords.map((keyWord) => `<option value="${keyWord}">`).join('')}
  </datalist>  
    <ul>
    <li><button onclick="onFilterBy('')">All</button></li>`

  if (!gAllTags) keyWords = keyWords.slice(0, 3)

  strHTML += keyWords
    .map(
      (keyWord) =>
        `<li><button onclick="onFilterBy('${keyWord}')">${keyWord}</button></li>`
    )
    .join('')
  strHTML += `
    <li><button class="toggle-tags-btn" onclick ="onToggleTags()">${
      gAllTags ? '...less' : '...more'
    }</button></li>
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

function onToggleTags() {
  gAllTags = !gAllTags
  renderGallery()
}

function onFilterBy(filter) {
  filterBy(filter)
}
