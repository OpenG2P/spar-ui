
"use client";
import { useEffect, useState } from "react";
import { prefixBaseApiPath } from "../../utils/path";
import { getFa } from "../../utils/getFa";
import { updateFa } from "../../utils/updateFa";
import { useLocale } from 'next-intl';
import { FormLevel, FormLevelValue, KeyValue } from "../../types/dfsp-levels";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSubmission } from "../store/auth-context";


type State = {
  choices: KeyValue[];
  levels: FormLevel[];
};

export default function UpdateFaBox(
) {

  const localActive = useLocale();
  const t = useTranslations('Update')
  const { setDataSubmitted } = useSubmission();

  const [subTab, setSubTab] = useState("");
  // const [subTab, setSubTab] = useState("subTab1");
  const [formData, setFormData] = useState<State>({ choices: [], levels: [] });
  //  0 - empty/default. 1 - update form. 2 - loading. 3 - succ. 4 - fail.
  const [renderState, setRenderState] = useState(0);
  var alreadyLinked = false;
  const router = useRouter();
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);


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
      levelRes.json().then((levelResJson: { levels: FormLevel[] }) => {
        if (levelResJson.levels.length > 0) {
          const formDataToPush = levelResJson.levels[0];
          if (formDataToPush.level >= 0) {
            fetch(
              prefixBaseApiPath(
                `/dfsp/getLevelValues?levelId=${levelId}${parentId != undefined ? `&parentId=${parentId}` : ""
                }`
              )
            )
              .then((levelValueRes) => {
                levelValueRes.json().then((levelValueResJson: { levelValues: FormLevelValue[] }) => {
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
        if (x.name === 'Email') {
          const emailValue = String(formData.choices[i]?.value);
          if (emailValue.length === 0 || !emailValue.includes('@')) {
            emailIsValid = false;
          }
        }
        if (x.code === 'phone') {
          const phoneValue = String(formData.choices[i]?.value);
          if (phoneValue.length === 0 ||phoneValue.length !== 10 ) {
            console.log('phoneValue:', phoneValue);
            phoneIsValid = false;
          }
        }
        if (x.code === 'account_no') {
          const accValue = String(formData.choices[i]?.value);
          if (accValue.length === 0 || accValue.length !== 10) {
            accIsValid = false;
          }
        }
      });
      if (!emailIsValid || !phoneIsValid || !accIsValid) {
        setEmailIsInvalid(!emailIsValid);
        setRenderState(1);
        if (!emailIsValid) {
          window.alert('Please enter a valid email address.');
        }
        if (!phoneIsValid) {
          window.alert('Please enter a valid 10-digit phone number.');
        }
        if (!accIsValid) {
          window.alert('Please enter a valid Account number.');
        }
        console.log("entereed")
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
  useEffect(() => {
    updateFaSubmit();
  }, []);
  const handleTabClick = (tab: any, next_level_id: number | undefined, id: number) => {
    const updatedFormData = { ...formData };
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
  }
  const subTabs = ['subTab1', 'subTab2', 'subTab3'];
  return (
    <>
      <div className="container ">
        {renderState === 1 && (
          <div className="row">
            {formData.levels.length > 0 && (
              <>
                <div className="mt-4 text-black text-sm">{formData.levels[0].name}</div>
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex flex-row gap-4">
                    {formData.levels[0].options?.map((option, j) => (
                      <div key={`option-${j}`}>
                        <div className="flex flex-row gap-8">
                          <div
                            className={`border-2 border-gray-300 rounded-md w-24 h-24 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-orange-500 hover:shadow-lg ${subTab === `subTab${j + 1}` ? 'border-orange-500' : ''}`}
                            onClick={() => handleTabClick(`subTab${j + 1}`, option.next_level_id, option.id)}
                          >
                            <div className="flex flex-col m-6 mt-4">
                              <Image className={`w-10 h-10 square-full ${subTab === `subTab${j + 1}` ? 'opacity-100' : 'opacity-30'
                                }`} src={`http://spar.openg2p.my/spar/img/${option.code}.png`} alt={option.name} width={50} height={50} />
                              <p
                                className={`text-center text-xs ${subTab === `subTab${j + 1}` ? 'text-orange-500' : 'text-gray-400'
                                  }`}
                              >{option.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>
                  {subTabs.map((subTab, index) => (
                    subTab === 'subTab1' && (
                      <div key={index}>
                        {formData.levels.map((x, i) => (
                          <div key={`input-${i}`} className="mb-4">
                            {i > 0 && (
                              x.level >= 0 ? (
                                <div>
                                  <label className=" text-black text-sm">{x.name}</label>
                                  <select
                                    className="w-full border-t-2 p-3 border border-gray-500 shadow-md rounded-md bg-white"
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
                                    className="w-full p-2 mt-1  rounded-md border "

                                    onChange={(event) => onFieldChange(i, event.target.value)}
                                    value={formData.choices[i]?.value || ''}
                                    required
                                  />

                                  {emailIsInvalid && <p className="text-sm text-red-500">Please Enter Valid Email</p>}
                                    {x.name === 'Email' && (formData.choices[i]?.value.length === 0 ||!formData.choices[i]?.value.includes('@')) && (
                                    <p className="text-sm text-red-500">Please Enter Valid {x.name}</p>
                                  )}
                                    {x.code === 'phone' && (formData.choices[i]?.value.length === 0 ||formData.choices[i]?.value.length !== 10 )&& (
                                    <p className="text-sm text-red-500">Phone number must be 10 digits</p>
                                  )}
                                    {x.code === 'account_no' && 
                                      (formData.choices[i]?.value.length === 0 || formData.choices[i]?.value.length < 10) && (
                                    <p className="text-sm text-red-500">Please select a {x.name}</p>
                                  )}
                                    <div className="flex flex-row gap-4">
                                      <button className="inline-block mt-8 bg-black rounded-3xl w-1/2 text-center p-2 shadow-md hover:bg-yellow-700" onClick={() => updateFaSubmit()}><Link href={`/${localActive}/status`} className="text-white text-sm">
                                        {t('submit')}
                                      </Link></button>

                                      <div className="inline-block mt-8 border border-gray-500 rounded-3xl w-1/2 text-center p-2 shadow-md hover:bg-yellow-700">
                                        <Link href={`/${localActive}/home`} className="text-gray-500 text-sm">
                                          Cancel
                                        </Link>
                                      </div>
                                    </div>
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  ))}

                </div>
              </>
            )}
          </div>
        )}
        
      </div>
    </>
  );
}























// "use client";
// import Select from "react-select";
// import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { useEffect, useState } from "react";
// import { prefixBaseApiPath } from "../../utils/path";
// import { getFa } from "../../utils/getFa";
// import { updateFa } from "../../utils/updateFa";
// import { useLocale } from 'next-intl';
// import { FormLevel, FormLevelValue, KeyValue } from "../../types/dfsp-levels";
// import Image from "next/image";
// import Link from "next/link";
// type UpdateFaBoxProps = {
//   levelindex: number;
//   parent: number;
// };
// type State = {
//   choices: KeyValue[];
//   levels: FormLevel[];
// };

// export default function UpdateFaBox({ levelindex, parent }: UpdateFaBoxProps
// ) {
//   const [formData, setFormData] = useState<State>({ choices: [], levels: [] });
//   const localActive = useLocale();
//   //  0 - empty/default. 1 - update form. 2 - loading. 3 - succ. 4 - fail.
//   const [renderState, setRenderState] = useState(0);
//   var alreadyLinked = false;


//   function pushOrResetArrayAfterIndex<T>(arr: T[], index: number, value: T) {
//     if (arr.length <= index) {
//       arr.push(value);
//     } else {
//       arr[index] = value;
//       arr.length = index + 1;
//     }
//   }


//   function fetchLevelsAndRender(
//     localFormData: State,
//     listIndex: number,
//     levelId?: number,
//     parentId?: number
//   ) {
//     fetch(prefixBaseApiPath(`/dfsp/getLevels?id=${levelId}`)).then((levelRes) => {
//       levelRes.json().then((levelResJson: { levels: FormLevel[] }) => {
//         if (levelResJson.levels.length > 0) {
//           const formDataToPush = levelResJson.levels[0];
//           if (formDataToPush.level >= 0) {
//             fetch(
//               prefixBaseApiPath(
//                 `/dfsp/getLevelValues?levelId=${levelId}${parentId != undefined ? `&parentId=${parentId}` : ""
//                 }`
//               )
//             )
//               .then((levelValueRes) => {
//                 levelValueRes.json().then((levelValueResJson: { levelValues: FormLevelValue[] }) => {
//                   formDataToPush.options = levelValueResJson.levelValues;
//                   pushOrResetArrayAfterIndex(localFormData.levels, listIndex, formDataToPush);
//                   setFormData(localFormData);
//                 });
//               })
//               .catch(() => {
//                 pushOrResetArrayAfterIndex(localFormData.levels, listIndex, formDataToPush);
//                 setFormData(localFormData);
//               });
//           } else {
//             pushOrResetArrayAfterIndex(localFormData.levels, listIndex, formDataToPush);
//             setFormData(localFormData);
//           }
//         }
//       });
//     });
//   }

//   function updateFaSubmit(levelindex: number, parent: number) {
//     setRenderState(2);
//     if (renderState !== 1 && renderState !== 2) {
//       setRenderState(1);
//       const localFormData = structuredClone(formData);
//       fetchLevelsAndRender(localFormData, levelindex, parent);
//     } else {
//       const updateFaSuccess = (res: any) => {
//         if (res.status === "succ") {
//           console.log("Form Data upon submission:", formData); // Add this line
//           setRenderState(3);
//         } else {
//           // TODO: Raise Error
//           console.log("Received failure on update FA", res);
//         }
//       };
//       const updateFaFailure = (res: any, err: any) => {
//         // TODO: Raise Error
//         console.log("Received Error while updating FA", res, err);
//       };
//       if (alreadyLinked) {
//         updateFa(updateFaSuccess, updateFaFailure, formData.choices, !alreadyLinked);
//       } else {
//         getFa(
//           (res) => {
//             alreadyLinked =
//               res.status === "succ" &&
//               !(
//                 res.status_reason_code === "succ.id.inactive" ||
//                 res.status_reason_code === "succ.id.not_found" ||
//                 res.status_reason_code === "succ.fa.not_linked_to_id"
//               );
//             updateFa(updateFaSuccess, updateFaFailure, formData.choices, !alreadyLinked);
//           },
//           (res, err) => {
//             console.log("Received Error while getting FA during update FA", res, err);
//           },
//           false,
//           0
//         );
//       }
//     }
//   }

//   function onFieldChange(listIndex: number, value: string) {
//     const localFormData = structuredClone(formData);
//     const formLevel = localFormData.levels[listIndex];
//     pushOrResetArrayAfterIndex(localFormData.choices, listIndex, {
//       key: formLevel.code,
//       value,
//     });
//     if (formLevel.level < 0) {
//       if (formLevel.next_level_id) {
//         fetchLevelsAndRender(localFormData, listIndex + 1, formLevel.next_level_id);
//       } else {
//         setFormData(localFormData);
//       }
//       return;
//     }
//     let selectedOption: FormLevelValue;
//     formLevel.options?.forEach((x) => {
//       if (x.code === value) {
//         selectedOption = x;
//         fetchLevelsAndRender(localFormData, listIndex + 1, selectedOption.next_level_id, selectedOption.id);
//         return;
//       }
//     });
//   }
//   useEffect(() => {
//     updateFaSubmit(levelindex, parent);
//   }, [levelindex, parent]);


//   return (
//     <>
//       <div className="container  w-max-auto">
//         {renderState === 1 && (
//           <div className="row ">
//             {formData.levels.map((x, i) => (
//               <div key={`input-${i}`} className=" mb-4">

//                 <label className=" text-sm">{x.name}</label>
//                 {x.level >= 0 ? (
//                   <select
//                     className="w-full border-t-2 p-3 border border-gray-500 shadow-md rounded-md bg-white"
//                     onChange={(event) => onFieldChange(i, event.target.value)}
//                     value={formData.choices[i]?.value}
//                   >
//                     <option value="">Select {x.name}</option>
//                     {x.options?.map((y, j) => (
//                       <option className="p-4" key={`input-option-${j}`} value={y.code}>
//                         {y.name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     type="text"
//                     className="w-full p-2 mt-1 border rounded-md"
//                     onChange={(event) => onFieldChange(i, event.target.value)}
//                     value={formData.choices[i]?.value}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//         {renderState === 2 && (
//           <div className="row flex justify-content-center">
//             <div className="mx-auto my-10">
//               <CircularProgress />
//             </div>
//           </div>
//         )}
//         {renderState === 3 && (
//           <div className="row flex justify-content-center">
//             <div className="mx-auto my-10">
//               <CheckCircleOutlineIcon sx={{ scale: "1.8" }} fontSize="large" color="success" />
//             </div>
//           </div>
//         )}
//         <div className="flex flex-row gap-4">
//           <div className="inline-block mt-10 bg-black rounded-3xl w-1/2 text-center p-1 shadow-md hover:bg-yellow-700 ">
//             <Link href={`/${localActive}/status`} className="text-white text-sm">
//               SUBMIT
//             </Link>
//           </div>
//           <button onClick={() => updateFaSubmit(levelindex, parent)}>Submit Form</button>

//           <div className="inline-block mt-10 border border-gray-500 rounded-3xl w-1/2 text-center p-1 shadow-md hover:bg-yellow-700 ">
//             <Link href={`/${localActive}/home`} className="text-gray-500  text-sm">
//               Cancel
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// <div key={`input-${i}`} className="m-5">
//   <label className="text-xs">{x.name}</label>
//   {x.level >= 0 ? (
//     <Select
//       className="w-full mt-1"
//       options={x.options?.map((y, j) => ({ value: y.code, label: y.name }))}
//       onChange={(selectedOption) => onFieldChange(i, selectedOption.value)}
//       value={formData.choices[i] ? { value: formData.choices[i].value, label: formData.choices[i].value } : null}
//       placeholder={`Select ${x.name}`}
//     />
//   ) : (
//     <input
//       type="text"
//       className="w-full p-2 mt-1 border rounded-md"
//       onChange={(event) => onFieldChange(i, event.target.value)}
//       value={formData.choices[i]?.value}
//     />
//   )}
// </div>

