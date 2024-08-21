// src/config.jsx
import * as fs from 'fs';
import * as path from 'path';

const envFilePath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envFilePath, 'utf8');

const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

export const BASEURL = envVars.BASEURL; 