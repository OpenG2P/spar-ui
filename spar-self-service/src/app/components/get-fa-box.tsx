"use client";

import {CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {getFa} from "@/utils/getFa";
import {KeyValue} from "@/types/dfsp-levels";
import Link from "next/link";
import {useLocale} from "next-intl";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {prefixBasePath} from "@/utils/path";

export default function GetFaBox() {
  const localActive = useLocale();
  const [getFaResult, setGetFaResult] = useState<KeyValue[]>([]);
  // 0 - default/empty. 1 - loading. 2 - output. 3 - error.
  const [renderState, setRenderState] = useState(0);
  const t = useTranslations("home");

  function onClick() {
    setRenderState(1);
    getFa(
      (res) => {
        if (res.status === "succ") {
          if (res.fa) {
            setGetFaResult(res.fa);
            setRenderState(2);
          } else {
            setRenderState(2);
            console.log("Received success without FA on get FA", res);
          }
        } else {
          console.log("Received failure on get FA", res);
        }
      },
      (res, err) => {
        console.log("Received Error checking for get FA status", res, err);
      }
    );
  }

  useEffect(() => {
    onClick();
  }, []);

  return (
    <>
      <div className="container overflow-clip">
        {renderState === 1 && (
          <div className="row flex justify-content-center">
            <div className="mx-auto my-10">
              <CircularProgress />
            </div>
          </div>
        )}
        {renderState === 2 && (!getFaResult || getFaResult.length === 0) && (
          <div className="flex justify-content-center m-16 ">
            <div className="flex flex-col  ">
              <div className="text-orange-500 text-3xl">{t("title_2")}</div>
              <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
              <p className="text-gray-800 mt-4 text-lg">{t("description")}</p>
              <div className="bg-black rounded-3xl shadow-md shadow-orange-300 w-full h-12 hover:bg-yellow-700 mt-6 flex items-center justify-center">
                <Link href={`/${localActive}/update`} className="text-white text-sm">
                  {t("button_text")}
                </Link>
              </div>
            </div>
          </div>
        )}

        {renderState === 2 && getFaResult && getFaResult.length > 0 && (
          <ul className="w-full">
            <div className="flex flex-col">
              <div className="text-orange-500 text-2xl">{t("title")}</div>
              <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4 mb-4"></div>
            </div>
            {getFaResult.slice().map((x, i) => (
              <li
                key={`item-${i}`}
                className="border-b-2  border-orange-200 border-opacity-100 p-2 flex items-start space-x-4"
              >
                <div className="flex flex-row">
                  {x.key === "Type" ? (
                    <span>
                      <Image
                        className="w-10 h-10 inline-block mt-2 bg-orange-200 rounded-lg"
                        src={prefixBasePath(`/img/${x.value}.png`)}
                        alt={x.value}
                        width={50}
                        height={50}
                      />
                    </span>
                  ) : (
                    <div className="pl-10"></div>
                  )}
                  <div className="flex-1 min-w-0 mt-1 pl-4">
                    <div className="text-sm font-medium text-gray-600 no-underline">{x.key}</div>
                    <p className="text-md text-black font-semibold mx-auto">{x.value}</p>
                  </div>
                </div>
              </li>
            ))}
            <div className="inline-block shadow-md shadow-orange-300 bg-black rounded-3xl  p-2 w-1/2 text-center  hover:bg-yellow-700 mt-6">
              <Link href={`/${localActive}/update`} className="text-white text-sm">
                {t("button_text2")}
              </Link>
            </div>
          </ul>
        )}
      </div>
    </>
  );
}
