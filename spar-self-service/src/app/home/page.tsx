import Image from "next/image";

import {getProfile} from "../_utils/auth";
import {redirect} from "next/navigation";
import {prefixRootPath} from "../_utils/path";

export default async function Home() {
  const profile = await getProfile();

  // if (!profile) {
  //   redirect(prefixRootPath("/login"));
  // }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-7">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center lg:static lg:w-auto">
          <Image
            src={prefixRootPath("/img/logo.svg")}
            alt="National Social Payments Account Registry"
            width={280}
            height={24}
            priority
          />
        </p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href={prefixRootPath("/profile")}
          >
            {"Username "}
            <Image src={prefixRootPath("/img/person.png")} alt="Profile" width={50} height={24} priority />
          </a>
        </div>
      </div>

      <div className="flex flex-row place-items-center justify-center">
        <div className="w-30 h-95 p-6 mr-5 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p>Currently Linked Account Number.</p>
          {/* Add Get Fa Box */}
        </div>
        <div className="w-30 h-95 p-6 ml-5 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p>Update your Linked Account Number.</p>
          {/* Add Update FA Box */}
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
