import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";

export default function FAQ(props) {

    const data = [
        {
            "id": 1,
            "title": "Why should I accept crypto in my store?",
            "description": "Install our tools to start accepting crypto payments, donations, or to do mass payouts. The type of integration will depend on your platform and your goal — see below to find what option fits you best! And don’t hesitate to contact us should you have any questions at."
        },
        {
            "id": 2,
            "title": "How to place the pay button on my website?",
            "description": "There are endless benefits to payments in crypto. They have lower fees and are perfect for international transactions. There are many currencies to choose from, and you can always accept your favourite ones, while letting your customers pay with whichever crypto they prefer.."
        }
    ]

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Help" />
                <section className="min-h-screen max-w-4xl mx-auto px-4 lg:px-8 mt-10">
                    {
                        data.map((d, i) => <Accordion
                            key={i}
                            data={d}
                        >

                        </Accordion>)
                    }
                </section>
            </MainLayout>
        </div>
    );
}

function Accordion({ data }) {
    const [close, setClose] = useState(false)
    return (
        <div>
            <div onClick={() => setClose(!close)}
                className='flex justify-between items-center py-2 text-xl font-bold hover:text-blue-500'
            >
                <h2 >{data.title}  </h2>
                {close ? <FaMinus /> : <BsPlusLg />}
            </div>
            <h2 className={`text-base my-2 ${close ? 'block' : 'hidden'}`}>{data.description}</h2>
        </div>
    )

}
