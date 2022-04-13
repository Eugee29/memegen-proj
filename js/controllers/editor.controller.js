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
            <input type="text" placeholder="Your Text" oninput="onSetLineTxt(this.value)" />
            <div class="text-tools">
              <button>🠗</button><button>🠕</button><button onclick="onSwitchLine()">⇃↾</button
              ><button onclick ="onCreateLine()">+</button><button>|||</button>
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

  gElCanvas = document.querySelector('#canvas')
  gCtx = gElCanvas.getContext('2d')

  resetMeme()
  setMemeId(ev.target.dataset.id)
  onCreateLine()
  // renderMeme()
}

function renderMeme() {
  const currMeme = getMeme()
  const img = getImgs().find((img) => img.id === +currMeme.selectedImgId)
  const genMeme = new Image()
  genMeme.src = img.url
  genMeme.onload = () => {
    gCtx.drawImage(genMeme, 0, 0, gElCanvas.width, gElCanvas.height)
    currMeme.lines.forEach((line) => renderText(line))
  }
}

function renderText(line) {
  const { x, y } = line.pos
  gCtx.font = line.size + 'px ' + line.font
  gCtx.textBaseline = 'center'
  gCtx.textAlign = line.align
  gCtx.fillStyle = line.color
  gCtx.fillText(line.txt, x, y)
  gCtx.lineWidth = 2
  gCtx.strokeStyle = line.stroke
  gCtx.strokeText(line.txt, x, y)
}

// function drawRect(x, y) {
//   gCtx.rect(x, y, 200, 200)
//   gCtx.fillStyle = 'green'
//   gCtx.fillRect(x, y, 200, 200)
//   gCtx.strokeStyle = 'red'
//   gCtx.stroke()
// }

function onCreateLine() {
  switch (getMeme().lines.length) {
    case 0:
      createLine({ x: gElCanvas.width / 2, y: 50 })
      break
    case 1:
      createLine({ x: gElCanvas.width / 2, y: gElCanvas.height - 50 })
      break
    default:
      createLine({ x: gElCanvas.width / 2, y: gElCanvas.height / 2 })
  }
  document.querySelector('.editor-tools input[type=text]').value = ''
  renderMeme()
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
