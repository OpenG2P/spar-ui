'use client';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { AuthUtil } from "@/app/components/auth";
import { useLocale } from 'next-intl';
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSubmission } from '@/app/store/auth-context';


export default function Next() {
    const localActive = useLocale();
    const t = useTranslations('Status')
    const router = useRouter();
    const { isDataSubmitted } = useSubmission();
    useEffect(() => {
        if (!isDataSubmitted) {
            router.push('/en/home');
        } 
    }, [])

    return (
        <main>
            <AuthUtil failedRedirectUrl={`/${localActive}/login`} />
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
                                        <div className="flex flex-col border-dashed border-2  square-full border-gray-400 p-4 rounded-2xl">
                                           <div className="m-4 p-6">
                                                <Image
                                                    className="object-cover "
                                                    src="http://spar.openg2p.my/spar/img/green_tick.png"
                                                    alt="person"
                                                    width={60}
                                                    height={60}
                                                />
                                                <p className="text-2xl text-green-600 mt-2">{t('thankyou')}</p>
                                                <p className="text-gray-800">{t('status_message')}</p>
                                                <Link href={`/${localActive}/home`} className="text-white text-sm">
                                                    <Image
                                                        className="ml-48 mt-4"
                                                        src="http://spar.openg2p.my/spar/img/arrow_02.png"
                                                        alt="person"
                                                        width={50}
                                                        height={50}
                                                    />
                                               </Link>
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


