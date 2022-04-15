'use strict'

const DBKey = 'userMemes'
const gUserMemes = loadFromStorage(DBKey) || []

function saveMeme() {
  console.log(gElCanvas)
  const data = gElCanvas.toDataURL()
  gUserMemes.push(data)
  saveToStorage(DBKey, gUserMemes)
}

function getUserMemes() {
  return gUserMemes
}
