import express from 'express';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync('dist/frontend/index.html').toString();

const parts = html.split("not rendered");

const app = express();
app.get('/favicon.ico', (req, res) => res.status(204));

app.use("/frontend", express.static("dist/frontend"));
app.use((req, res) => {
    const reactMarkup = (
        <StaticRouter location={req.url}>
            <App></App>
        </StaticRouter>
    )
    res.send(parts[0] + renderToString(reactMarkup) + parts[1]);
    res.end();
})

console.log(`listening on https://localhost:${PORT}`)
// var listener = app.listen(8888, function(){
//     console.log('Listening on port ' + listener.address().port); //Listening on port 8888
// });
app.listen(PORT);
// app.use(ignoreFavicon);
// app.get('/favicon.ico', (req, res) => res.status(204));


function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  }