const getRandNum = (num) => {
  return Math.floor(Math.random() * num)
}

const cleanUpData = (data) => {
  return {
    _id: data._id,
    ka_utf: data.ka_utf,
    meaning: data.meaning,
    kunyomi: data.kunyomi,
    onyomi: data.onyomi
  }
}

export { getRandNum, cleanUpData }