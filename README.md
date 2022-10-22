# Project Overview.

## Why use the React ecosystem.

### React Redux

![image](https://user-images.githubusercontent.com/34083808/193455447-f23b1f87-ca6c-4cf8-8784-6518062d8990.png)

Note: [Flux architecture](https://www.freecodecamp.org/news/an-introduction-to-the-flux-architectural-pattern-674ea74775c9/):
![image](https://user-images.githubusercontent.com/34083808/193455516-7c44d505-a6a5-4e2b-9f1f-18f6ee2d9dd7.png)

### Redux Thunk

Redux Thunk separate the side effects out of our application, such as network request, uploading an article.  
![image](https://user-images.githubusercontent.com/34083808/193455637-0f5ef569-57ff-4f7a-81cd-e9bcbbae3492.png)

### Reselect

![image](https://user-images.githubusercontent.com/34083808/193455683-1a93729c-e35f-415f-8a0d-c4c0995ade96.png)

### Style component

![image](https://user-images.githubusercontent.com/34083808/193455720-9d85fdac-3350-41e2-80ba-b9be8afc5d06.png)

## What Do We need for React ?

1. index.html
2. Support for ES6
3. webpack
4. Root component
5. react-hot-loader

at first step we need to create folder public with index.html inside. We need to put the id root at body of html file, this will become the entry point for react component.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>React Ecosystem</title>
  </head>
  <body>
    <div id="root"></div>
    <noscript> Please enable JavaScript to view this site. </noscript>
    <script src="../dist/bundle.js"></script>
  </body>
</html>
```

### Setup Webpack to actually build the app. webpack will help use convert ES6 and JSX to common JS and host public website.

install webpack from the comment line

```cmd
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
```

next step we need to create the config file to define what webpack will do with our source code.

```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "public/"),
    port: 3000,
    // publicPath
    devMiddleware: {
      publicPath: "https://localhost:3000/dist/",
    },
    // hotOnly
    hot: "only",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
```

install react-hot-loader to auto reflect the change from source code to browser.

```javascript
import React from "react";
import { hot } from "react-hot-loader";
import TodoList from "./todos/TodoList";
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
};

export default hot(module)(App);
```

## Redux

### How Redux Works ?

one of the ideal of Redux that we will have one global state call store that all of our component can access.

![image](https://user-images.githubusercontent.com/34083808/193578122-330df43f-f419-46b9-9658-3c2fe399a2f2.png)

The Other Pieces of Redux.
![image](https://user-images.githubusercontent.com/34083808/193581087-a4d994b1-faee-4a96-a5f4-300c4a7b1633.png)

Redux action contain type and payload which contain the actual data. Reducers decide what should happend with our store at specific action accurs. <br>

Components can only interact with the state by triggering Redux actions.

### Unidirectional Data Flow.

![image](https://user-images.githubusercontent.com/34083808/193581937-d3e423ce-f31c-47d6-87c9-085b7f23357f.png)

> we will use redux toolkit install of redux to implement redux

```
Install Redux Toolkit and React-Redux
```

Create a file named `src/store.js`. Import the configureStore API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

```javascript
import { configureStore, combineReducers } from "redux";

export const store = configureStore({
  reducer: {},
});
```

Once the store is created, we can make it available to our React components by putting a React-Redux <Provider> around our application in `src/index.js`. Import the Redux store we just created, put a <Provider> around your <App>, and pass the store as a prop:

## persisting the Redux store.

at this moment, if we refresh our page we will lost our data. One way to persit the store is using the `redux-persist`, redux-persist will store our data at local storage. To use `redux-persist` we will implement in store.js and index.js.

```javascript
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { todos } from "./todos/reducers";

const reducers = {
  todos,
};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// one notice is that it may happend the error of serializableCheck, to disable it please use the middleware with serializableCheck set to false
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
```

in index.js file

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
```

## Redux DevTools

Redux DevTools for debugging application's state changes.
![image](https://user-images.githubusercontent.com/34083808/194081884-f3909aee-b98c-4fff-987c-bac09cbf3b19.png)

You can also check the dispatch action by Redux DevTools, please check at below.

![image](https://user-images.githubusercontent.com/34083808/194083330-dfae4048-8972-4701-8edc-49354e19c760.png)

## Redux Best Practices.

1. Export the connected and unconnected version of a component.
2. Keep Redux actions and async operations out of your reducers.
3. Think carefully about connecting components.
   connecting a component can, in practice, make it less reusable.

![image](https://user-images.githubusercontent.com/34083808/194085102-d81be6e8-3fed-487e-8aa1-204b49986427.png)

# Why do you need Redux Thunk ?

We need to separate our logic with component, So the component only concentrate on the display part. <br>
![image](https://user-images.githubusercontent.com/34083808/194318571-2cefa93a-2261-4c40-a388-85978cf23476.png)

there are several side-effect libraries such as Redux Thunk, Redux Saga, Redux Logic and so on. those library give us a place to put our side effect logic. <br>

## How does Redux Thunk work ?.

Redux Thunk allow us to add some kind of fork in to the Flow of Triggers Action-> State update -> component update where we can put our side effect logic.

![image](https://user-images.githubusercontent.com/34083808/194319766-06b6cb73-f8bd-4ead-bb3d-920376758e1f.png) <br>

![image](https://user-images.githubusercontent.com/34083808/194320184-3a63eb5e-b820-497c-8f17-644570149731.png)

for example, we have UserProfilePage which will fetch the data from the server, then dispatch to the store and render it. It works but the loading logic doesn't belong to our component. We should try to keep our component forcus on it's job<br>
![image](https://user-images.githubusercontent.com/34083808/194326904-bf10e5f4-3fc9-4f08-9d54-9387bc2aba04.png)

To use Redux Thunk, at fist we need to install few packages.

```
pnpm i redux-thunk @redux-devtools/extension @babel/runtime
pnpm i --save-dev @babel/plugin-transform-runtime
```

> To setup Redux Thunk, please refer to this [artical](https://redux.js.org/usage/configuring-your-store)
> In my case, I use Redux-Toolkit and by default this will apply Redux Thunk when `configureStore `

By default, configureStore from Redux Toolkit will:

- Call `applyMiddleware` with [a default list of middleware, including redux-thunk](https://redux-toolkit.js.org/api/getDefaultMiddleware), and some development-only middleware that catch common mistakes like mutating state
- Call `composeWithDevTools` to set up the Redux DevTools Extension

A Thunk is just a function return another function, let take a look on the below example.

```javascript
export const displayAlert = (text) => {
  alert(`You Click on ${text}`);
};

The thunk above is simple case of synchonous function, in real world we doing many asynchonous tasks, such as loading or updating server data.



};

```

# Why Do We Need Selectors ?

The central theme of our React ecosystem tools has been the separation of concerns. We want our component takes care of display data, our reducers to manage the state, and the thunks to do the side effect logic. <br>
![image](https://user-images.githubusercontent.com/34083808/197327394-f8c1ce5c-49ee-4d31-bf28-e56ea85a380f.png)

Let us consider the scenario where we want to extract the data from our state or apply logic to get the data, such as filtering. Our component may be overly complex if we do it on MapStateToProp or add another state to our store and this is one of the reasons Selector exists. <br>

![image](https://user-images.githubusercontent.com/34083808/197327988-839e3eb9-dcd4-4f61-84e9-a0f15422b1c9.png)

> ref: [Deriving Data with Selectors](https://redux.js.org/usage/deriving-data-selectors)

Let's take a look at our example. Now, instead of using state directly, we can use the selector in MapStateToProp.

```javascript
import { getTodos, getTodosLoading } from "./selectors";

const mapStateToProps = (state) => {
  return { todos: getTodos(state), isLoading: getTodosLoading(state) };
};
```

We can also create a new selector base on the current selector using `createSelector` function from the re-selector library (now it integrates with redux-toolkits). Reselect provides a function called createSelector to generate memoized selectors. createSelector accepts one or more "input selector" functions, plus an "output selector" function, and returns a new selector function for you to use.

```javascript
import { createSelector } from "@reduxjs/toolkit";

export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

export const getIncompleteTodos = createSelector(getTodos, (todos) => {
  todos.data.filter((todo) => !todo.isCompleted);
});

export const getCompletedTodos = createSelector(getTodos, (todos) => {
  todos.data.filter((todo) => todo.isCompleted);
});
```

createSelector can accept multiple input selectors, which can be provided as separate arguments or as an array. The results from all the input selectors are provided as separate arguments to the output selector.<br>

If any of the results are `===` different than before, it will re-run the output selector, and pass in those results as the arguments. If all of the results are the same as the last time, it will skip re-running the output selector, and just return the cached final result from before.<br>

> Note: Any "output selector" that just returns its inputs is incorrect! The output selector should always have the transformation logic.

# Why we need Styled-Component ?

In some cases, we want to change the style of the component, not by adding and removing the class name. The Styled-Component is one of the way to do this.

![image](https://user-images.githubusercontent.com/34083808/197332675-c837d7ca-91a8-4b8a-bdb4-46a499dc0049.png)

![image](https://user-images.githubusercontent.com/34083808/197332882-8a4d6f6a-d86a-4e4a-8b0e-748bb03d6a3c.png)

Let check the below example.

```javascript
<ListItem className = {item.selected ? "Selected": "Not Selected} />
```

change to:

```javascript
<ListItem selected={true} />
```

Let install the styled-component.

```
pnpm i --save styled-components
```

styled-components is the result of wondering how we could enhance CSS for styling React component systems. By focusing on a single use case we managed to optimize the experience for developers as well as the output for end users.

## How to change the CSS to Styled-Component.

From:

```CSS
//TodoList.css
.list-wrapper {
    max-width: 700px;
    margin: auto;
}
```

```javascript
import "./TodoList.css";
<div className="list-wrapper"></div>;
```

To:

```javascript
const ListWrapper = Styled.div`
  max-width: 700px;
  margin: auto;
`;

<ListWrapper></ListWrapper>;
```

after convert css to styled-component, you can remove the css file out of our project.

## Passing props to Styled-Componenents.

If the styled target is a simple element (e.g. styled.div), styled-components passes through any known HTML attribute to the DOM. If it is a custom React component (e.g. styled(MyComponent)), styled-components passes through all props

```javascript
const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  border-bottom: ${(props) =>
    new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
      ? "none"
      : "2px solid red"};
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;
```

## Extending styled-componenent

Quite frequently you might want to use a component, but change it slightly for a single case. Now, you could pass in an interpolated function and change them based on some props, but that's quite a lot of effort for overriding the styles once.

To easily make a new component that inherits the styling of another, just wrap it in the `styled() constructor`. Here we use the button from the last section and create a special one, extending it with some color-related styling:

> ref [styled-components.com](https://styled-components.com/)

# How we can test our React EcoSystems ?

In the folowing section, we will find the good way to test our reducer, thunk, selector, and styled-component.

At first, we will install two library that frequently use in React, and they both supper easy to use.

```
pnpm i --save-dev mocha chai

pnpm i --save-dev @babel/register
```

in order to make run the test by mocha, you'll need to add additional script to `package.json` file.

```json
"scripts": {
    "dev": "npx webpack-dev-server --mode development",
    "build": "npx webpack --mode development",
    "test": "mocha \"src/**/*.test.js\"--require @babel/register --recursive"
  },
```

next step, we need to create a folder inside the todo folder, and name it tests. We'll test reducer first by create the `reducers.test.js `file. Please note that all of test file will ending with \*\*.test.js.

```javascript
// reducers.test.js
import { expect } from "chai";
import { todos } from "../reducers";

describe("The todos reducer", () => {
  it("Adds a new todo when CREATE_TODO action is received", () => {
    const fakeTodo = { text: "hello", isCompleted: false };
    const fakeAction = {
      type: "CREATE_TODO",
      payload: {
        todo: fakeTodo,
      },
    };
    const originalState = { isLoading: false, data: [] };

    const expected = {
      isLoading: false,
      data: [fakeTodo],
    };
    const actual = todos(originalState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });
});
```

The results as following:

![image](https://user-images.githubusercontent.com/34083808/197346115-2815034e-a3bc-4cec-9694-5cd4cad2ce7d.png)

## Testing Thunks.

```
pnpm i --save-dev sinon node-fetch fetch-mock
```

We will use the above three libraries to imitate the fetching data from the server, and dispatching data to the store.

- Sinon package help us create a fake dispatch
- node-fetch and mock-fetch help us create fake fetching function from the server.

```javascript
import "node-fetch";
import fetchMock from "fetch-mock";
import { expect } from "chai";
import sinon from "sinon";
import { loadTodos } from "../thunks";

describe("The loadTodos thunk", () => {
  it("Dispatches the correct actions in the success scenario", async () => {
    const fakeDispatch = sinon.spy();

    const fakeTodos = [{ text: "1" }, { text: "2" }];
    fetchMock.get("http://localhost:8080/todos", fakeTodos);

    const expectedFirstAction = { type: "LOAD_TODO_IN_PROGRESS" };
    const expectedSecondAction = {
      type: "LOAD_TODO_SUCCESS",
      payload: {
        todos: fakeTodos,
      },
    };

    await loadTodos()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    fetchMock.reset();
  });
});
```

Note: The node-fetch in newest version may have some errors, we recommend using node-fetch v2.6.6 to compatiple with the current source code or you may find the better way to making those test.

> ref :

1. [Sinon.js](https://sinonjs.org/)
2. [node-fetch](https://www.npmjs.com/package/node-fetch)
3. [fetch-mock](https://www.wheresrhys.co.uk/fetch-mock/)
4. [Mocha](https://mochajs.org/)
5. [Chaijs](https://www.chaijs.com/)

## Testing Selectors.

for common selector, which is dirrectly get data from the state, you can test dirrectly without any problems. If you have selectors composed of many other selectors `.resultFunc` can help you test each selector without coupling all of your tests to the shape of your state.

for instance, we have the selector at below:

```javascript
//selectors.js
export const selectFirst = createSelector( ... )
export const selectSecond = createSelector( ... )
export const selectThird = createSelector( ... )

export const myComposedSelector = createSelector(
  selectFirst,
  selectSecond,
  selectThird,
  (first, second, third) => first * second < third
)
```

And then a set of unit tests like this:

```javascript
// tests for the first three selectors...
test("selectFirst unit test", () => { ... })
test("selectSecond unit test", () => { ... })
test("selectThird unit test", () => { ... })

// We have already tested the previous
// three selector outputs so we can just call `.resultFunc`
// with the values we want to test directly:
test("myComposedSelector unit test", () => {
  // here instead of calling selector()
  // we just call selector.resultFunc()
  assert(myComposedSelector.resultFunc(1, 2, 3), true)
  assert(myComposedSelector.resultFunc(2, 2, 1), false)
})
```

```javascript
import { expect } from "chai";
import { getCompletedTodos } from "../selectors";

describe("The getCompletedTodos Selector", () => {
  it("Return only completed todos", () => {
    const fakeTodos = [
      {
        text: "say hello",
        isCompleted: true,
      },
      {
        text: "say goodbey",
        isCompleted: false,
      },
      {
        text: "climb Mount Everest",
        isCompleted: false,
      },
    ];

    const expected = [
      {
        text: "say hello",
        isCompleted: true,
      },
    ];

    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});
```
