import { useState } from "react";
import { createRoot } from "react-dom/client";
import { useRequest } from "ahooks";

let parentData = 0;
let childData = 0;

function fetchDataForParent() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(parentData++);
    }, 100);
  });
}

function fetchDataForChild() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(childData++);
    }, 100);
  });
}

function Parent() {
  const { data } = useRequest(() => fetchDataForParent(), {
    refreshOnWindowFocus: true,
    focusTimespan: 0,
  });
  const [isChildVisible, setIsChildVisible] = useState(true);
  return (
    <div>
      <div>I am parent</div>
      <div>parent data: {data}</div>
      {isChildVisible && <Child />}
      <button onClick={() => setIsChildVisible(!isChildVisible)}>
        switch child visible
      </button>
    </div>
  );
}

function Child() {
  const { data } = useRequest(() => fetchDataForChild(), {
    refreshOnWindowFocus: true,
    focusTimespan: 0,
  });
  return (
    <div>
      I am child
      <div>child data: {data}</div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Parent />);
