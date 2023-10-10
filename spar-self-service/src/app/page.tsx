import {redirect} from "next/navigation";

import {getProfile} from "./_utils/client/auth";

export default async function Root() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  } else {
    redirect("/home");
  }
}
