import React, { useState } from "react";
import { flushSync } from "react-dom";
export const AutoBatch = () => {
  const [stateA, setStateA] = useState(0);
  const [stateB, setStateB] = useState(0);

  const handleClick = () => {
    console.log("clicked normal ver");
    setStateA((a) => a + 1);
    setStateB((b) => b + 2);
  };

  // flushSyncでver17と同じ挙動を実装
  const handleClickVer17 = () => {
    console.log("clicked Ver17");
    setTimeout(() => {
      flushSync(() => {
        setStateA((a) => a + 1);
      });
      flushSync(() => {
        setStateB((b) => b + 2);
      });
    }, 0);
  };

  const handleClickVer18 = () => {
    console.log("clicked Ver18");
    setTimeout(() => {
      setStateA((a) => a + 1);
      setStateB((b) => b + 2);
    }, 0);
  };

  console.log("render: ", { stateA, stateB });
  return (
    <div>
      <button onClick={handleClick}>click</button>
      <button onClick={handleClickVer17}>click v17</button>
      <button onClick={handleClickVer18}>click v18</button>
      <div>Counted A: {stateA}</div>
      <div>Counted B: {stateB}</div>
    </div>
  );
};
