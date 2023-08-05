import ButtonPink from "@/Components/ButtonPink";
import { Link } from "@inertiajs/react";

export default function Setup() {

    return (
        <div className="my-12 max-w-7xl mx-auto px-4  md:px-8">
            <h1 className="text-center text-4xl font-semibold leading-loose">Easy Integration and Setup</h1>
            <p className="text-center text-xl">Accept crypto payments and donations</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 justify-items-center content-center  py-12">
                <div>
                    <img className="w-36 h-32 mx-auto" src="https://nowpayments.io/images/setup/1.svg" alt="" />
                    <h3 className="text-xl font-bold">Set up account</h3>
                </div>
                <div>
                    <img className="w-36 h-32 mx-auto" src="https://nowpayments.io/images/setup/2.svg" alt="" />
                    <h3 className="text-xl font-bold">Choose your integration</h3>
                </div>
                <div>
                    <img className="w-36 h-32 mx-auto" src="https://nowpayments.io/images/setup/3.svg" alt="" />
                    <h3 className="text-xl font-bold">Place pay button on your website</h3>
                </div>
                <div>
                    <img className="w-36 h-32 mx-auto" src="https://nowpayments.io/images/setup/4.svg" alt="" />
                    <h3 className="text-xl font-bold">Get profit </h3>
                </div>
            </div>

            <div className="text-center">
                <Link href={route('register')}>
                    <ButtonPink className="px-7 py-4">
                        Start accepting crypto
                    </ButtonPink>
                </Link>
            </div>
        </div>
    );
}
