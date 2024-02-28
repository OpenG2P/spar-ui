// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { AuthUtil } from "@/app/components/auth";
// import Link from "next/link";
// import { GetFaBox } from "@/app/components";
// export default function Next() {
//     const [activeTab, setActiveTab] = useState("tab1");
//     const [subTab, setSubTab] = useState("subTab1");


//     const handleTabClick = (tab: any) => {
//         setActiveTab(tab);
//         setSubTab('subTab1');
//     };

//     const handleSubTabClick = (subTab: any) => {
//         setSubTab(subTab);
//     };

//     const [selectedOption, setSelectedOption] = useState('');


//     const handleDropdownChange = (event: any) => {
//         setSelectedOption(event.target.value);
//     };


//     return (
//         <main>
//             <AuthUtil failedRedirectUrl="/login" />
//             <div className="flex flex-row">
//                 <div className="h-screen bg-gray-100 basis-1/2">
//                     <div className="m-24">
//                         <Image
//                             className="object-cover w-full h-full"
//                             src="http://spar.openg2p.my/spar/img/infographic_02.png"
//                             alt="person"
//                             width={600}
//                             height={600}
//                         />
//                     </div>
//                 </div>
//                 <div className="w-full max-w-sm flex flex-col m-12 basis-1/2">
//                     <div className="flex flex-col p-1 relative items-center">
//                         <div className="max-w-sm mx-auto mt-8">
//                             <div className="flex justify-center">
//                                 <nav className="border border-gray-300 shadow-md flex overflow-x-auto items-center p-1 text-xl text-gray-600 bg-white rounded-3xl">
//                                     <button
//                                         role="tab"
//                                         type="button"
//                                         className={`flex whitespace-nowrap items-center h-8 px-10 font-medium rounded-2xl outline-none   bg-white ${activeTab === 'tab1' ? ' text-black bg-yellow-500' : 'bg-white text-black'
//                                             }`}
//                                         aria-selected={activeTab === 'tab1'}
//                                         onClick={() => handleTabClick('tab1')}
//                                     >
//                                         View
//                                     </button>

//                                     <button
//                                         role="tab"
//                                         type="button"
//                                         className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-2xl outline-none  bg-white ${activeTab === 'tab2' ? ' text-black bg-yellow-500' : 'bg-white text-gray-500'
//                                             }`}
//                                         onClick={() => handleTabClick('tab2')}
//                                     >
//                                         Update
//                                     </button>
//                                 </nav>
//                             </div>

//                             <div className="mt-8">
//                                 {activeTab === 'tab1' && (

//                                     <div className="flex flex-col">
//                                         <div className="text-sky-500 text-2xl" >Your account information</div>
//                                         <div className="block w-full max-w-[18rem]  rounded-lg bg-white ">
//                                             <GetFaBox />
//                                         </div>

//                                         <div className="inline-block bg-black rounded-3xl w-1/2 text-center p-1 shadow-md hover:bg-yellow-700 mt-4">
//                                             <Link href="/next" className="text-white text-sm">
//                                                 GO BACK
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 )}
//                                 {activeTab === 'tab2' && (
//                                     <div>
//                                         <div className="text-sky-500 text-2xl">Update account information</div>
//                                         <div className="mt-4">
//                                             Type
//                                         </div>
//                                         <div className="flex flex-row gap-4 ">
//                                             <div
//                                                 className={`border-2 border-gray-500 rounded-xl w-20 h-20 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-sky-500 hover:shadow-lg ${subTab === 'subTab1' ? 'border-gray-500' : ''}`}
//                                                 onClick={() => handleSubTabClick('subTab1')}
//                                             >
//                                                 <Image className="w-1/2 h-1/2 square-full m-3 ml-5 mt-4" src="http://spar.openg2p.my/spar/img/bank.png" alt="bank" width={50} height={50} />
//                                             </div>
//                                             <div
//                                                 className={`border-2 border-gray-500 rounded-xl w-20 h-20 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-sky-500 hover:shadow-lg ${subTab === 'subTab2' ? 'border-gray-500' : ''}`}
//                                                 onClick={() => handleSubTabClick('subTab2')}
//                                             >
//                                                 <Image className="w-1/2 h-1/2 square-full m-3 ml-5 mt-4" src="http://spar.openg2p.my/spar/img/mobile_wallet.png" alt="mobile_wallet" width={50} height={50} />
//                                             </div>
//                                             <div
//                                                 className={`border-2 border-gray-500 rounded-xl w-20 h-20 mr-2 flex-shrink-0 focus:outline-none transition duration-300 transform hover:border-sky-500 hover:shadow-lg ${subTab === 'subTab3' ? 'border-gray-500' : ''}`}
//                                                 onClick={() => handleSubTabClick('subTab3')}
//                                             >
//                                                 <Image className="w-1/2 h-1/2 square-full m-3 ml-5 mt-4" src="http://spar.openg2p.my/spar/img/mpesa.png" alt="mpesa" width={50} height={50} />
//                                             </div>
//                                         </div>
//                                         <div className="mt-8">
//                                             {subTab === 'subTab1' && (
//                                                 <div className="flex flex-col">
//                                                     <div>
//                                                         <div className=" rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300">Bank</div>
                                                        // <select
                                                        //     className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white w-full"
                                                        //     value={selectedOption}
                                                        //     onChange={handleDropdownChange}
                                                        // >
                                                        //     <option value="" disabled>Select Branch</option>
                                                        //     <option value="option1">Option 1</option>
                                                        // </select>
