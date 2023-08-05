import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import FiatHeader from "./FiatHeader";

export default function Fiat(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Fiat Payments" />
                <section className="min-h-screen">
                    <FiatHeader />
                </section>
            </MainLayout>
        </div>
    );
}
