"use client";

import {prefixBaseApiPath} from "@/utils/path";
import {Button, CircularProgress} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {useState} from "react";

export default function GetFaBox() {
  const [getFaState, setGetFaState] = useState({state: 0, fa: ""});

  function keepCheckingStatus(txnId: string) {
    fetch(prefixBaseApiPath(`/selfservice/getFaRequestStatus/${txnId}`))
      .then((res) => {
        if (res.ok) {
          res.json().then((resJson) => {
            if (resJson.fa) {
              setGetFaState({state: 2, fa: resJson.fa});
            } else {
              setTimeout(() => keepCheckingStatus(txnId), 5000);
            }
          });
        } else {
          console.log("Received Error while checking status");
        }
      })
      .catch((err) => {
        console.log("Received Error checking for status", err);
      });
  }

  function onClick() {
    fetch(prefixBaseApiPath("/selfservice/getFaRequest"), {
      method: "POST",
    }).then((res) => {
      res.json().then((resJson) => {
        setTimeout(() => keepCheckingStatus(resJson.txn_id), 5000);
        setGetFaState({state: 1, fa: ""});
      });
    });
  }

  return (
    <>
      <div>
        <h2>Currently Linked Financial Address.</h2>
        {getFaState.state > 0 && (
          <div className="m-5">
            {getFaState.state === 1 && <CircularProgress />}
            {getFaState.state === 2 && <p>{getFaState.fa}</p>}
            {/* {getFaState.state === 2 && <CheckCircleOutlineIcon  color="success"/>} */}
          </div>
        )}
        {getFaState.state != 1 && (
          <Button onClick={onClick} variant="outlined">
            Get Current Financial Address
          </Button>
        )}
      </div>
    </>
  );
}
