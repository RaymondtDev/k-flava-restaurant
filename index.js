import 'dotenv/config';
import express from'express';
import contactRouter from './server/contact.js';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const isProduction = process.env.NODE_ENV === "production";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/api', contactRouter);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (isProduction) {
  app.use(express.static(path.join(__dirname, '/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  })
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})