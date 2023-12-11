import {prefixBaseApiPath} from "./path";

export function getFaStatusLoop(
  txnId: string,
  succFunc: (_res: any) => any,
  failFunc: (_res: any, _err: any) => any,
  deconstruct = true,
  statusDelay = 1000
) {
  fetch(prefixBaseApiPath(`/selfservice/getFaRequestStatus/${txnId}?deconstruct=${deconstruct}`))
    .then((res) => {
      if (res.ok) {
        res
          .json()
          .then((resJson) => {
            if (resJson.status == "succ" || resJson.status == "rjct") {
              return succFunc(resJson);
            } else {
              setTimeout(
                () => getFaStatusLoop(txnId, succFunc, failFunc, deconstruct, statusDelay),
                statusDelay
              );
            }
          })
          .catch((err) => failFunc(null, err));
      } else {
        return failFunc(null, null);
      }
    })
    .catch((err) => failFunc(null, err));
}

export function getFa(
  succFunc: (_res: any) => any,
  failFunc: (_res: any, _err: any) => any,
  deconstruct = true,
  statusDelay = 1000
) {
  fetch(prefixBaseApiPath("/selfservice/getFaRequest"), {
    method: "POST",
  })
    .then((res) => {
      if (res.ok) {
        res
          .json()
          .then((resJson) => {
            setTimeout(
              () => getFaStatusLoop(resJson.txn_id, succFunc, failFunc, deconstruct, statusDelay),
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
