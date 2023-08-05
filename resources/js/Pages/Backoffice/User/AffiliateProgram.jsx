import { Head, Link } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import ButtonPink from '@/Components/ButtonPink';

export default function AffiliateProgram(props) {
    return (
        <>
            <Head title="Affiliate Program" />
            <DashboardLayout auth={props.auth}>
                <div className='mx-4 my-10 lg:m-10'>
                    <h2 className='text-3xl font-bold mb-7'>Affiliate Program
                        <Link
                            href={route('fiat.withdrawals')}
                            active={route().current('fiat.withdrawals')}
                        >
                            <ButtonPink className='md:ml-7 px-16 py-2.5 font-bold text-xs rounded-none hover:shadow-none'>Request Payout</ButtonPink>
                        </Link>

                        <div className="inline lg:tooltip lg:tooltip-right ml-4" data-tip="Convert your crypto profit into EUR and receive straight to your bank account">
                            <i className="fa-solid fa-circle-info text-lg text-blue-400 font-extrabold"></i>
                        </div>
                    </h2>

                    {/* statistics  */}
                    <h4 className='text-2xl font-bold'>Statistics</h4>
                    <div className='flex flex-col md:flex-row gap-12 text-gray-500 font-bold'>
                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 shadow-lg w-full p-5 text-center">
                            <h5 className='text-xs'>Total Number of Referrals</h5>
                            <h3 className='text-xl text-blue-400 m-7'>{props.auth.user.affilate.length}</h3>
                        </div>
                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 shadow-lg w-full p-5 text-center">
                            <h5 className='text-xs'>Referrals this week</h5>
                            <h3 className='text-xl text-blue-400 m-7'>0</h3>
                        </div>
                        <div className="overflow-x-auto border-2 border-blue-300 mt-5 shadow-lg w-full p-5 text-center">
                            <h5 className='text-xs'>Estimated profit</h5>
                            <h3 className='text-xl text-blue-400 m-7'>
                                {props.auth.user.affiliate_amount}
                            </h3>
                        </div>
                    </div>

                    {/* referral program  */}
                    <h4 className='text-2xl font-bold mt-12'>Referral Program</h4>

                    <div className="overflow-x-auto border-2 border-blue-300 my-5 shadow-lg">
                        <div className='p-6'>
                            <h5 className='text-sm font-medium'>Pass this link to users so that we can determine that they were invited by you</h5>

                            <h5 className='text-sm font-medium p-2 mb-5 bg-gray-200'>
                                {props.auth.user.referrallink}
                            </h5>

                            <ButtonPink className='px-5 py-2.5 font-bold text-xs rounded-none hover:shadow-none'>Copy</ButtonPink>
                        </div>
                    </div>


                    {/* my refarrels  */}
                    <h4 className='text-2xl font-bold mt-12'>My Referrals</h4>

                    {/* table  */}
                    {
                        props.auth?.user?.affilate?.length ?
                            <div className="overflow-x-auto border-2 border-blue-300 mt-5 shadow-lg p-3">
                                <table className="w-full my-4 text-gray-500 text-xs">
                                    <thead className='font-black'>
                                        <tr className='border-b-2 grid grid-cols-4 justify-items-stretch'>

                                            <th className='justify-self-start pl-7'>No</th>
                                            <th className='justify-self-start'>Referral email</th>
                                            <th className='justify-self-start'>Referral Name</th>
                                            <th className='justify-self-start'>Finished transactions</th>

                                        </tr>
                                    </thead>
                                    <tbody className='font-black'>
                                        {
                                            props.auth.user.affilate.map((member, i) => <tr
                                                key={i}
                                                className='grid grid-cols-4 justify-items-stretch whitespace-nowrap'
                                            >
                                                <td className='justify-self-start pl-7'>{i + 1}</td>
                                                <td className='justify-self-start'>{member.email}</td>
                                                <td className='justify-self-start'>{member.name}</td>
                                                <td className='justify-self-start'>{member.transactions}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <>
                                <div className="overflow-x-auto border-2 border-blue-300 mt-5 shadow-lg p-3">
                                    <table className="w-full my-4 text-gray-500 text-xs">
                                        <thead className='font-black'>
                                            <tr className='grid grid-cols-4 justify-items-stretch'>

                                                <th className='justify-self-start pl-7'>No</th>
                                                <th className='justify-self-start'>Referral email</th>
                                                <th className='justify-self-start'>Referral Name</th>
                                                <th className='justify-self-start'>Finished transactions</th>

                                            </tr>
                                        </thead>
                                        <tbody className='font-black'>

                                        </tbody>
                                    </table>
                                </div>
                                <h4 className='text-lg font-medium mt-3'>You don’t have any referrals yet. Invite people to use NOWPayments and get bonuses!</h4>
                            </>
                    }
                </div>
            </DashboardLayout>
        </>
    );
}
