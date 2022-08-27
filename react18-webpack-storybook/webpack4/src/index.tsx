import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <>React with webpack4</>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
