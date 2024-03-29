"use client";
import {useEffect, useState} from "react";
import {prefixBaseApiPath, prefixBasePath} from "@/utils/path";
import {getFa} from "@/utils/getFa";
import {updateFa} from "@/utils/updateFa";
import {useLocale} from "next-intl";
import {FormLevel, FormLevelValue, KeyValue} from "@/types/dfsp-levels";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useSubmission} from "../store/auth-context";

type State = {
  choices: KeyValue[];
  levels: FormLevel[];
};

export default function UpdateFaBox() {
  const localActive = useLocale();
  const t = useTranslations("Update");
  const {setDataSubmitted} = useSubmission();

  const [subTab, setSubTab] = useState("");
  const [formData, setFormData] = useState<State>({choices: [], levels: []});
  //  0 - empty/default. 1 - update form. 2 - loading. 3 - succ. 4 - fail.
  const [renderState, setRenderState] = useState(0);
  var alreadyLinked = false;
  const router = useRouter();
  const [isValidEmail, isntValidEmail] = useState(true);
  const [isValidPhone, isntValidPhone] = useState(true);
  const [isValidAcc, isntValidAcc] = useState(true);

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

  function updateFaSubmit() {
    setRenderState(2);

    if (renderState !== 1 && renderState !== 2) {
      setRenderState(1);
      const localFormData = structuredClone(formData);
      fetchLevelsAndRender(localFormData, 0, 1);
    } else {
      let emailIsValid = true;
      let phoneIsValid = true;
      let accIsValid = true;
      formData.levels.forEach((x, i) => {
        if (x.name === "Email") {
          const emailValue = String(formData.choices[i]?.value);
          if (emailValue.length === 0 || !emailValue.includes("@")) {
            emailIsValid = false;
          }
        }
        if (x.code === "phone") {
          const phoneValue = String(formData.choices[i]?.value);
          if (phoneValue.length === 0 || phoneValue.length !== 10) {
            phoneIsValid = false;
          }
        }
        if (x.code === "account_no") {
          if (!formData.choices[i]?.value || formData.choices[i]?.value === "") {
            accIsValid = false;
          }
        }
      });
      if (!emailIsValid || !phoneIsValid || !accIsValid) {
        setRenderState(1);
        if (!emailIsValid) {
          isntValidEmail(false);
        }
        if (!phoneIsValid) {
          isntValidPhone(false);
        }
        if (!accIsValid) {
          isntValidAcc(false);
        }
        console.log("entereed");
        return;
      }
      const updateFaSuccess = (res: any) => {
        if (res.status === "succ") {
          setDataSubmitted(true);
          console.log("Form Data upon submission:", formData);
          setRenderState(3);
          router.push(`/${localActive}/status`);
        } else {
          console.log("Received failure on update FA", res);
        }
      };
      const updateFaFailure = (res: any, err: any) => {
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
            console.log("Received Error while getting FA during update FA", res, err);
          },
          false,
          0
        );
      }
    }
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
  const handleTabClick = (tab: any, next_level_id: number | undefined, id: number) => {
    const updatedFormData = {...formData};
    setSubTab(tab);
    const vals = formData.levels[0].options;

    if (vals) {
      const tabIndex = vals.findIndex((option) => option.id === id);

      if (tabIndex !== -1) {
        const selectedOption = vals[tabIndex];
        updatedFormData.levels[0].next_level_id = selectedOption.next_level_id;
        updatedFormData.levels[0].id = selectedOption.id;

        if (next_level_id) {
          updatedFormData.levels[0].next_level_id = next_level_id;
        }
        onFieldChange(0, selectedOption.code);

        setFormData(updatedFormData);
      }
    }
  };

  useEffect(() => {
    updateFaSubmit();
  }, []);

  const subTabs = ["subTab1", "subTab2", "subTab3"];
  return (
    <>
      <div className="2xl:m-36 container ">
        <div className="text-orange-500 text-2xl ">{t("update")}</div>
        <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
        {renderState === 1 && (
          <div className="">
            {formData.levels.length > 0 && (
              <>
                <div className="mt-2 text-black text-sm">{formData.levels[0].name}</div>
                <div className="flex flex-col mt-1">
                  <div className="flex flex-row gap-4 ">
                    {formData.levels[0].options?.map((option, j) => (
                      <div key={`option-${j}`}>
                        <div className="flex flex-row gap-8">
                          <div
                            className={`border-2 border-gray-300 rounded-md w-24 h-24 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-orange-500 hover:shadow-lg ${subTab === `subTab${j + 1}` ? "border-orange-500" : ""}`}
                            onClick={() => handleTabClick(`subTab${j + 1}`, option.next_level_id, option.id)}
                          >
                            <div className="flex flex-col m-6 mt-4">
                              <Image
                                className={`w-10 h-10 square-full ${
                                  subTab === `subTab${j + 1}` ? "opacity-100" : "opacity-30"
                                }`}
                                src={prefixBasePath(`/img/${option.name}.png`)}
                                alt={option.name}
                                width={50}
                                height={50}
                              />
                              <p
                                className={`text-center text-xs ${
                                  subTab === `subTab${j + 1}` ? "text-orange-500" : "text-gray-400"
                                }`}
                              >
                                {option.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {subTabs.map(
                    (subTab, index) =>
                      subTab === "subTab1" && (
                        <div key={index}>
                          {formData.levels.map((x, i) => (
                            <div key={`input-${i}`} className="mb-2 mt-0 p-0">
                              {i > 0 &&
                                (x.level >= 0 ? (
                                  <div>
                                    <label className=" text-black text-sm">{x.name}</label>
                                    <select
                                      className="outline-none w-full border-t-2 p-3 border border-gray-500 shadow-md rounded-md bg-white"
                                      onChange={(event) => onFieldChange(i, event.target.value)}
                                      value={formData.choices[i]?.value}
                                      required
                                    >
                                      <option value="">Select {x.name}</option>
                                      {x.options?.map((y, j) => (
                                        <option className="p-4" key={`input-option-${j}`} value={y.code}>
                                          {y.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : (
                                  <div className="flex flex-col">
                                    <label className="text-sm text-black">{x.name}</label>
                                    <input
                                      type="text"
                                      className="outline-none w-full p-2 mt-1  rounded-md border "
                                      onChange={(event) => onFieldChange(i, event.target.value)}
                                      value={formData.choices[i]?.value || ""}
                                      placeholder={`Type ${x.name}`}
                                      required
                                    />

                                    {x.name === "Email" &&
                                      (formData.choices[i]?.value.length === 0 ||
                                        !formData.choices[i]?.value.includes("@")) && (
                                        <p className="text-sm text-red-500">Invalid {x.name}</p>
                                      )}
                                    {x.code === "phone" &&
                                      (formData.choices[i]?.value.length === 0 ||
                                        formData.choices[i]?.value.length !== 10) && (
                                        <p className="text-sm text-red-500">Invalid Phone Number</p>
                                      )}
                                    {x.code === "account_no" &&
                                      (!formData.choices[i]?.value || formData.choices[i]?.value === "") && (
                                        <p className="text-sm text-red-500">Invalid {x.name}</p>
                                      )}
                                    <div className="flex flex-row gap-4">
                                      <button
                                        className="inline-block mt-4  shadow-md shadow-orange-300 text-white text-sm  bg-black rounded-3xl w-1/2 text-center   hover:bg-customYellow"
                                        onClick={() => updateFaSubmit()}
                                      >
                                        {t("submit")}
                                      </button>

                                      <div className="inline-block shadow-md shadow-gray-300 mt-4 border border-gray-500 rounded-3xl w-1/2 text-center p-2 hover:border-black hover:border-2">
                                        <Link href={`/${localActive}/home`} className="text-gray-500 text-sm">
                                          CANCEL
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ))}
                        </div>
                      )
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
