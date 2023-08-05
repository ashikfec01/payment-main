import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import CryptoWork from './CryptoWork';
import Feedback from './Feedback';
import Header from './Header';
import Partners from './Partners';
import PaymentGet from './PaymentGet';
import Setup from './Setup';
import ToolsandPlugins from './ToolsandPlugins';

export default function Home(props) {

    return (
        <div>
            <MainLayout
                auth={props.auth}
            >
                <Head title="Home" />

                <Header />

                <Setup />
                <PaymentGet />
                <ToolsandPlugins />
                <div className="bg-[#e5e5e5]">
                    <Partners />
                </div>

                <Feedback />
                <CryptoWork />
            </MainLayout>
        </div>
    );
}
