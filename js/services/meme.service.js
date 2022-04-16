'use strict'

const gImgs = [
  { id: 1, url: 'images/square/1.jpg', keywords: ['politics'] },
  { id: 2, url: 'images/square/2.jpg', keywords: ['animals'] },
  { id: 3, url: 'images/square/3.jpg', keywords: ['animals', 'kids'] },
  { id: 4, url: 'images/square/4.jpg', keywords: ['animals'] },
  { id: 5, url: 'images/square/5.jpg', keywords: ['kids'] },
  { id: 6, url: 'images/square/6.jpg', keywords: ['television'] },
  { id: 7, url: 'images/square/7.jpg', keywords: ['kids'] },
  { id: 8, url: 'images/square/8.jpg', keywords: ['movies', 'television'] },
  { id: 9, url: 'images/square/9.jpg', keywords: ['kids', 'funny'] },
  { id: 10, url: 'images/square/10.jpg', keywords: ['politics', 'funny'] },
  { id: 11, url: 'images/square/11.jpg', keywords: ['sports'] },
  { id: 12, url: 'images/square/12.jpg', keywords: ['television'] },
  { id: 13, url: 'images/square/13.jpg', keywords: ['movies', 'television'] },
  { id: 14, url: 'images/square/14.jpg', keywords: ['movies', 'television'] },
  { id: 15, url: 'images/square/15.jpg', keywords: ['movies', 'television'] },
  {
    id: 16,
    url: 'images/square/16.jpg',
    keywords: ['movies', 'television', 'funny'],
  },
  { id: 17, url: 'images/square/17.jpg', keywords: ['politics'] },
  { id: 18, url: 'images/square/18.jpg', keywords: ['movies', 'television'] },
]

const gKeywordSearchCountMap = _createKeywordSearchMap()

let gMeme
let gFilter

function getImgs() {
  if (!gFilter) return gImgs
  return gImgs.filter((img) => img.keywords.includes(gFilter))
}

function filterBy(filter) {
  gFilter = filter
}

function getKeyWords() {
  return Object.keys(gKeywordSearchCountMap)
}

function getMeme() {
  return gMeme
}

function setMemeId(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setFillColor(color) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setStrokeColor(color) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

function changeFontSize(val) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].size += val
}

function changeLinePos(val) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].pos.y += val
}

function changeFont(font) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].font = font
}

function switchLine() {
  gMeme.selectedLineIdx += 1
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

// function setLinePos(x, y) {
//   gMeme.lines[gMeme.selectedLineIdx].pos[x] = x
//   gMeme.lines[gMeme.selectedLineIdx].pos[y] = y
// }

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  if (gMeme.lines.length) gMeme.selectedLineIdx--
}

function createLine(pos, fontSize) {
  gMeme.lines.forEach((line) => (line.isSelected = false))
  const line = {
    txt: 'Your Text',
    font: 'impact',
    size: fontSize,
    align: 'center',
    color: 'white',
    stroke: 'black',
    pos,
    isDrag: false,
  }
  gMeme.lines.push(line)
  gMeme.linesCreated++
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function changeTextAlign(side) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].align = side
}

function createMeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    linesCreated: 0,
    lines: [],
  }
}

function _createKeywordSearchMap() {
  const keywordsMap = {}
  gImgs.forEach((img) =>
    img.keywords.forEach((keyword) => {
      keywordsMap[keyword] = keywordsMap[keyword] ? keywordsMap[keyword] + 1 : 1
    })
  )
  return keywordsMap
}

function isLineClicked(clickedPos) {
  let isClicked = false
  gMeme.lines.forEach((line, index) => {
    let { pos } = line
    let textWidth = gCtx.measureText(line.txt).width

    if (
      clickedPos.x >= pos.x - textWidth &&
      clickedPos.x <= pos.x + textWidth / 2 &&
      clickedPos.y >= pos.y - line.size &&
      clickedPos.y <= pos.y + line.size / 2
    ) {
      gMeme.selectedLineIdx = index
      isClicked = true
    }
  })
  return isClicked
}

function setLineDrag(drag) {
  if (gMeme.selectedLineIdx === -1) return
  gMeme.lines[gMeme.selectedLineIdx].isDrag = drag
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
  gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}
