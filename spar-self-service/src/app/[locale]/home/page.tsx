import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { AuthUtil } from "@/app/components/auth";
import { GetFaBox } from "@/app/components";
import { useLocale } from 'next-intl';
import { useTranslations } from "next-intl";
import Loading from "../loading";
export default function Next() {
  const localActive = useLocale();
  // const t= useTranslations('home')

  return (
    <main>
      <AuthUtil failedRedirectUrl={`/${localActive}/login`}/>
      <div className="flex flex-row">
        <div className="h-screen bg-gray-100 basis-1/2">
          <div className="m-24">
            <Image
              className="object-cover w-full h-full"
              src="http://spar.openg2p.my/spar/img/infographic_02.png"
              alt="person"
              width={600}
              height={600}
            />
          </div>
        </div>
        <div className="w-full max-w-sm flex flex-col m-12 basis-1/2">
          <div className="flex flex-col p-1 relative items-center">
            <div className="max-w-sm mx-auto mt-8">
              <div className="flex justify-center">
                <nav className=" flex overflow-x-auto items-center p-1 text-xl text-gray-600 bg-white rounded-3xl">
                  <div className="mt-8">
                      <div className="block w-full max-w-[18rem] mt-6 rounded-lg bg-white ">
                        <Suspense fallback={<Loading/>}>
                        <GetFaBox />
                        </Suspense>
                      </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


