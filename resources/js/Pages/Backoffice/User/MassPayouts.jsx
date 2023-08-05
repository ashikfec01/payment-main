import { Head } from '@inertiajs/react';
import DashboardLayout from "@/Layouts/DashboardLayout";
import ButtonPink from '@/Components/ButtonPink';

export default function MassPayouts(props) {
    return (
        <>
            <Head title="Mass Payouts" />
            <DashboardLayout auth={props.auth}>
                <div className='mx-4 my-10 lg:m-10'>
                    <h2 className='text-4xl font-semibold mb-7'>Mass Payouts</h2>

                    <div className='my-10'>
                        <div className='mb-4'>
                            <ButtonPink className='px-5 py-2.5 font-bold text-xs rounded-none hover:shadow-none'>Create Mass Payout</ButtonPink>
                        </div>

                        <div>
                            <ButtonPink className='px-5 py-2.5 font-bold text-xs rounded-none hover:shadow-none'>Open Filter</ButtonPink>
                        </div>
                    </div>

                    <h4 className='text-lg font-medium'>You don’t have any complete payments yet.</h4>
                </div>
            </DashboardLayout>
        </>
    );
}
