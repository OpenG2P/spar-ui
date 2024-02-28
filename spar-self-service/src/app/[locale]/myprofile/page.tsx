

import React from 'react'
import Image from 'next/image';

import { AuthUtil, authContext } from "@/app/components/auth";
import { useLocale } from 'next-intl';
import { useTranslations } from "next-intl";
export default function ProfilePage() {
  const localActive = useLocale();
  const t = useTranslations('ProfileSet')
  return (
    <div >
      <AuthUtil failedRedirectUrl="/login" />
      <div className="flex flex-row">
        <div className=" h-screen bg-gray-200 basis-1/4">
          <div className='w-1/2 m-24 '>
            <div className="relative ">
              <div className="absolute inset-0  bg-sky-300 rounded-lg blur"></div>
              <div className="relative p-3 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <Image
                  src="http://spar.openg2p.my/spar/img/user_image_02.png"
                  alt="Woman looking front"
                  className="relative object-cover object-center w-23 h-32 "
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex-grow'>
            <div className='mt-24'>
              <div className="m-12 pl-24 ">
                <div className=" opacity-100 flex items-start ">
                  <div className="flex-1 min-w-0 mt-2 ">
                    <div className="text-sm font-medium text-gray-600  no-underdivne ">
                      Name
                    </div>
                    <p className="text-2xl text-sky-500  ">
                      John Smith
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className=" opacity-100 flex items-start ">
                    <div className=" rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0  ">
                      <Image className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/phone.png" alt="phone" width={100} height={300} />
                    </div>
                    <div className="flex-1 min-w-0 mt-2 ">
                      <div className="text-sm font-medium text-gray-600  no-underdivne ">
                        Phone Number
                      </div>
                      <p className="text-md text-black font-bold ">
                        +745 12345 67890
                      </p>
                    </div>
                  </div>
                  <div className=" opacity-100 flex items-start ">
                    <div className=" rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0  ">
                      <Image className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/email.png" alt="email" width={100} height={300} />
                    </div>
                    <div className="flex-1 min-w-0 mt-2 ">
                      <div className="text-sm font-medium text-gray-600  no-underdivne ">
                        Email
                      </div>
                      <p className="text-md text-black font-bold">
                        johnsmith@gmail.com
                      </p>
                    </div>
                  </div>
                  
                </div>
                <div className="w-full border-b-2 border-sky-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
                <div className='flex  gap-80 mt-2 '>
                  <div className=" opacity-100 flex items-start  ">
                    <div className=" rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0  ">
                      <Image className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/dob.png" alt="dob" width={100} height={300} />
                    </div>
                    <div className="flex-1 min-w-0 mt-2 ">
                      <div className="text-sm font-medium text-gray-600  no-underdivne ">
                        Date of Birth
                      </div>
                      <p className="text-md text-black font-bold ">
                        1975 January 01
                      </p>
                    </div>
                  </div>
                  <div className=" opacity-100 flex items-start ml-10 ">
                    <div className=" rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0  ">
                      <Image className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/gender.png" alt="gender" width={100} height={300} />
                    </div>
                    <div className="flex-1 min-w-0 mt-2 ">
                      <div className="text-sm font-medium text-gray-600  no-underdivne ">
                        Gender
                      </div>
                      <p className="text-md text-black font-bold">
                        Male
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full border-b-2 border-sky-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
                <div className="mt-4 opacity-100 flex items-start ">
                  <div className="flex-1 min-w-0 mt-2 ">
                    
                    <div className="flex flex-col w-1/2 border-dashed border-2  square-full border-gray-400 p-4 rounded-2xl">
                      <div className="">
                        <p className="text-sm font-medium text-gray-600">Address</p>
                        <p className="text-sm text-wrap w-1/2 text-black "> Locality -- Spencer Villa
                          Street -- 123450 Emily Radial
                          Apartment -- 152
                          Country -- New York, USA
                          Postal Code -- 321000</p>
                      </div>
                    </div>
                   
                  </div>
                </div>
                <div className="w-full border-b-2 border-sky-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

