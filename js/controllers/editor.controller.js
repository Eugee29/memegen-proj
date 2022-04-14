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
              <button onclick="onChangeLinePos(5)">🠗</button>
              <button onclick="onChangeLinePos(-5)">🠕</button>
              <button onclick="onSwitchLine()">⇃↾</button>
              <button onclick ="onCreateLine()">+</button>
              <button onclick ="onDeleteLine()">DEL</button>
            </div>
            <div class="text-editor">
              <button class="item-1" onclick="onChangeFontSize(3)">A+</button>
              <button class="item-2" onclick="onChangeFontSize(-3)">A-</button>
              <button class="item-3" onclick ="onChangeTextAlign('right')">left</button>
              <button class="item-4" onclick ="onChangeTextAlign('center')">center</button>
              <button class="item-5" onclick ="onChangeTextAlign('left')">right</button>
              <select class="item-6" name="font" onchange="onChangeFont(this)">
                <option value="impact">IMPACT</option>
                <option value="arial">arial</option></select>
              <input class="item-7" type="color" oninput="onSetStrokeColor(this.value)" />
              <input class="item-8" type="color" oninput="onSetFillColor(this.value)" />
            </div>
            <div class="sticker-selector">
              <button>😀</button><button>😀</button><button>😀</button>
            </div>
            <div class="share-download-btns">
              <button>Share</button><button>Download</button>
            </div>
          </section>
        </div>`
  gElCanvas = document.querySelector('#canvas')
  gCtx = gElCanvas.getContext('2d')

  document
    .querySelector('.main-content .back-btn')
    .addEventListener('click', renderGallery)

  createMeme()
  setMemeId(ev.target.dataset.id)
  onCreateLine()
}

function renderMeme() {
  const currMeme = getMeme()
  const img = getImgs().find((img) => img.id === +currMeme.selectedImgId)
  const genMeme = new Image()
  genMeme.src = img.url
  genMeme.onload = () => {
    gCtx.drawImage(genMeme, 0, 0, gElCanvas.width, gElCanvas.height)
    currMeme.lines.forEach((line) => renderText(line))
    markLine()
  }
}

function renderText(line) {
  let { x, y } = line.pos

  gCtx.font = line.size + 'px ' + line.font
  gCtx.textBaseline = 'middle'
  gCtx.textAlign = line.align
  gCtx.fillStyle = line.color
  gCtx.fillText(line.txt, x, y)
  gCtx.lineWidth = 2
  gCtx.strokeStyle = line.stroke
  gCtx.strokeText(line.txt, x, y)
}

function markLine() {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line) return
  const textWidth = gCtx.measureText(line.txt).width
  drawRect(
    line.pos.x - textWidth / 2 - 10,
    line.pos.y - line.size / 2 - 10,
    textWidth + 20,
    line.size + 20
  )
}

function drawRect(startX, startY, endX, endY) {
  gCtx.beginPath()
  gCtx.rect(startX, startY, endX, endY)
  gCtx.strokeStyle = 'black'
  gCtx.stroke()
  gCtx.closePath()
}

function onCreateLine() {
  switch (getMeme().linesCreated) {
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

function onChangeFont(elSelect) {
  changeFont(elSelect.options[elSelect.selectedIndex].value)
  renderMeme()
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onChangeLinePos(val) {
  changeLinePos(val)
  renderMeme()
}

function onSetFillColor(color) {
  setFillColor(color)
  renderMeme()
}

function onSetStrokeColor(color) {
  setStrokeColor(color)
  renderMeme()
}

function onChangeFontSize(val) {
  changeFontSize(val)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  renderMeme()
  document.querySelector('.editor-tools input[type=text]').value =
    getMeme().lines[getMeme().selectedLineIdx].txt
}

function onChangeTextAlign(side) {
  changeTextAlign(side)
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}
