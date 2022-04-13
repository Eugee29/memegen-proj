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
            <input type="text" placeholder="Text line" oninput="onSetLineTxt(this.value)" />
            <div class="text-tools">
              <button>🠗</button><button>🠕</button><button onclick="onSwitchLine()">⇃↾</button
              ><button>+</button><button>|||</button>
            </div>
            <div class="text-editor">
              <button class="item-1" onclick="onChangeFontSize(3)">A+</button>
              <button class="item-2" onclick="onChangeFontSize(-3)">A-</button>
              <button class="item-3">=</button>
              <button class="item-4">=</button>
              <button class="item-5">=</button>
              <select class="item-6" name="font">
                <option value="impact">IMPACT</option></select
              ><button class="item-7">S</button>
              <input class="item-8" type="color" oninput="onSetLineColor(this.value)" />
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

  // document
  //   .querySelector('.editor-tools input[type=text]')
  //   .addEventListener('input', onSetLineTxt.bind(this))

  gElCanvas = document.querySelector('#canvas')
  gCtx = gElCanvas.getContext('2d')

  setMemeId(ev.target.dataset.id)
  createMeme()
  onSetLineTxt(
    document.querySelector('.editor-tools input[type=text]').placeholder
  )
  renderMeme()
}

function renderMeme() {
  const currMeme = getMeme()
  const img = getImgs().find((img) => img.id === +currMeme.selectedImgId)
  const genMeme = new Image()
  genMeme.src = img.url
  genMeme.onload = () => {
    gCtx.drawImage(genMeme, 0, 0, gElCanvas.width, gElCanvas.height)
    currMeme.lines.forEach((line) => drawText(line, gElCanvas.width / 2, 50))
  }
}

function drawText(line, x, y) {
  // gCtx.lineWidth = 2
  // gCtx.strokeStyle = 'red'
  // gCtx.strokeText(txt, x, y)
  gCtx.font = line.size + 'px ' + line.font
  gCtx.textBaseline = 'middle'
  gCtx.textAlign = line.align
  gCtx.fillStyle = line.color
  gCtx.fillText(line.txt, x, y)
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onSetLineColor(color) {
  setLineColor(color)
  renderMeme()
}

function onChangeFontSize(val) {
  changeFontSize(val)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
}