//                                                     </div>
//                                                     <div>
//                                                         <div className=" rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300">Branch</div>
//                                                         <select
//                                                             className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white w-full"
//                                                             value={selectedOption}
//                                                             onChange={handleDropdownChange}
//                                                         >
//                                                             <option value="" disabled>Select Branch</option>
//                                                             <option value="option1">Option 1</option>
//                                                         </select>
//                                                     </div>
//                                                     <div>
//                                                         <div className="rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300">Account Number</div>
//                                                         <select
//                                                             className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white w-max w-full"
//                                                             value={selectedOption}
//                                                             onChange={handleDropdownChange}
//                                                         >
//                                                             <option value="" disabled>Select Account Number</option>
//                                                             <option value="option1">Option 1</option>
//                                                         </select>
//                                                     </div>

//                                                     <div className="inline-block bg-black rounded-3xl w-1/2 text-center p-1 shadow-md hover:bg-yellow-700 mt-4">
//                                                         <Link href="/next" className="text-white text-sm">
//                                                             SUBMIT
//                                                         </Link>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {subTab === 'subTab2' && (
//                                                 <div className="flex flex-col">
//                                                     <div>
//                                                         <div className=" rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300">Wallet Provider</div>
//                                                         <select
//                                                             className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white w-full"
//                                                             value={selectedOption}
//                                                             onChange={handleDropdownChange}
//                                                         >
//                                                             <option value="" disabled>Select Wallet Provider</option>
//                                                             <option value="option1">Option 1</option>
//                                                         </select>
//                                                     </div>
//                                                     <div>
//                                                         <div className="rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300">Phone Number</div>
//                                                         <select
//                                                             className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white w-max w-full"
//                                                             value={selectedOption}
//                                                             onChange={handleDropdownChange}
//                                                         >
//                                                             <option value="" disabled>Select Phone Number</option>
//                                                             <option value="option1">Option 1</option>
//                                                         </select>
//                                                     </div>

//                                                     <div className="inline-block bg-black rounded-3xl w-1/2 text-center p-1 shadow-md hover:bg-yellow-700 mt-4">
//                                                         <Link href="/next" className="text-white text-sm">
//                                                             SUBMIT
//                                                         </Link>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {subTab === 'subTab3' && (
//                                                 <div className="flex flex-col">
//                                                     <div>
//                                                         {/* <div className="rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300">Email</div>
//                             <select
//                               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white w-max w-full"
//                               value={selectedOption}
//                               onChange={handleDropdownChange}
//                             >
//                               <option value="" disabled>Select Email</option>
//                               <option value="option1">Option 1</option>
//                             </select> */}

//                                                     </div>

//                                                     <div className="inline-block bg-black rounded-3xl w-1/2 text-center p-1 shadow-md hover:bg-yellow-700 mt-4">
//                                                         <Link href="/next" className="text-white text-sm">
//                                                             SUBMIT
//                                                         </Link>
//                                                     </div>
//                                                 </div>
//                                             )}

//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }


