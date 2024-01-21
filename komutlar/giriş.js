
const startTimestamps = new Map()


const pad2Digits = value => String(value).padStart(2, '0')

client.on('message', async message => {
  try {
    if (message.content === '!gir') {
      startTimestamps.set(message.author.id, Date.now())
      await message.reply('Sayaç saymaya başladı')
    } else if (message.content === '!çık') {
      if (startTimestamps.has(message.author.id)) {
        const ms = Date.now() - startTimestamps.get(message.author.id)
        const totalSecs = Math.floor(ms / 1000)
        const totalMins = Math.floor(totalSecs / 60)
        const hrs = Math.floor(totalMins / 60)
        const mins = totalMins % 60
        const secs = totalSecs % 60
        await message.reply(`Geçirdiğin süre: ${hrs}:${pad2Digits(mins)}:${pad2Digits(secs)}`)
        startTimestamps.delete(message.author.id)
      } else {
        await message.reply('You need to use `!gir` first!')
      }
    }
  } catch (error) {
    console.error(error)
  }
})