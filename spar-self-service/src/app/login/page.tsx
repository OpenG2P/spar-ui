import Image from "next/image";

import {getProfile} from "../_utils/auth";
import {redirect} from "next/navigation";
import {prefixRootPath} from "../_utils/path";
import LoginBox from "./loginbox";

export default async function Login() {
  const profile = await getProfile();

  if (profile) {
    redirect(prefixRootPath("/home"));
  }

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
      </div>

      <LoginBox />

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* Add meta links */}
      </div>
    </main>
  );
}
