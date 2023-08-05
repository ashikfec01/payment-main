import ButtonBlueOutline from "@/Components/ButtonBlueOutline";
import ButtonPink from "@/Components/ButtonPink";
import { Link } from "@inertiajs/react";

export default function FiatHeader() {
    return (
        <div className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <h1 className="text-4xl lg:text-5xl text-center font-bold my-3">Charge crypto - settle in fiat!</h1>
                <p className="text-lg  py-5 text-center  text-slate-300 max-w-4xl mx-auto">
                    Receive crypto from your customers around the world. Make fiat settlements to your bank account with NOWPayments!
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center mt-10">
                    <Link href={route('register')}>
                        <ButtonPink className='block w-full max-w-xs mt-5 py-4 md:ml-10 text-xl font-bold'>Register at NOWPayments</ButtonPink>
                    </Link>
                </div>
            </div>
        </div>
    );

}
