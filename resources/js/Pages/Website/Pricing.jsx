import ButtonPink from "@/Components/ButtonPink";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function Pricing(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Pricing" />
                <section>
                    <div className="text-center max-w-4xl mx-auto px-4 lg:px-8 mt-10">
                        <h2 className="text-4xl font-bold mt-5">Pricing</h2>
                        <h5 className="text-xl font-bold mt-5">Higher Volume – Smaller Fee</h5>
                        <p className="mt-5">If your monthly asset flow increased up to certain amounts measured in BTC, NOWPayments will be happy to reward you with even smaller fees! If you manage to reach the target volume by the end of the month you will receive a rebate with the fee difference. Check them out:</p>
                    </div>

                    {/* priceing table */}
                    <div className="max-w-6xl mx-auto px-4 lg:px-8 my-20">
                        <div className="overflow-x-auto shadow-sm shadow-pink-200 rounded-md">
                            <table className="w-full  text-center whitespace-nowrap my-5">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-xl font-bold">Volume</th>
                                        <th className="p-3 text-xl font-bold">Transaction fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-400">
                                        <td className="p-3">0-49 BTC/month</td>
                                        <td className="p-3 ">0.5% </td>
                                    </tr>
                                    <tr className="border-b border-gray-400">
                                        <td className="p-3">50 BTC/month</td>
                                        <td className="p-3 ">0.45% </td>
                                    </tr>
                                    <tr className="border-b border-gray-400">
                                        <td className="p-3">100 BTC/month</td>
                                        <td className="p-3 ">0.4% </td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">200 BTC/month</td>
                                        <td className="p-3 ">Special offer, contact us for details</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center">
                            <Link href={route('login')}>
                                <ButtonPink className="px-9 py-3 mt-10">Start now</ButtonPink>
                            </Link>
                        </div>
                    </div>
                    {/* priceing table end*/}
                    {/* questions */}
                    <div className="text-center bg-[#eceff1] py-20">
                        <h2 className="text-4xl font-bold">
                            What fees do we have?
                        </h2>
                        <p className="text-lg mt-5">
                            Low fees – high transparency!
                        </p>
                        <div className="mx-5">
                            <div className="bg-white max-w-6xl mx-auto px-4 lg:px-8 py-10 mt-10 rounded-sm shadow-md shadow-pink-200">
                                <h4 className="text-xl font-bold text-blue-500 mb-5">
                                    Transaction fee
                                </h4>
                                <p>
                                    If you as a merchant accept payments in the same cryptocurrency that your client wants to pay in (say, you both go for ETH), your transaction fees start from only 0,4%. We always aspire to keep them as low as possible! The fee is charged from the final payment amount before it is sent out to the merchant.
                                </p>
                            </div>
                        </div>
                        <div className="mx-5">
                            <div className="bg-white max-w-6xl mx-auto px-4 lg:px-8 py-10 mt-10 rounded-sm shadow-md shadow-pink-200">
                                <h4 className="text-xl font-bold text-blue-500 mb-5">
                                    Fixed Rate Exchange option
                                </h4>
                                <p>
                                    Crypto is volatile – its price might go up or down very fast. If the price changes at the moment of an exchange, you might get more money in the end – or less. To protect yourself from sudden crypto price changes and potential financial losses, you can try out the fixed rate exchange option. It freezes the rate for the entire exchange. If you choose the fixed rate option, the overall transaction fee rounds up to just 1%, regardless of your transaction volume. Contact us if you’d like to try it out!
                                </p>
                            </div>
                        </div>
                        <div className="mx-5">
                            <div className="bg-white max-w-6xl mx-auto px-4 lg:px-8 py-10 mt-10 rounded-sm shadow-md shadow-pink-200">
                                <h4 className="text-xl font-bold text-blue-500 mb-5">
                                    Fiat Conversion
                                </h4>
                                <p>
                                    Crypto-to-fiat and fiat-to-crypto options are available, check the fiat exchange pricing system <a className="text-blue-500" href="">here</a>.
                                </p>
                            </div>
                        </div>
                        <div>
                            <Link href={route('login')}>
                                <ButtonPink className="px-9 py-3 mt-10">Start now</ButtonPink>
                            </Link>
                        </div>
                    </div>
                    {/* questions end */}

                    <div className="text-center max-w-4xl mx-auto px-4 lg:px-8 py-10">
                        <h2 className="text-4xl font-bold">Pricing Archive</h2>
                        <p className="mt-5">This is the archive that will easily guide you through our pricing policies. Here you can find some links to the documents that describe our previous rates!</p>
                    </div>
                    {/* Pricing Archive table */}
                    <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-16">
                        <div className="overflow-x-auto shadow-sm shadow-pink-200 rounded-md">
                            <table className="w-full  text-center whitespace-nowrap my-5">
                                <thead>
                                    <tr className="border-b border-gray-300">
                                        <th className="p-3 text-xl font-bold">Version</th>
                                        <th className="p-3 text-xl font-bold">Publish Date</th>
                                        <th className="p-3 text-xl font-bold">Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-3">1.2.2 </td>
                                        <td className="p-3 ">16.11.2020 </td>
                                        <td className="p-3 text-blue-700 hover:text-blue-500"><a href="https://nowpayments.io/doc/user_agreement-v1_2_3.pdf">https://nowpayments.io/doc/user_agreement-v1_2_3.pdf</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Pricing Archive table end */}
                </section>
            </MainLayout>
        </div>
    );

}
