'use strict'

function onInit() {
  renderGallery()
  // renderTags()
}

function toggleMenu() {
  document.querySelector('body').classList.toggle('menu-open')
  // document.querySelector('.main-header .main-nav').style.transform =
  //   'translateX(0)'
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
