#!/bin/bash
npm i
quasar build

pm2 stop dashboard

pm2 start server.js --name dashboard
