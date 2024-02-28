'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function LocalSwitcher() {



  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale() as "en" | "fr" | "tl";
  const currentPath = usePathname();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value as "en" | "fr" | "tl";
    startTransition(() => {
      
      const newPath = `/${nextLocale}${currentPath.substring(3)}`;
      router.replace(newPath);
    });
  };


  const getFlagImage = (locale: "en" | "fr" |"tl") => {
    const flagImages = {
      en: "http://spar.openg2p.my/spar/img/flag_en.png",
      fr: "http://spar.openg2p.my/spar/img/flag_fr.png",
      tl: "http://spar.openg2p.my/spar/img/flag_tl.png"
    };

    return flagImages[locale];
  };

  const languageOptions: { value: "en" | "fr" | "tl"; label: string }[] = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "tl", label: "Filipino" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex justify-between items-center w-full gap-x-2 px-2 py-2 text-sm text-black hover:bg-gray-50">
          <img src={getFlagImage(localActive)} alt={localActive} className="w-4 h-4 mr-2" />

          <span>{localActive === "en" ? "English" : localActive === "fr" ? "French" : "Filipino"}</span>
          <Image
            className="object-cover w-full h-full"
            src="http://spar.openg2p.my/spar/img/down_arrow.png"
            alt="person"
            width={600}
            height={600}
          />
          <select
            value={localActive}
            className="hidden"
            onChange={onSelectChange}
            disabled={isPending}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
        <Menu.Items className="absolute flex-col right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 ring-gray-400  focus:outline-none">
          <div className="py-1 flex-col items-center">
            {languageOptions.map((option) => (
              <Menu.Item key={option.value}>
                {({active}) => (
                  <button
                    onClick={() =>
                      onSelectChange({target: {value: option.value}} as ChangeEvent<HTMLSelectElement>)
                    }
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "px-4 py-2 text-sm flex items-center gap-2"
                    )}
                  >
                    <img src={getFlagImage(option.value)} alt={option.value} />
                    <span>{option.label}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}


      
      
