TH 6-8-23

restful route

crud and rest

```javascript
import {BrowserRouter, Route, Link, Switch } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    )
};

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/posts" children={<Posts />} />
                <Route path="/posts/:id" children={<Posts />} />
                <Route path="/" children={<Hi />} j />
            </Switch>
        </BrowserRouter>
    )
};
```

WE 6-14-23

API TOKEN

```javascript

```