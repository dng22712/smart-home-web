const axios = require('axios');
const config = require('../config');

const baseUrl = config.HA_ADDRESS;

let currentState = []

const allowedEntities = [
  'input_boolean',
  'input_number',
]

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${config.HA_KEY}`
  }
}

function hassRequest(url, options) {
  const _options = options ? options : {}
  const _config = { ...defaultOptions, ..._options, url: url }
  return axios.request(url, _config)
}

function getEntityData(entity) {
  const { entity_id, attributes, state } = entity

  return { entity_id, attributes, state }
}

function filterEntities(entities) {
  return entities.filter((i) => {
    const id = i.entity_id.split('.')[0]
    if (allowedEntities.includes(id)) {
      return true
    }
    return false
  })
}

async function updateCurrentState() {
  const res = await hassRequest(baseUrl + 'states')

  currentState = filterEntities(res.data)

  return currentState
}

async function updateEntityState(id, obj) {
  await hassRequest(baseUrl + 'states/' + id, { method: 'POST', data: obj})
}

function getDeviceByName(name) {
  return currentState.find((i) => i.attributes.friendly_name === name)
}

function getDeviceState(response) {
  const change = parseInt(response.state)

  if (isNaN(change)) {
    return response.state
  }

  const entity = getDeviceByName(response.device)
  const current = parseInt(entity.state)

  return parseInt(current + change)
}

function updateEntityStateFromContent(payload) {
  const res = payload.response
  if (!res) return

  for (const i of res) {
    const entity = getDeviceByName(i.device)
    if (!entity) continue

    const state = getDeviceState(i)

    updateEntityState(entity.entity_id, { ...getEntityData(entity), state: state })
  }

  updateCurrentState()
}

module.exports = { updateCurrentState, updateEntityState, updateEntityStateFromContent }
