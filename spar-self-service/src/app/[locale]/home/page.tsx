import {useLocale} from "next-intl";
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
      <div className="flex flex-row ">
        <div className="bg-gray-100 basis-1/2">
          <div className="pl-24 ml-6 mt-12">
            <img src={prefixBasePath("/img/infographic_02.png")} alt="person" />
          </div>
        </div>
        <div className="w-full max-w-sm flex flex-col m-20 basis-1/2">
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
