import { hydrate, render } from "react-dom";
import App from './App'
import { BrowserRouter } from "react-router-dom";

hydrate (
    <BrowserRouter>
        <App></App>
    </BrowserRouter>,
    document.getElementById('root')
)


render(<App />, document.getElementById("root"));
