"use client";

import {Button, CircularProgress, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {getFa} from "@/utils/getFa";
import {KeyValue} from "@/types/dfsp-levels";
import { useAuth } from "../store/auth-context";
import Link from "next/link";
import { useLocale } from 'next-intl';
import Image from "next/image";
import { useTranslations } from "next-intl";


export default function GetFaBox() {
  const { getFaRaw } = useAuth(); 
  const localActive = useLocale();
  const [getFaResult, setGetFaResult] = useState<string | KeyValue[]>("");
  // 0 - default/empty. 1 - loading. 2 - output. 3 - error.
  const [renderState, setRenderState] = useState(0);
  const t = useTranslations('home')

  useEffect(() => {
    // Call getFa when the component mounts
    onClick();
  }, []); 


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
            setRenderState(2);
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
      // !authContext.getFaRaw
      !getFaRaw
    );
  }


  return(
  <>
    <div className="container">

        {renderState === 1 && (
        <div className="row flex justify-content-center">
          <div className="mx-auto my-10">
            <CircularProgress />
          </div>
        </div>
      )}
        {renderState === 2 && (!getFaResult || !Array.isArray(getFaResult) || getFaResult.length === 0) && (
          <div className="row flex justify-content-center">
            <div className="flex flex-col">
              <div className="text-orange-500 text-2xl">{t('title')}</div>
              <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
              <p className="text-gray-800 mt-4 text-md">
                {t('description')}
              </p>
              <div className="bg-black rounded-3xl w-full h-12 shadow-md hover:bg-yellow-700 mt-6 flex items-center justify-center">
                <Link href={`/${localActive}/update`} className="text-white text-sm">
                  {t('button_text')}
                </Link>
              </div>
            </div>
          </div>
        )}


        {renderState === 2 && getFaResult && Array.isArray(getFaResult) && getFaResult.length > 0 &&(
          <ul className="w-full">
            <div className="flex flex-col">
              <div className="text-orange-500 text-2xl" >{t('title')}</div>
              <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
            </div>
            {getFaResult.slice().reverse().map((x, i) => (
              <li key={`item-${i}`} className="border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4">
                <div className="flex flex-row">
                  {x.key === 'type' ? (
                    <span>
                      <Image className="w-10 h-10 inline-block mt-2 bg-orange-200 rounded-lg" src={`http://spar.openg2p.my/spar/img/${x.value}.png`} alt={x.value} width={50} height={50} />
                    </span>
                  ) : (
                    
                    <div className="pl-10"></div>
                  )}
                  <div className="flex-1 min-w-0 mt-1 pl-4">
                    <div className="text-sm font-medium text-gray-600 no-underline">
                      {x.key}
                    </div>
                    <p className="text-md text-black font-semibold mx-auto">
                      {x.value}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            <div className="inline-block bg-black rounded-3xl  p-2 w-1/2 text-center shadow-md hover:bg-yellow-700 mt-6">
              <Link href={`/${localActive}/update`} className="text-white text-sm">
                {t('button_text2')}
              </Link>
            </div>
          </ul>
        )}
      </div>
    </>
  );
}