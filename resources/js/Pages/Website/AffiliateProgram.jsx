import ButtonPink from "@/Components/ButtonPink";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function AffiliateProgram(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Affiliate Program" />
                <section className="min-h-screen max-w-7xl mx-auto px-4 lg:px-8 my-20">
                    <div>
                        <h1 className="text-center text-4xl font-bold mt-5 mb-10">Become our partner and get a reward!</h1>
                        <p className="py-3 text-lg">
                            Register an affiliate account and earn money on building ties between merchants and NOWPayments.
                        </p>
                        <p className="py-3 text-lg">
                            If you bring someone who becomes our partner — you will get a percentage of their profit.
                        </p>
                        <p className="py-3 text-lg">
                            You'll be getting this reward for 5 years. The more merchants you bring — the bigger reward you get. Check the details below:
                        </p>
                    </div>
                    <div className="my-20">

                        {/* affiliate program table */}
                        <div className="overflow-x-auto shadow-sm shadow-pink-200 rounded-md">
                            <table className="w-full  text-center whitespace-nowrap my-5">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-6 text-xl font-bold">Affiliate level</th>
                                        <th className="px-3 py-6 text-xl font-bold">Total merchant turnover</th>
                                        <th className="px-3 py-6 text-xl font-bold">Reward</th>
                                    </tr>
                                </thead>
                                <tbody className="mt-56">
                                    <tr className="border-b border-gray-200">
                                        <td className="px-3 py-4">1</td>
                                        <td className="px-3 py-4 ">0.1 — 5 BTC/month </td>
                                        <td className="px-3 py-4 ">0.1% per transaction </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-3 py-4">2</td>
                                        <td className="px-3 py-4 ">5 — 10 BTC/month</td>
                                        <td className="px-3 py-4 ">0.15% per transaction</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-3 py-4">3</td>
                                        <td className="px-3 py-4 ">10 — 25 BTC/month</td>
                                        <td className="px-3 py-4 ">0.2% per transaction</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-3 py-4">4</td>
                                        <td className="px-3 py-4 ">25 — 50 BTC/month</td>
                                        <td className="px-3 py-4 ">0.25% per transaction</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-4">5</td>
                                        <td className="px-3 py-4 ">50+ BTC/month</td>
                                        <td className="px-3 py-4 ">Exclusive individual offer</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* affiliate program table end */}

                        <div className="flex justify-center">
                            <Link href={route('register')}>
                                <ButtonPink className="px-9 py-3 mt-10">Apply now</ButtonPink>
                            </Link>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </div>
    );
}
