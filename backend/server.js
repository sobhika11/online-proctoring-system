const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

require("dotenv").config();
console.log(process.env.MONGO_URI);
