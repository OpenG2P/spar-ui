"use client";

import {useRouter} from "next/navigation";
import {prefixBaseApiPath} from "../utils/path";
import {useEffect} from "react";

// TODO: Try to use context or state
export const authContext: {
  profile?: null | {
    sub?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    picture?: string;
    email?: string;
    gender?: string;
    birthdate?: string;
    address?: any;
    phone_number?: string;
  };
} = {profile: null};

export function AuthUtil(params: {successRedirectUrl?: string; failedRedirectUrl?: string}) {
  const {push} = useRouter();

  function checkAndRedirect() {
    if (params.successRedirectUrl && authContext.profile) return push(params.successRedirectUrl);
    else if (params.failedRedirectUrl && !authContext.profile) return push(params.failedRedirectUrl);
  }

  useEffect(() => {
    fetch(prefixBaseApiPath("/auth/profile"))
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((resJson) => {
              authContext.profile = resJson;
            })
            .catch((err) => {
              console.log("Error Getting profile json", err);
            })
            .finally(checkAndRedirect);
        } else {
          console.log("Error Getting profile, res not ok");
          checkAndRedirect();
        }
      })
      .catch((err) => {
        console.log("Error Getting profile", err);
        checkAndRedirect();
      });
    // TODO: Find better way. Disable dependency error for now
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
