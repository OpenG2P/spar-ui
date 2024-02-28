"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AuthUtil } from "@/app/components/auth";
import Link from "next/link";
import { GetFaBox, UpdateFaBox } from "@/app/components";
import { useLocale } from 'next-intl';
type UpdateFaBoxProps = {
    levelindex: number;
    parent: number;
};
export default function Next() {
    const localActive = useLocale();
    const [subTab, setSubTab] = useState("subTab1");
    const [levelindex, setLevelindex] = useState(1);
    const [parent, setParent] = useState(2);

    const handleTabClick = (tab: any) => {
        setSubTab(tab);

        switch (tab) {
            case 'subTab1':
                setLevelindex(1);
                setParent(2);
                break;
            case 'subTab2':
                // Set different values for subTab2
                setLevelindex(2);
                setParent(3);
                break;
            case 'subTab3':
                // Set different values for subTab3
                setLevelindex(1);
                setParent(3);
                break;
            default:
                break;
        }
    }

    const subTabsConfig = [
        { subTab: 'subTab1', levelindex: 1, parent: 2 },
        { subTab: 'subTab2', levelindex: 2, parent: 3 },
        { subTab: 'subTab3', levelindex: 1, parent: 3 },
    ];
    return (
        <main>
            <AuthUtil failedRedirectUrl="/login" />
            <div className="flex flex-row">
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
                <div className="w-full max-w-sm flex flex-col m-12 basis-1/2">
                    <div className="flex flex-col p-1 relative items-center">
                        <div className="max-w-sm mx-auto mt-8">
                            <div className="flex justify-center">
                                <nav className=" flex overflow-x-auto items-center p-1 text-xl text-gray-600 bg-white rounded-3xl">
                                    <div className="mt-8">
                                        <div className="flex flex-col">
                                            <div className="text-sky-500 text-2xl" >Update your account information</div>
                                            <div className="w-full border-b-2 border-sky-200 border-opacity-100 p-2 flex items-start space-x-4"></div>
                                            {/* <div>
                                                <div className="mt-4">
                                                    Type
                                                </div>
                                                <div className="flex flex-row gap-5  ">
                                                    <div
                                                        className={`border-2 border-gray-500 rounded-md w-24 h-24 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-sky-500 hover:shadow-lg ${subTab === 'subTab1' ? 'border-sky-500' : ''}`}
                                                        onClick={() => handleTabClick('subTab1')}
                                                    >
                                                        <div className="flex flex-col m-6 mt-4">
                                                            <Image className="w-10 h-10 square-full  " src="http://spar.openg2p.my/spar/img/bank.png" alt="bank" width={50} height={50} />
                                                            <p className="text-center text-gray-600 text-xs  ">Bank</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`border-2 border-gray-500 rounded-md w-24 h-24 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-sky-500 hover:shadow-lg ${subTab === 'subTab2' ? 'border-sky-500 ' : ''}`}
                                                        onClick={() => handleTabClick('subTab2')}
                                                    >
                                                        <div className="flex flex-col m-6 mt-4">
                                                            <Image className="w-10 h-10 square-full " src="http://spar.openg2p.my/spar/img/mobile_wallet.png" alt="bank" width={50} height={50} />
                                                            <p className="text-nowrap text-gray-600 text-xs  ">Mobile Wallet</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`border-2 border-gray-500 rounded-md w-24 h-24 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-sky-500 hover:shadow-lg ${subTab === 'subTab3' ? 'border-sky-500' : ''}`}
                                                        onClick={() => handleTabClick('subTab3')}
                                                    >
                                                        <div className="flex flex-col m-6 mt-4">
                                                            <Image className="w-10 h-10 square-full  " src="http://spar.openg2p.my/spar/img/mpesa.png" alt="bank" width={50} height={50} />
                                                            <p className="text-center text-gray-600 text-xs  ">Mpesa</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="w-full max-w-auto  rounded-lg bg-white ">
                                                <div className="mt-8">
                                                    {subTabsConfig.map((config) => (
                                                        <div key={config.subTab}>
                                                            {subTab === config.subTab && (
                                                                <UpdateFaBox  />
                                                            )}
                                                        </div>
                                                    ))}
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






