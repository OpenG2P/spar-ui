import {prefixBaseApiPath} from "./path";
import {KeyValue} from "../types/dfsp-levels";

export function updateFaStatusLoop(
  txnId: string,
  succFunc: (_res: any) => any,
  failFunc: (_res: any, _err: any) => any,
  link = false,
  statusDelay = 1000
) {
  fetch(prefixBaseApiPath(`/selfservice/updateFaRequestStatus/${txnId}?link=${link}`))
    .then((res) => {
      if (res.ok) {
        res
          .json()
          .then((resJson) => {
            if (resJson.status == "rcvd" || resJson.status == "pdng") {
              setTimeout(() => updateFaStatusLoop(txnId, succFunc, failFunc, link, statusDelay), statusDelay);
            } else {
              return succFunc(resJson);
            }
          })
          .catch((err) => failFunc(null, err));
      } else {
        return failFunc(null, null);
      }
    })
    .catch((err) => failFunc(null, err));
}

export function updateFa(
  succFunc: (_res: any) => any,
  failFunc: (_res: any, _err: any) => any,
  levelValues: KeyValue[],
  link = true,
  statusDelay = 1000
) {
  fetch(prefixBaseApiPath(`/selfservice/updateFaRequest?link=${link}`), {
    method: "POST",
    body: JSON.stringify({level_values: levelValues}),
    headers: {"Content-Type": "application/json"},
  })
    .then((res) => {
      if (res.ok) {
        res
          .json()
          .then((resJson) => {
            setTimeout(
              () => updateFaStatusLoop(resJson.txn_id, succFunc, failFunc, link, statusDelay),
              statusDelay
            );
          })
          .catch((err) => failFunc(null, err));
      } else {
        return failFunc(null, null);
      }
    })
    .catch((err) => {
      return failFunc(null, err);
    });
}
