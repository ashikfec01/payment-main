import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Partners from "../Home/Partners";
import OurTeam from "./OurTeam";

export default function About(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="About" />
                <section className="min-h-screen max-w-7xl  mx-auto px-4 md:px-8 py-20">
                    <div>
                        <h1 className="text-center text-5xl font-bold mb-10">About us</h1>
                        <p>
                            NOWPayments is the best service that allows everyone to accept crypto payments on their websites, online stores, and social media accounts. It’s a non-custodial service, meaning it doesn’t hold or store your funds in any way. NOWPayments supports more than 50 cryptocurrencies, and it offers low transaction fees.

                            NOWPayments was founded in 2019, by the team behind ChangeNOW, a cryptocurrency exchange service. Our mission is to provide a crypto payment gateway that is easy to use and embed into existing websites. We believe everyone should have the chance to accept crypto payments or crypto donations for their e-commerce stores, charities or any type of business.

                            We provide a simple, easy-to-integrate service, and the only step needed to accept crypto payments is to copy a chunk of HTML code. Transactions are tied to your NOWPayments account and the API key you use for a specific purpose. We offer flexible solutions, like accepting payments in many different coins or converting all crypto assets you receive into your favorite cryptocurrency! The automatic exchange is powered by our crypto exchange service, ChangeNOW.
                            There are several widgets we offer for transactions and donations. Donation widgets and buttons allow you to accept cryptocurrency for donations and fundraisers. The user chooses the cryptocurrency they own and how much they want to donate. For other purposes, we offer a crypto payment system with buttons and widgets where the required amount is specified by other sources, for example, if a user wants to purchase something.

                            Finally, we offer useful plugins to accept crypto payments on online e-commerce providers, like Magento 2, OpenCart, WooCommerce, WHMCS, Zen Cart, PrestaShop, Ecwid and more. With our simple plugin, you can easily add a cryptocurrency payment option for the cart checkout at your online store!

                            NOWPayments Ltd., a company incorporated in Seychelles
                            Registered address in Seychelles: Suite 1, Second floor, Sound & Vision house, Francis Rachel Str, Victoria, Mahe, Seychelles
                            Postal Address: Amsterdam, Kraanspoor 50, 1033 SE, Netherlands
                        </p>
                    </div>
                    <OurTeam />
                    <Partners />
                </section>
            </MainLayout>
        </div>
    );
}
