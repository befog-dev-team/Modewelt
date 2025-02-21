"use client";

import { Switch } from "antd";
import { useState } from "react";

// Ensure that Tailwind is set up in your Next.js project for styling
const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="flex items-center space-x-8">
      <Switch
        checked={isOn}
        onChange={() => setIsOn(!isOn)}
        checkedChildren="On"
        unCheckedChildren="Off"
        style={{
          transform: "scale(1.5)", // Increases the height/size of the switch
          backgroundColor: isOn ? "#108577" : "#bfbfbf", // Changes the color to green when 'on'
          borderColor: isOn ? "#108577" : "#bfbfbf", // Border color to green when 'on'
        }}
      />
    </div>
  );
};

export default ToggleSwitch;
