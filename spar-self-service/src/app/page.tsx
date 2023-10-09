import {redirect} from "next/navigation";

import {getProfile} from "./_utils/auth";
import {prefixRootPath} from "./_utils/path";

export default async function Root() {
  const profile = await getProfile();

  if (!profile) {
    redirect(prefixRootPath("/login"));
  } else {
    redirect(prefixRootPath("/home"));
  }
}
