import {AuthUtil} from "../../components/auth";
import LoginBox from "./loginbox";

export default async function Login() {
  return (
    <main className="overflow:hidden">
      <AuthUtil successRedirectUrl="/home" />
      <LoginBox />
    </main>
  );
}
