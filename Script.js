document.querySelector(`.gameSettings`).addEventListener(`submit`, (event) => {
  event.preventDefault()
  document.querySelectorAll(`.cell`).forEach(item => item.textContent = ``)
  document.querySelector(`.victoryText`).style.display = `none`
  let current = `X`,
    gameTable = document.querySelector(`.gameTable`),
    cells = Array.from(document.querySelectorAll(`.cell`)),
    botON = event.target.elements.player.value === `one`,
    botTurn = false,
    victoryConditions = [[cells[0], cells[4], cells[8]], [cells[2], cells[4], cells[6]]]
  for (let c = 1; c <= 3; c++) {
    victoryConditions.push(Array.from(document.querySelectorAll(`.x${c}`)))
    victoryConditions.push(Array.from(document.querySelectorAll(`.y${c}`)))
  }
  if (event.target.elements.symbol.value === `O` && botON) {
    bot()
  }
  gameTable.addEventListener(`click`, place)

  function place (event) {
    let position = event.target
    if (!position.classList.contains(`cell`) || position.textContent || botTurn) {
      return
    }
    position.textContent = current
    checkVictory()
    current === `X` ? current = `O` : current = `X`
    if (botON) {
      bot()
    }
  }

  function bot () {
    botTurn = true
    let chosenCell = cells.filter((item) => item.textContent === ``).sort(() => Math.random() - 0.5)
    if (chosenCell.length >= 1) {
      chosenCell[0].textContent = current
      checkVictory()
      current === `X` ? current = `O` : current = `X`
    }
    botTurn = false
  }

  function checkVictory () {
    for (let a = 0; a < victoryConditions.length; a++) {
      if (checkLine(victoryConditions[a])) {
        let victoryText = document.querySelector(`.victoryText`)
        victoryText.textContent = `Победа ${current}`
        victoryText.style.display = `block`

        gameTable.removeEventListener(`click`, place)
        break
      }
    }

    function checkLine (line) {
      return Array.from(line).every(item => item.textContent === current)
    }
  }
})