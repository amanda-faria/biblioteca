import React from "react";
import Card from "../components/card";

const ContentContainer = ({ title, children, hasOverflowY }) => {
  return (
    <div className="new-container">
      <div style={{ width: "100%" }}>
        <Card title={title} style={{ height: "89.9vh", overflow: "hidden" }}>
          <div
            style={{
              height: "89.9vh",
              overflowY: hasOverflowY ? "scroll" : "none",
            }}
          >
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentContainer;
