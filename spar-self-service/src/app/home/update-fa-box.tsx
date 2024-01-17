"use client";

import {Button, CircularProgress, MenuItem, TextField} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {useState} from "react";
import {prefixBaseApiPath} from "../../utils/path";
import {getFa} from "../../utils/getFa";
import {updateFa} from "../../utils/updateFa";
import {FormLevel, FormLevelValue, KeyValue} from "../../types/dfsp-levels";

type State = {
  choices: KeyValue[];
  levels: FormLevel[];
};

export default function UpdateFaBox() {
  const [formData, setFormData] = useState<State>({choices: [], levels: []});
  // 0 - empty/default. 1 - update form. 2 - loading. 3 - succ. 4 - fail.
  const [renderState, setRenderState] = useState(0);
  var alreadyLinked = false;

  function pushOrResetArrayAfterIndex<T>(arr: T[], index: number, value: T) {
    if (arr.length <= index) {
      arr.push(value);
    } else {
      arr[index] = value;
      arr.length = index + 1;
    }
  }

  function fetchLevelsAndRender(
    localFormData: State,
    listIndex: number,
    levelId?: number,
    parentId?: number
  ) {
    fetch(prefixBaseApiPath(`/dfsp/getLevels?id=${levelId}`)).then((levelRes) => {
      levelRes.json().then((levelResJson: {levels: FormLevel[]}) => {
        if (levelResJson.levels.length > 0) {
          const formDataToPush = levelResJson.levels[0];
          if (formDataToPush.level >= 0) {
            fetch(
              prefixBaseApiPath(
                `/dfsp/getLevelValues?levelId=${levelId}${
                  parentId != undefined ? `&parentId=${parentId}` : ""
                }`
              )
            )
              .then((levelValueRes) => {
                levelValueRes.json().then((levelValueResJson: {levelValues: FormLevelValue[]}) => {
                  formDataToPush.options = levelValueResJson.levelValues;
                  pushOrResetArrayAfterIndex(localFormData.levels, listIndex, formDataToPush);
                  setFormData(localFormData);
                });
              })
              .catch(() => {
                pushOrResetArrayAfterIndex(localFormData.levels, listIndex, formDataToPush);
                setFormData(localFormData);
              });
          } else {
            pushOrResetArrayAfterIndex(localFormData.levels, listIndex, formDataToPush);
            setFormData(localFormData);
          }
        }
      });
    });
  }

  function onFieldChange(listIndex: number, value: string) {
    const localFormData = structuredClone(formData);
    const formLevel = localFormData.levels[listIndex];
    pushOrResetArrayAfterIndex(localFormData.choices, listIndex, {
      key: formLevel.code,
      value,
    });
    if (formLevel.level < 0) {
      if (formLevel.next_level_id) {
        fetchLevelsAndRender(localFormData, listIndex + 1, formLevel.next_level_id);
      } else {
        setFormData(localFormData);
      }
      return;
    }
    let selectedOption: FormLevelValue;
    formLevel.options?.forEach((x) => {
      if (x.code === value) {
        selectedOption = x;
        fetchLevelsAndRender(localFormData, listIndex + 1, selectedOption.next_level_id, selectedOption.id);
        return;
      }
    });
  }

  function updateFaSubmit() {
    setRenderState(2);
    if (renderState !== 1 && renderState !== 2) {
      setRenderState(1);
      const localFormData = structuredClone(formData);
      fetchLevelsAndRender(localFormData, 0, 1);
    } else {
      const updateFaSuccess = (res: any) => {
        if (res.status === "succ") {
          setRenderState(3);
        } else {
          // TODO: Raise Error
          console.log("Received failure on update FA", res);
        }
      };
      const updateFaFailure = (res: any, err: any) => {
        // TODO: Raise Error
        console.log("Received Error while updating FA", res, err);
      };
      if (alreadyLinked) {
        updateFa(updateFaSuccess, updateFaFailure, formData.choices, !alreadyLinked);
      } else {
        getFa(
          (res) => {
            alreadyLinked =
              res.status === "succ" &&
              !(
                res.status_reason_code === "succ.id.inactive" ||
                res.status_reason_code === "succ.id.not_found" ||
                res.status_reason_code === "succ.fa.not_linked_to_id"
              );
            updateFa(updateFaSuccess, updateFaFailure, formData.choices, !alreadyLinked);
          },
          (res, err) => {
            // TODO: Raise Error
            console.log("Received Error while getting FA during update FA", res, err);
          },
          false,
          0
        );
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="row flex justify-content-center">
          <h2 className="p-4">Update your Linked Financial Address.</h2>
        </div>
        {renderState === 1 && (
          <div className="row">
            {formData.levels.map((x, i) => (
              <div key={`input-${i}`} className="m-5">
                <TextField
                  label={x.name}
                  onChange={(event) => onFieldChange(i, event.target.value)}
                  select={x.level >= 0}
                  fullWidth
                >
                  {x.level >= 0 &&
                    x.options?.map((y, j) => (
                      <MenuItem key={`input-menu-${j}`} value={y.code}>
                        {y.name}
                      </MenuItem>
                    ))}
                </TextField>
              </div>
            ))}
          </div>
        )}
        {renderState === 2 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto my-10">
              <CircularProgress />
            </div>
          </div>
        )}
        {renderState === 3 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto my-10">
              <CheckCircleOutlineIcon sx={{scale: "1.8"}} fontSize="large" color="success" />
            </div>
          </div>
        )}
        {renderState === 1 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto mb-2">
              <Button variant="contained" onClick={updateFaSubmit}>
                Submit
              </Button>
            </div>
          </div>
        )}
        {renderState !== 1 && renderState !== 2 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto mb-2">
              <Button variant="contained" onClick={updateFaSubmit}>
                Update Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
