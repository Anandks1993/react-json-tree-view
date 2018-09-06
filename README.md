# react-json-tree-view
A package to show your JSON data for viewing purpose.

# Installation
`npm install react-json-tree-view`

# Demo
Check [here](https://codesandbox.io/s/l4xp0jm399)

# Example

```
import React from "react";
import ReactDOM from "react-dom";
import JsonView from "react-json-tree-view";

const data = {
  quiz: {
    sport: {
      q1: {
        question: "Which one is correct team name in NBA?",
        options: [
          "New York Bulls",
          "Los Angeles Kings",
          "Golden State Warriros",
          "Huston Rocket"
        ],
        answer: "Huston Rocket"
      }
    },
    maths: {
      q1: {
        question: "5 + 7 = ?",
        options: ["10", "11", "12", "13"],
        answer: "12"
      },
      q2: {
        question: "12 - 8 = ?",
        options: ["1", "2", "3", "4"],
        answer: "4"
      }
    }
  }
};

function App() {
  return (
    <div className="App">
      <JsonView data={data} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

# Props
| Prop               | Type              | Default Value   |
| ------------------ | ----------------- | --------------- |
| data               | object (or) array | { 0: 'No data' }|
| keyColor           | string            | #000            |
| valueColor         | string            | #000            |
| borderLeftColor    | string            | #A09696         |
| sortArrowColor     | string            | #000            |
| bulletColor        | string            | #000            |
| boxBracketsColor   | string            | #000            |
| curlyBracketsColor | string            | #000            |

# License
**MIT**
