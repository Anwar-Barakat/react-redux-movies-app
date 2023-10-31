import React, { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selected, setSelected] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(parseInt(index * 100));
    setTimeout(() => {
      setSelected(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((element, index) => (
          <span
            key={index}
            onClick={() => activeTab(element, index)}
            className={`tabItem ${selected === index ? "active" : ""}`}
          >
            {element}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
