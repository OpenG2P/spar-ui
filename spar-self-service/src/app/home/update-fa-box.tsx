"use client";

import {Button, MenuItem, TextField} from "@mui/material";
import {useState} from "react";
import {prefixBaseApiPath} from "../../utils/path";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {FormLevel, FormLevelValueResponse} from "../../types/dfsp-levels";

type KeyValue = {
  key: string;
  value: string;
};

type State = {
  renderFormState: number;
  choices: KeyValue[];
  levels: FormLevel[];
};

export default function UpdateFaBox() {
  const [formData, setFormData] = useState<State>({renderFormState: 0, choices: [], levels: []});

  function pushOrResetArrayAfterIndex<T>(arr: T[], index: number, value: T) {
    if (arr.length <= index) {
      arr.push(value);
    } else {
      arr[index] = value;
      arr.length = index + 1;
    }
  }

  function fetchLevelsAndRender(localFormData: State, listIndex: number, levelId: number, id?: number) {
    fetch(prefixBaseApiPath(`/dfsp/getLevel/${levelId}`)).then((levelRes) => {
      levelRes.json().then((levelResJson: {id: number; name: string; code: string; level: number}) => {
        const formDataToPush: FormLevel = {
          id: levelResJson.id,
          name: levelResJson.code,
          displayName: levelResJson.name,
          isTextField: levelResJson.level < 0,
          options: [],
        };
        if (levelResJson.level >= 0) {
          fetch(
            prefixBaseApiPath(`/dfsp/getLevelValues/${levelId}${id != undefined ? `?parentId=${id}` : ""}`)
          )
            .then((levelValueRes) => {
              levelValueRes.json().then((levelValueResJson: FormLevelValueResponse) => {
                formDataToPush.options = levelValueResJson.levelValues.map((x) => ({
                  id: x.id,
                  displayName: x.name,
                  name: x.code,
                  nextLevelId: x.next_level.id,
                }));
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
      });
    });
  }

  function onFieldChange(listIndex: number, value: string, textChange = false) {
    const localFormData = structuredClone(formData);
    pushOrResetArrayAfterIndex(localFormData.choices, listIndex, {
      key: formData.levels[listIndex].name,
      value,
    });
    if (textChange) {
      setFormData(localFormData);
      return;
    }
    let selectedOption: any;
    formData.levels[listIndex].options.forEach((x) => {
      if (x.name === value) {
        selectedOption = x;
        return;
      }
    });
    fetchLevelsAndRender(localFormData, listIndex + 1, selectedOption.nextLevelId, selectedOption.id);
  }

  function updateFaSubmit() {
    const localFormData = structuredClone(formData);
    if (formData.renderFormState === 0) {
      localFormData.renderFormState = 1;
      fetchLevelsAndRender(localFormData, 0, 1);
    } else {
      fetch(prefixBaseApiPath("/selfservice/updateFaRequest"), {
        method: "POST",
        body: JSON.stringify({level_values: localFormData.choices}),
        headers: {"Content-Type": "application/json"},
      });
      localFormData.renderFormState = 2;
      setFormData(localFormData);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row flex justify-content-center">
          <h2 className="p-4">Update your Linked Financial Address.</h2>
        </div>
        {formData.renderFormState === 1 && (
          <div className="row">
            {formData.levels.map((x, i) => (
              <div key={`input-${i}`} className="m-5">
                <TextField
                  label={x.displayName}
                  onChange={(event) => onFieldChange(i, event.target.value, x.isTextField)}
                  select={!x.isTextField}
                  fullWidth
                >
                  {!x.isTextField &&
                    x.options.map((y, j) => (
                      <MenuItem key={`input-menu-${j}`} value={y.name}>
                        {y.displayName}
                      </MenuItem>
                    ))}
                </TextField>
              </div>
            ))}
          </div>
        )}
        {formData.renderFormState === 2 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto my-10">
              <CheckCircleOutlineIcon sx={{scale: "1.8"}} fontSize="large" color="success" />
            </div>
          </div>
        )}
        <div className="row flex justify-content-center">
          <div className="mx-auto mb-2">
            <Button variant="contained" onClick={updateFaSubmit}>
              {formData.renderFormState === 1 ? "Submit" : "Update Details"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
