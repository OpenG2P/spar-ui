"use client"

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { prefixBaseApiPath } from "@/utils/path";
import { authContext } from "../auth";
import { useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { useTranslations } from "next-intl";
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileDropDown(): JSX.Element {
  const localActive = useLocale();
  const t = useTranslations('ProfileSet')
  
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const logoutHandler = () => {
    fetch(prefixBaseApiPath("/auth/logout"), {
      method: "POST",
    }).finally(() => {
      authContext.profile = null;
      router.replace("/login");
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        
        <Menu.Button className="flex justify-between items-center w-full gap-x-2 px-2 py-2 text-sm  text-black hover:bg-gray-50">
         
          <Image
            src="http://spar.openg2p.my/spar/img/user_image.png"
            alt="user"
            className="w-full"
            width={400}
            height={400}
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <Link
                  href={`/${localActive}/myprofile`}
                  onClick={handleClick}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-2 py-2 text-sm flex items-center gap-2"
                  )}
                >
                  <img src="http://spar.openg2p.my/spar/img/person.png" className='w-1/6 h-1/6 ' alt="person" />
                  <span>{t('profile')}</span>
                  
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  type="submit"
                  onClick={logoutHandler}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  <img src="http://spar.openg2p.my/spar/img/logout.png" alt="logout" />
                  <span>{t('log_out')}</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}




