"use client";
import { useState } from "react";
import Image from "next/image";
import { AuthUtil } from "@/app/components/auth";
import {  UpdateFaBox } from "@/app/components";
import { useLocale } from 'next-intl';
import { useTranslations } from "next-intl";

export default function Next() {
    const localActive = useLocale();
    const t = useTranslations('Update')
    
    return (
        <main>
            <AuthUtil failedRedirectUrl={`/${localActive}/login`} />
            <div className="flex flex-row ">
                <div className="h-screen bg-gray-100 basis-1/2">
                    <div className="m-24">
                        <Image
                            className="object-cover w-full h-full"
                            src="http://spar.openg2p.my/spar/img/infographic_01.png"
                            alt="person"
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
                <div className="w-full max-w-sm flex flex-col m-12 pl-6 basis-1/2">
                    <div className="flex flex-col p-1 relative items-center">
                        <div className="max-w-sm mx-auto mt-2">
                            <div className="flex justify-center">
                                <nav className=" flex overflow-x-auto items-center p-1 text-xl text-gray-600 bg-white rounded-3xl">
                                    <div className="mt-3">
                                        <div className="flex flex-col">
                                            <div className="text-orange-500 text-2xl" >{t('update')}</div>
                                            <div className="w-full border-b-2 border-orange-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
                                            <div className="w-full max-w-auto  rounded-lg bg-white ">
                                                <div className="mt-2">
                                                    <UpdateFaBox />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}






