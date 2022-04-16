'use strict'

function onInit() {
  renderGallery()
}

function toggleMenu() {
  document.querySelector('body').classList.toggle('menu-open')
}

function renderUserMemes() {
  window.removeEventListener('resize', resizeCanvas)
  const userMemes = getUserMemes()
  let strHTML = userMemes
    .map((meme) => `<img class="meme" src="${meme}" alt="meme" />`)
    .join('')
  document.querySelector('.main-content').innerHTML =
    '<div class="meme-gallery"> ' + strHTML + '<div>'
}
