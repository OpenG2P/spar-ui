"use client";
import {useRouter} from "next/navigation";
import {prefixBaseApiPath} from "@/utils/path";
import {useEffect} from "react";

import {useAuth} from "../store/auth-context";

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
  const {setProfile} = useAuth();
  const {push, replace} = useRouter();

  function checkAndRedirect() {
    if (params.successRedirectUrl && authContext.profile) {
      return push(params.successRedirectUrl);
    } else if (params.failedRedirectUrl && !authContext.profile) {
      return replace(params.failedRedirectUrl);
    }
  }

  useEffect(() => {
    fetch(prefixBaseApiPath("/auth/profile"))
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((resJson) => {
              authContext.profile = resJson;
              setProfile(resJson);
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
  }, []);

  return <></>;
}
