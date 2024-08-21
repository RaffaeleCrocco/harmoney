const fs = require('fs');
const path = require('path');

// Read and parse the .env file
const envFilePath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envFilePath, 'utf8');

const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

module.exports = {
  BASEURL: envVars.BASEURL
};