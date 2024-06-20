import http from 'http';
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

const contributors = ['Kehinde Bandipo', 'Mary Obiagba'];

app.use('/', async (req, res) =>{
  res.status(200).json({
    api: {
      name: 'Collabocate API',
      description: 'Live updates to and from Github REST API',
      built_at: 'Collabo Community [Code Collabo tech arm]',
      github: {
        repository: 'https://github.com/collabo-community/collabocate',
      },
      contributors: {
        count: contributors.length,
        list: contributors,
      },
    }
  });
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
