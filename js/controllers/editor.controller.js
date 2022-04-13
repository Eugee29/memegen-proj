'use strict'

let gElCanvas
let gCtx

function renderEditor(ev) {
  document.querySelector('.main-content').innerHTML = `
    <button class="back-btn">Back to Gallery</button>
        <div class="meme-editor">
          <section class="canvas-container">
            <canvas id="canvas" width="600" height="600"></canvas>
          </section>
          <section class="editor-tools">
            <input type="text" placeholder="Text line" />
            <div class="text-tools">
              <button>🠗</button><button>🠕</button><button>⇃↾</button
              ><button>+</button><button>|||</button>
            </div>
            <div class="text-editor">
              <button class="item-1">A+</button>
              <button class="item-2">A-</button>
              <button class="item-3">=</button>
              <button class="item-4">=</button>
              <button class="item-5">=</button>
              <select class="item-6" name="font">
                <option value="impact">IMPACT</option></select
              ><button class="item-7">S</button>
              <input class="item-8" type="color" />
            </div>
            <div class="sticker-selector">
              <button>😀</button><button>😀</button><button>😀</button>
            </div>
            <div class="share-download-btns">
              <button>Share</button><button>Download</button>
            </div>
          </section>
        </div>`

  document
    .querySelector('.main-content .back-btn')
    .addEventListener('click', renderGallery)

  gElCanvas = document.querySelector('#canvas')
  gCtx = gElCanvas.getContext('2d')

  renderCanvas(ev.target)
}

function renderCanvas(target) {
  const img = new Image()
  img.src = target.src
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
}
