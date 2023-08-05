import ButtonBlueOutline from "@/Components/ButtonBlueOutline";
import { Link } from "@inertiajs/react";
import { BiSliderAlt } from "react-icons/bi";
import { BsLayoutWtf } from "react-icons/bs";
import { RiLayoutLine } from "react-icons/ri";
export default function ToolsandPlugins() {

    return (
        <div className="bg-slate-900 py-20 text-white">
            <h1 className="text-4xl font-bold text-center">
                Widest Range of Crypto Payment Tools and Plugins
            </h1>
            <div className="max-w-7xl md:flex mt-20 mx-auto px-4  md:px-8">
                <div className="md:mr-20">
                    <div className="flex items-center text-4xl">
                        <BiSliderAlt className="mr-7 text-blue-500  text-4xl border-2 border-blue-500  px-2 " />
                        <h1 className="hover:text-pink-500 font-bold">API</h1>
                    </div>
                    <div className="flex items-center text-4xl mt-5">
                        <BsLayoutWtf className="mr-7 text-blue-500  text-4xl border-2 border-blue-500  px-2 " />
                        <h1 className="hover:text-pink-500 font-bold">CMS Plugins</h1>
                    </div>
                    <div className="flex items-center text-4xl mt-5">
                        <RiLayoutLine className="mr-7 text-blue-500  text-4xl border-2 border-blue-500  px-2 " />
                        <h1 className="hover:text-pink-500 font-bold">Invoices</h1>
                    </div>
                    <Link href={route('main.payment')}>
                        <ButtonBlueOutline className='mt-10 text-lg font-semibold px-9 py-2'>Check docs</ButtonBlueOutline>
                    </Link>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-4 content-emd gap-5">
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/shopify-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/woo-commerce-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/shopify-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/woo-commerce-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/shopify-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/woo-commerce-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/shopify-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/woo-commerce-logo.svg" alt="" />
                    <img className="h-11" src="https://nowpayments.io/images/integration-ways/shopify-logo.svg" alt="" />
                </div>
            </div>

        </div>
    );

}
