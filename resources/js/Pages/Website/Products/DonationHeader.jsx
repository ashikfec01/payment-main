import ButtonBlueOutline from "@/Components/ButtonBlueOutline";
import { Link } from "@inertiajs/react";

export default function DonationHeader() {

    return (
        <div className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <h1 className="text-4xl lg:text-5xl text-center font-bold my-3">Donation Tools</h1>
                <p className="text-lg  py-5 text-center  text-slate-300 max-w-4xl mx-auto">
                    Our crypto payment gateway provides many useful tools for donations. If you feel ready to broaden your horizons and open up to accepting donations in crypto, our cryptocurrency payment system is waiting for you! Pick the tool that suits your needs most.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center mt-10">
                    <ButtonBlueOutline className='block w-full max-w-xs mt-5 md:mr-10 py-3 text-xl font-bold'>Contact Sales </ButtonBlueOutline>
                    <Link className="block w-full max-w-xs" href={route('register')}>
                        <ButtonBlueOutline className='block w-full max-w-xs mt-5 py-3 md:mr-10 text-xl font-bold'>Sign Up</ButtonBlueOutline>
                    </Link>
                </div>
            </div>
        </div>
    );
}
