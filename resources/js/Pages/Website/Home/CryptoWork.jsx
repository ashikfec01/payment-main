import ButtonBlueOutline from "@/Components/ButtonBlueOutline";
import { Link } from "@inertiajs/react";

export default function CryptoWork() {

    return (
        <div className="py-20">
            <h2 className="text-4xl text-center font-bold ">How Crypto Payments Work</h2>
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="mt-36 w-full bg-center hidden xl:flex" style={{
                    backgroundImage: `url("https://nowpayments.io/images/how-works/desktop.svg")`, backgroundRepeat: 'no-repeat', height: '250px',
                }}>
                </div>
                <div className="mt-5 w-full bg-center  xl:hidden" style={{
                    backgroundImage: `url("https://nowpayments.io/images/how-works/mobile.svg")`, backgroundRepeat: 'no-repeat', height: '1245px',
                }}>
                </div>
                <div className="">
                    <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start">
                        <p className="mt-[-1000px] xl:mt-[-320px] text-xl font-semibold">
                            Your customer <br />
                            chooses to pay <br />
                            with crypto <br />
                        </p>
                        <p className="text-xl mt-[50px] xl:mt-0 font-semibold">
                            Customer <br />
                            selects a currency <br />
                            to pay with <br />
                        </p>
                        <p className="xl:mt-[-320px] text-xl font-semibold">
                            Customer sends <br />
                            crypto to the <br />
                            deposit address <br />
                        </p>
                        <p className="text-xl  mb-[-50px]  font-semibold">
                            You receive the <br />
                            currency <br />
                            of your choice <br />
                        </p>
                    </div>
                </div>
                <Link href={route('help')}>
                    <ButtonBlueOutline className='mt-28 xl:mt-20 block mx-auto px-9 text-lg font-semibold py-3'>Learn more</ButtonBlueOutline>
                </Link>
            </div>
        </div >
    );

}
