"use client";

import {Button} from "@mui/material";
import {SyntheticEvent} from "react";

export default function LoginBox() {
  function handleLoginSubmit(e: SyntheticEvent) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  return (
    <div className="relative flex place-items-center w-full justify-center">
      <div className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <form onSubmit={handleLoginSubmit}>
          <div className="p-1">
            <label className="font-bold p-2">Email or Phone</label>
            <input className="p-1" type="text" placeholder="Enter email or phone" name="login" required />
          </div>
          <div className="p-1">
            <label className="font-bold p-2">Password</label>
            <input className="p-1" type="password" placeholder="Enter password" name="password" required />
          </div>
          <div className="mb-1 p-2">
            <Button variant="outlined">Login</Button>
          </div>
        </form>
      </div>
      <div className="p-2 text-center">OR</div>
      <div className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="border-0">
          <div className="m-2 text-center p-1">
            <a className="" href="https://esignet.collab.mosip.net/authorize">
              <Button variant="outlined">Sign In with MOSIP Collab</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
