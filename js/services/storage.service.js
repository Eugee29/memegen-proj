'use strict'

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function saveToStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item))
}
