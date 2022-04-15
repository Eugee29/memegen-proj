'use strict'

const DBKey = 'userMemes'
const gUserMemes = loadFromStorage(DBKey) || []

function saveMeme(canvas) {
  const data = canvas.toDataURL()
  gUserMemes.push(data)
  saveToStorage(DBKey, gUserMemes)
}

function getUserMemes() {
  return gUserMemes
}
