// server.js
// Script ini menjembatani Phusion Passenger cPanel agar bisa menyalakan mesin Next.js
require('dotenv').config();
const path = require('path');

// Mengarahkan cPanel ke file server bawaan asli Next.js Standalone
const dir = path.join(__dirname, '.next', 'standalone');
require(path.join(dir, 'server.js'));
