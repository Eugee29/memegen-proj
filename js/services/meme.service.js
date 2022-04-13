'use strict'

const gImgs = [
  { id: 1, url: 'images/square/1.jpg', keywords: ['politics'] },
  { id: 2, url: 'images/square/2.jpg', keywords: ['animals'] },
  { id: 3, url: 'images/square/3.jpg', keywords: ['animals', 'kids'] },
  { id: 4, url: 'images/square/4.jpg', keywords: ['animals'] },
  { id: 5, url: 'images/square/5.jpg', keywords: ['animals', 'kids'] },
  { id: 6, url: 'images/square/6.jpg', keywords: ['television'] },
  { id: 7, url: 'images/square/7.jpg', keywords: ['kids'] },
  { id: 8, url: 'images/square/8.jpg', keywords: ['movies', 'television'] },
  { id: 9, url: 'images/square/9.jpg', keywords: ['kids'] },
  { id: 10, url: 'images/square/10.jpg', keywords: ['politics'] },
  { id: 11, url: 'images/square/11.jpg', keywords: ['sports'] },
  { id: 12, url: 'images/square/12.jpg', keywords: ['television'] },
  { id: 13, url: 'images/square/13.jpg', keywords: ['movies', 'television'] },
  { id: 14, url: 'images/square/14.jpg', keywords: ['movies', 'television'] },
  { id: 15, url: 'images/square/15.jpg', keywords: ['movies', 'television'] },
  { id: 16, url: 'images/square/16.jpg', keywords: ['movies', 'television'] },
  { id: 17, url: 'images/square/17.jpg', keywords: ['politics'] },
  { id: 18, url: 'images/square/18.jpg', keywords: ['movies', 'television'] },
]

const gKeywordSearchCountMap = _createKeywordSearchMap()

let gMeme = createMeme()

function getImgs() {
  return gImgs
}

function getMeme() {
  return gMeme
}

function setMemeId(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontSize(val) {
  gMeme.lines[gMeme.selectedLineIdx].size += val
}

function switchLine() {
  gMeme.selectedLineIdx += 1
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function createMeme() {
  return {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
      {
        txt: '',
        font: 'arial',
        size: 50,
        align: 'center',
        color: 'white',
        stroke: 'black',
        pos: {},
      },
      {
        txt: 'second text',
        font: 'arial',
        size: 50,
        align: 'center',
        color: 'white',
        stroke: 'black',
        pos: {},
      },
    ],
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
