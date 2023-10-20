import Image from "next/image";

import {AuthUtil} from "../../components/auth";
import {prefixBasePath} from "../../utils/path";
import GetFaBox from "./get-fa-box";
import UpdateFaBox from "./update-fa-box";
import LoginAvatar from "./login-avatar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-7">
      <AuthUtil failedRedirectUrl="/login" />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center lg:static lg:w-auto">
          <Image
            src={prefixBasePath("/img/logo.svg")}
            alt="National Social Payments Account Registry"
            width={450}
            height={150}
            priority
          />
        </p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <LoginAvatar />
        </div>
      </div>

      <div className="flex flex-row place-items-center justify-center">
        <div className="p-6 mr-5 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <GetFaBox />
        </div>
        <div className="p-6 ml-5 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <UpdateFaBox />
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
