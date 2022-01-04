import express from 'express';
const app = express();
import path from 'path';
const PORT = process.env.PORT || 5000;


// if (process.env.NODE_ENV === "production") {
  // server static content
  // npm run build
  app.use(express.static(path.join(__dirname, "../client", "build")));
  console.log(path.join(__dirname, "../../client"));
  app.get('/*', (req, res) => {
    console.log('NO MAMEEEEES')
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
// }

app.get('/', (req, res) => {
  console.log('Pinche pendejo');
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT} HELLOOOOOOO`);
});
