'use strict'

function renderGallery() {
  let strHTML = `
    <section class="tag-menu main-layout">
    <input type="text" placeholder="Search" />
    <ul>
      <li><button>Tag 1</button></li>
      <li><button>Tag 2</button></li>
      <li><button>Tag 3</button></li>
      <li><button>Tag 4</button></li>
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
