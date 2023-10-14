import {AuthUtil} from "../components/auth";

export default async function Root() {
  return <AuthUtil successRedirectUrl="/home" failedRedirectUrl="/login" />;
}
