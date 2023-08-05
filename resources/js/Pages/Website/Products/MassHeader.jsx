import ButtonBlue from "@/Components/ButtonBlue";
import ButtonBlueOutline from "@/Components/ButtonBlueOutline";
import { Link } from "@inertiajs/react";

export default function MassHeader() {

    return (
        <div className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <h1 className="text-4xl lg:text-5xl text-center font-bold my-3">Mass Payments in crypto - done easy</h1>
                <p className="text-lg  py-5 text-center  text-slate-300 max-w-4xl mx-auto">
                    Get your crypto payments to the masses. Send rebates, freelance commissions, affiliate rewards, employee payrolls, or any other type of mass payment in a single API call – easy as pie.
                </p>
                <div className="flex flex-col md:flex-row-reverse justify-center items-center mt-10">
                    <ButtonBlue className='block w-full max-w-xs mt-5 md:ml-10 py-3 text-xl font-bold rounded-none'>Contact Sales </ButtonBlue>
                    <Link className="block w-full max-w-xs" href={route('register')}>
                        <ButtonBlueOutline className='block w-full max-w-xs mt-5 py-3 md:mr-10 text-xl font-bold'>Sign Up</ButtonBlueOutline>
                    </Link>
                </div>
            </div>
        </div>
    );

}
