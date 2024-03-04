"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import {prefixBaseApiPath, prefixBasePath} from "@/utils/path";
import {useTranslations} from "next-intl";
type LoginProvider = {
  id: number;
  name: string;
  type: string;
  displayName: string;
  displayIconUrl: string;
};

export default function LoginBox() {
  const [loginProviders, setLoginProviders] = useState<LoginProvider[]>([]);
  const t = useTranslations("login");

  function getLoginProviders() {
    fetch(prefixBaseApiPath(`/auth/getLoginProviders`)).then((res) => {
      res.json().then((resJson: {loginProviders: LoginProvider[]}) => {
        setLoginProviders(resJson.loginProviders);
      });
    });
  }

  useEffect(getLoginProviders, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center p-8 m-8">
        <div className="text-orange-500 text-3xl p-2">{t("title")}</div>
        <div className="">
          <div>{t("description_1")}</div>
          <div>{t("description_2")}</div>
        </div>
        {loginProviders &&
          loginProviders.length !== 0 &&
          loginProviders.map((x) => (
            <div
              key={`provider-${x.id}`}
              className="inline-block bg-black rounded-3xl shadow shadow-orange-300 text-center px-3 py-2 hover:bg-customYellow mt-2"
            >
              <a
                href={prefixBaseApiPath(`/auth/getLoginProviderRedirect/${x.id}`)}
                className="text-white font-bold text-xl p-4"
              >
                {t("button_text")}
              </a>
            </div>
          ))}
      </div>
      <Image
        src={prefixBasePath("/img/globe_bg.png")}
        className="mb-0"
        priority={true}
        alt="Logo"
        width={900}
        height={900}
      />
    </div>
  );
}
