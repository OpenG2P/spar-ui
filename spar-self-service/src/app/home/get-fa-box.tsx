"use client";

import {Button, CircularProgress, TextField} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import {useState} from "react";
import {getFa} from "../../utils/getFa";
import {KeyValue} from "../../types/dfsp-levels";
import {authContext} from "../../components/auth";

export default function GetFaBox() {
  const [getFaResult, setGetFaResult] = useState<string | KeyValue[]>("");
  // 0 - default/empty. 1 - loading. 2 - output. 3 - error.
  const [renderState, setRenderState] = useState(0);

  function onClick() {
    setRenderState(1);
    getFa(
      (res) => {
        if (res.status == "succ") {
          if (res.fa) {
            setGetFaResult(res.fa);
            setRenderState(2);
          } else {
            // TODO: Raise Error
            console.log("Received success without FA on get FA", res);
          }
        } else {
          // TODO: Render NOT LINKED
          console.log("Received failure on get FA", res);
        }
      },
      (res, err) => {
        // TODO: Raise Error
        console.log("Received Error checking for get FA status", res, err);
      },
      !authContext.getFaRaw
    );
  }

  return (
    <>
      <div className="container">
        <div className="row flex justify-content-center">
          <h2 className="p-4">Currently Linked Financial Address.</h2>
        </div>
        {renderState === 1 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto my-10">
              <CircularProgress />
            </div>
          </div>
        )}
        {renderState === 2 && !(getFaResult instanceof Array) && (
          <div className="row">
            <div className="m-5">
              <TextField label="FA" InputProps={{readOnly: true}} fullWidth value={getFaResult} />
            </div>
          </div>
        )}
        {renderState === 2 && getFaResult instanceof Array && (
          <div className="row">
            {getFaResult.map((x, i) => (
              <div key={`input-${i}`} className="m-5">
                <TextField label={x.key} InputProps={{readOnly: true}} fullWidth value={x.value} />
              </div>
            ))}
          </div>
        )}
        {/* TODO: Render Error */}
        {renderState === 0 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto mb-2">
              <Button onClick={onClick} variant="outlined">
                Get Current Financial Address
              </Button>
            </div>
          </div>
        )}
        {renderState > 1 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto mb-2">
              <Button onClick={onClick} variant="contained">
                <ReplayIcon fontSize="large" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
