const { Configuration, OpenAIApi } = require("openai");
const config = require('../config')

const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});

let openai = null

const currentChatMessages = [
  { "role": "system", "content": "You are a helpful assistant that converts text into programmatic JSON." },
  { "role": "user", "content": "These are the devices: Bedroom Light 1, Bedroom Light 2, Kitchen Light, Kitchen Fan 1, Kitchen Fan 2, Garage Door, Thermostat" },
  { "role": "user", "content": "Use the following examples to convert text into JSON" },
  { "role": "user", "content": "Turn off bedroom lights" },
  { "role": "assistant", "content": `{ "response": [{ "device": "Bedroom Light 1", "state": "off" }, { "device": "Bedroom Light 2", "state": "off" }]}` },
  { "role": "user", "content": "turn on the first kitchen fan" },
  { "role": "assistant", "content": `{ "response": [{ "device": "Kitchen Fan 1", "state": "on" }]}` },
  { "role": "user", "content": "turn off the second kitchen fan" },
  { "role": "assistant", "content": `{ "response": [{ "device": "Kitchen Fan 2", "state": "off" }]}` },
  { "role": "user", "content": "Turn off the fourth kitchen fan" },
  { "role": "assistant", "content": `{ "error": "No such device" }` },
  { "role": "user", "content": "Lower the thermostat" },
  { "role": "assistant", "content": `{ "response": [{ "device": "Thermostat", "state": "-5" }]}` },
  { "role": "user", "content": "I'm cold" },
  { "role": "assistant", "content": `{ "response": [{ "device": "Thermostat", "state": "+5" }]}` },
]

function getOpenAIInstance() {
  if (!openai) {
    openai = new OpenAIApi(configuration)
  }

  return openai
}

function updateDevicesMessage(devices) {
  const prependContent = 'Use this updated device list: '

  const idx = currentChatMessages.findIndex((i) => i.content.includes(prependContent))
  const newContent = prependContent + devices.map((i) => i.attributes.friendly_name).join(', ')

  if (idx !== -1) {
    currentChatMessages[idx] = { ...currentChatMessages[idx], content: newContent }
  } else {
    currentChatMessages.push({ role: 'user', content: newContent })
  }
}

function getChatCompletion(message) {
  const client = getOpenAIInstance()

  return client.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    max_tokens: 2048,  
    messages: [ ...currentChatMessages, { "role": "user", "content": message } ],
  })
}

function parseCompletion(data) {
  const message = data.choices[0].message.content

  if (!message) return

  try {
    return JSON.parse(message)
  } catch (err) {
    console.error("JSON parse error")
  }
}

module.exports = { getChatCompletion, updateDevicesMessage, parseCompletion }
