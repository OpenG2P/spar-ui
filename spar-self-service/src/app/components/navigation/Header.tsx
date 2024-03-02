"use client";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {prefixBasePath} from "@/utils/path";
import {useAuth} from "@/app/store/auth-context";
import ProfileDropDown from "./ProfileDropdown";
import LocalSwitcher from "./local-switcher";

export default function Header() {
  const t = useTranslations("Navigation");
  const {profile} = useAuth();

  return (
    <>
      <header>
        <nav className="shadow-md opacity-100 bg-white border-gray-200 h-300 p-2">
          <div className="flex flex-wrap justify-between items-center">
            <Link href="/" className="ml-3 flex items-center">
              <Image
                src={prefixBasePath("/img/spar_logo.png")}
                priority={true}
                alt="Logo"
                width={130}
                height={150}
              />
            </Link>

            <div className="flex items-center gap-12 text-sm text-black h-2">
              <Link href="/">{t("support")}</Link>
              <Link href="/">{t("contact")}</Link>
              <LocalSwitcher />

              {profile && (
                <div className="flex flex-row">
                  <div className="mt-5">Hello, {profile.name}</div>
                  <ProfileDropDown />
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
