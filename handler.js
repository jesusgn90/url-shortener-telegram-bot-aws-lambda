const { post } = require('axios')

// Bot token
const TG_TOKEN = process.env.TELEGRAM_TOKEN

// RegExp to validate inputs
const URL_REGEXP = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm)

// Endpoints used
const CLEAN_URI = 'https://cleanuri.com/api/v1/shorten'
const TG_SEND_MESSAGE = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`

const getShortUrl = async longUrl => {
  const { result_url } = (await post(
    CLEAN_URI, 
    { url: longUrl.trim() },
  )).data

  return result_url
}

const sendToUser = async (chat_id, text) => {
  await post(
    TG_SEND_MESSAGE, 
    { chat_id, text },
  )
}

module.exports.handle = async event => {
  try {
    const body = JSON.parse(event.body)
    
    const {
      chat, 
      text,
    } = body.message
    
    if (typeof text === 'string' && URL_REGEXP.test(text)) {
      const message = await getShortUrl(text)
      await sendToUser(chat.id, message)
    }
  } finally {
    return { statusCode: 200 }
  }
}