const { API_PORT, API_HOST, HA_ADDRESS, HA_API_KEY, OPENAI_API_KEY, MYSQL_URI } = process.env;

module.exports = {
  PORT: API_PORT || 3000,
  HOST: API_HOST || '0.0.0.0',
  HA_ADDRESS: HA_ADDRESS || 'http://homeassistant:8123/api/',
  HA_KEY: HA_API_KEY,
  OPENAI_API_KEY: OPENAI_API_KEY,
  MYSQL_URI: MYSQL_URI || 'mysql://root:mysql@mysql:3306/mysql'
}