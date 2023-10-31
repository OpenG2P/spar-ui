"use client";

import {Avatar, Button, TextField} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import {prefixBaseApiPath} from "../../utils/path";

type LoginProvider = {
  id: number;
  name: string;
  type: string;
  displayName: string;
  displayIconUrl: string;
};

export default function LoginBox() {
  function handleLoginSubmit(e: SyntheticEvent) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  const [loginProviders, setLoginProviders] = useState<LoginProvider[]>([]);

  function getLoginProviders() {
    fetch(prefixBaseApiPath(`/auth/getLoginProviders`)).then((res) => {
      res.json().then((resJson: {loginProviders: LoginProvider[]}) => {
        setLoginProviders(resJson.loginProviders);
      });
    });
  }

  useEffect(getLoginProviders, []);

  return (
    <div className="relative flex place-items-center w-full justify-center">
      <div className="border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <form onSubmit={handleLoginSubmit}>
          <div className="m-5">
            <TextField label="Email or Phone" name="login" fullWidth required />
          </div>
          <div className="m-5">
            <TextField label="Enter password" type="password" name="password" fullWidth required />
          </div>
          <div className="m-5">
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </div>
        </form>
        <div className="p-2 text-center">OR</div>
        <div className="border-0">
          {loginProviders &&
            loginProviders.length != 0 &&
            loginProviders.map((x) => (
              <div key={`provider-${x.id}`} className="m-2 text-center p-1">
                <a href={prefixBaseApiPath(`/auth/getLoginProviderRedirect/${x.id}`)}>
                  <Button
                    startIcon={<Avatar variant="square" src={x.displayIconUrl} />}
                    variant="outlined"
                    fullWidth
                  >
                    {x.displayName}
                  </Button>
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
