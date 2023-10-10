"use client";

import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";
import {prefixBaseApiPath} from "../_utils/path";

type CodeValue = {
  code: string;
  value: string;
};

type State = {
  renderFormState: boolean;
  choices: CodeValue[];
  levels: FormLevel[];
};

export default function UpdateFaBox() {
  const [formData, setFormData] = useState<State>({renderFormState: false, choices: [], levels: []});

  function pushOrResetArrayAfterIndex<T>(arr: T[], index: number, value: T) {
    if (arr.length <= index) {
      arr.push(value);
    } else {
      arr[index] = value;
      arr.length = index + 1;
    }
  }

  function fetchLevelsAndRender(localFormData: State, listIndex: number, levelId: number) {
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
          fetch(prefixBaseApiPath(`/dfsp/getLevelValues/${levelId}`))
            .then((levelValueRes) => {
              levelValueRes.json().then((levelValueResJson: FormLevelValueResponse) => {
                formDataToPush.options = levelValueResJson.levelValues.map((x, i) => ({
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
      code: formData.levels[listIndex].name,
      value,
    });
    if (textChange) return;
    let nextLevelId: number = 0;
    formData.levels[listIndex].options.forEach((x) => {
      if (x.name === value) {
        nextLevelId = x.nextLevelId;
        return;
      }
    });
    fetchLevelsAndRender(localFormData, listIndex + 1, nextLevelId);
  }

  function updateFaSubmit() {
    if (!formData.renderFormState) {
      const localFormData = structuredClone(formData);
      localFormData.renderFormState = true;
      fetchLevelsAndRender(localFormData, 0, 1);
      return;
    }
    fetch(prefixBaseApiPath("/dfsp/updateFaRequest"), {
      method: "POST",
      body: JSON.stringify({dfspValues: formData.choices}),
      headers: {"Content-Type": "application/json"},
    });
  }

  return (
    <>
      <div>
        <h2 className="p-4">Update your Linked Financial Address.</h2>
        <div className="flex-column justify-center items-center p-4">
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
          <div className="m-5">
            <Button variant="contained" onClick={updateFaSubmit}>
              {formData.renderFormState ? "Submit" : "Update Details"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
