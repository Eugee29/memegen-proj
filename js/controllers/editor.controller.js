'use strict'

let gElCanvas
let gCtx

let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initEditor(ev) {
  renderEditor()
  renderStickerSelector()
  gElCanvas = document.querySelector('#canvas')
  gCtx = gElCanvas.getContext('2d')
  addListeners()
  createMeme()
  setMemeId(ev.target.dataset.id)
  resizeCanvas()
  onCreateLine()
}

function renderEditor() {
  document.querySelector('.main-content').innerHTML = `
    <button class="back-btn">Back to Gallery</button>
        <div class="meme-editor">
          <section class="canvas-container">
            <canvas id="canvas" width=600 height=600></canvas>
          </section>
          <section class="editor-tools">
            <input type="text" placeholder="Your Text" oninput="onSetLineTxt(this.value)" />
            <div class="text-tools">
              <button onclick="onChangeLinePos(5)">🠗</button>
              <button onclick="onChangeLinePos(-5)">🠕</button>
              <button onclick="onSwitchLine()">⇃↾</button>
              <button onclick ="onCreateLine()">+</button>
              <button onclick ="onDeleteLine()" class="delete-btn"></button>
            </div>
            <div class="text-editor">
              <button class="item-1" onclick="onChangeFontSize(3)">A+</button>
              <button class="item-2" onclick="onChangeFontSize(-3)">A-</button>
              <button class="item-3" onclick ="onChangeTextAlign('right')"></button>
              <button class="item-4" onclick ="onChangeTextAlign('center')"></button>
              <button class="item-5" onclick ="onChangeTextAlign('left')"></button>
              <select class="item-6" name="font" onchange="onChangeFont(this)">
                <option value="impact">IMPACT</option>
                <option value="arial">Arial</option>
                <option value="courier new">Courier New</option>
                <option value="Times New Roman">Times New Roman</option>
                </select>
              <input class="item-7" type="color" oninput="onSetStrokeColor(this.value)" />
              <input class="item-8" type="color" oninput="onSetFillColor(this.value)" />
            </div>
            <div class="sticker-selector">
            </div>
            <div class="share-download-btns">
            
              <button class="save-btn" onclick="onSaveMeme()">Save</button>
              <a href='#' class="share-btn" onclick="uploadImg()">Share</a>
              <a href="#" onclick="downloadCanvas(this)" download="MyMeme.jpg" class="download-btn">Download</a>
            </div>
          </section>
        </div>`
}

function renderStickerSelector() {
  const stickers = getStickers()
  document.querySelector('.sticker-selector').innerHTML = stickers
    .map(
      (sticker) =>
        `<img src="${sticker.url}" alt="${sticker.id}.png" onclick="onAddSticker('${sticker.url}')">`
    )
    .join('')
}

function onAddSticker(src) {
  addSticker(src)
  renderMeme()
}

function renderSticker(line) {
  const { x, y } = line.pos
  const sticker = new Image()
  sticker.src = line.src
  sticker.onload = () => {
    gCtx.drawImage(sticker, x, y, line.size, line.size)
  }
}

function addListeners() {
  document
    .querySelector('.main-content .back-btn')
    .addEventListener('click', renderGallery)

  window.addEventListener('resize', resizeCanvas)
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetHeight
  gElCanvas.height = gElCanvas.width
  if (elContainer.offsetWidth < gElCanvas.width) {
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = gElCanvas.width
  }
  renderMeme()
}

function renderMeme() {
  const currMeme = getMeme()
  const img = getImgs().find((img) => img.id === +currMeme.selectedImgId)
  const memeImg = new Image()
  memeImg.src = img.url
  memeImg.onload = () => {
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    currMeme.lines.forEach((line) => {
      if (line.isSticker) renderSticker(line)
      else renderText(line)
    })
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

  if (line.isSticker) {
    drawRect(line.pos.x, line.pos.y, line.size, line.size)
  } else
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
  gCtx.strokeStyle = 'white'
  gCtx.stroke()
  gCtx.closePath()
}

function onCreateLine() {
  switch (getMeme().linesCreated) {
    case 0:
      createLine({ x: gElCanvas.width / 2, y: 50 }, gElCanvas.width / 10)
      break
    case 1:
      createLine(
        { x: gElCanvas.width / 2, y: gElCanvas.height - 50 },
        gElCanvas.width / 10
      )
      break
    default:
      createLine(
        { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
        gElCanvas.width / 10
      )
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
  if (!getMeme().lines.length) return
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

function deselectAll() {
  getMeme().selectedLineIdx = -1
  renderMeme()
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'MyMeme.jpg'
}

function onSaveMeme() {
  saveMeme(gElCanvas)
  const elSaveBtn = document.querySelector('.save-btn')
  elSaveBtn.innerText = 'Saved!'
  setTimeout(() => {
    elSaveBtn.innerText = 'Save'
  }, 1000)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isLineClicked(pos)) {
    deselectAll()
    return
  }
  setLineDrag(true)
  gStartPos = pos
  gElCanvas.style.cursor = 'grabbing'
  renderMeme()
}

function onMove(ev) {
  const line = getMeme().lines[getMeme().selectedLineIdx]
  if (!line || !line.isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)
  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  gElCanvas.style.cursor = 'grab'
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    }
  }
  return pos
}
