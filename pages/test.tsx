import { useState } from "react";
function Test() {
  const [msg, setMsg] = useState("Msg");

  const styleConten = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //   height: "100vh",
  };

  return (
    <div>
      <h1 style={styleConten}>{msg}</h1>
      <div style={styleConten}>
        <input type="text" />
      </div>
      <div style={styleConten}>
        <button>Send</button>
      </div>
    </div>
  );
}

export default Test;
