"use client";

import {Button} from "@mui/material";

export default function GetFaBox() {
  return (
    <>
      <div>
        <h2>Currently Linked Financial Address.</h2>
        <p>{}</p>
        <Button variant="outlined">Get Current Financial Address</Button>
      </div>
    </>
  );
}
