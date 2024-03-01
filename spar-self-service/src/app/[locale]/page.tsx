import {AuthUtil} from "../components/auth";
import {useLocale} from "next-intl";

export default function Root() {
  const localActive = useLocale();
  const authUtilProps = {
    successRedirectUrl: `/${localActive}/home`,
    failedRedirectUrl: `/${localActive}/login`,
  };

  return (
    <div>
      <AuthUtil {...authUtilProps} />
    </div>
  );
}
