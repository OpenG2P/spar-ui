import {useLocale} from "next-intl";
import Image from "next/image";
import {Suspense} from "react";
import {GetFaBox} from "@/app/components";
import {AuthUtil} from "@/app/components/auth";
import Loading from "../loading";
import {prefixBasePath} from "@/utils/path";
export default function Next() {
  const localActive = useLocale();
  return (
    <main>
      <AuthUtil failedRedirectUrl={`/${localActive}/login`} />
      <div className="flex flex-row">
        <div className="h-screen bg-gray-100 basis-1/2">
          <div className="m-24">
            <Image
              className="object-cover w-full h-full"
              src={prefixBasePath("/img/infographic_02.png")}
              alt="person"
              width={600}
              height={600}
            />
          </div>
        </div>
        <div className="w-full max-w-sm flex flex-col m-12 basis-1/2">
          <div className="max-w-sm mx-auto m-5 mt-12">
            
            <Suspense fallback={<Loading />}>
              <GetFaBox />
            </Suspense>
                
          </div>
        </div>
      </div>
    </main>
  );
}
