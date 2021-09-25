import React, { useState } from "react";
import { Select, Fieldset, Button, TextField } from "react95";
import Input from "../common/Input";
import Signers from "../../containers/Signers";

const CustomSigner = () => {
  const [text, setText] = useState("");
  const { attemptSetCustomSigner } = Signers.useContainer();

  return (
    <Fieldset label="Sedona RoofSlapper V2" style={{ marginBottom: "12px" }}>
      <p>roof slap your JayPegsAutoMart Donas multiple times or roof slap multiple Donas in one transaction </p>
      <p>roofSlapper deployed at: <a href = "https://etherscan.io/address/0xadc2e2f3fab83aa44b54538f8ddba289c675d8d0#code" target="_blank"> 0xadc2e2f...675d8d0 </a> </p>
      {/* <Input
        style={{ fontSize: `12px` }}
        value={text}
        placeholder="turkey snow danger yearly kale..."
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        fullWidth
        style={{ marginTop: "12px" }}
        onClick={() => {
          attemptSetCustomSigner(text);
        }}
        disabled={text === ""}
      >
        Connect
      </Button> */}
    </Fieldset>
  );
};

export default CustomSigner;
