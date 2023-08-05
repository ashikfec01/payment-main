import DNavLink from "@/Components/DNavLink";
import { Link } from "@inertiajs/react";
import { GiHamburgerMenu } from 'react-icons/gi';

export default function DashboardLayout({ auth, children }) {
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-gray-100">
                <div className="bg-black flex items-center justify-between">
                    <Link href='/' className="lg:hidden"><h2 className="font-normal text-2xl p-3 text-gray-100">Bit<span className='text-blue-400'>Byte</span>Pay</h2 ></Link>

                    <label htmlFor="my-drawer-2" className="btn bg-black border-0 text-2xl drawer-button lg:hidden ">
                        <GiHamburgerMenu />
                    </label>
                </div>

                {/* <!-- Page content here --> */}
                {children}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu p-5 w-72 bg-slate-900 text-gray-400 ">

                    {/* <!-- Sidebar content here --> */}
                    <Link href='/' className="hidden lg:block"><h2 className="font-normal text-2xl p-5 text-gray-100">Bit<span className='text-blue-400'>Byte</span>Pay</h2 ></Link>

                    <DNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i className="fa-solid fa-calendar-days mr-3">
                        </i>Transaction History</h6>
                    </DNavLink>

                    <DNavLink
                        href={route('payments')}
                        active={route().current('payments')}
                    >
                        <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i className="fa-solid fa-file-lines mr-3"></i>Payments</h6>
                    </DNavLink>

                    {/* payment dropdown  */}
                    <div>
                        <label htmlFor="Toggle1" className="w-full items-center rounded-md cursor-pointer">
                            <input id="Toggle1" type="checkbox" className="hidden peer" />

                            <span className="rounded-l-md block peer-checked:hidden">
                                <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i className="fa-solid fa-table-cells-large mr-3"></i>Payment Tools<i
                                    className="fa-solid fa-sort-down text-sm ml-16"></i></h6>
                            </span>

                            <span className="rounded-r-md hidden peer-checked:block">

                                <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i className="fa-solid fa-table-cells-large mr-3"></i>Payment Tools<i className="fa-solid fa-sort-up ml-16"></i></h6>

                                <div className="ml-11">
                                    <DNavLink href={route('payment.link')}
                                        active={route().current('payment.link')}
                                    >
                                        <h6 className='text-sm font-medium pl-12 py-1 hover:text-white'>Payment Link</h6>
                                    </DNavLink>

                                    <DNavLink href={route('donations')}
                                        active={route().current('donations')}
                                    >
                                        <h6 className='text-sm font-medium pl-12 py-1 hover:text-white'>Donations</h6>
                                    </DNavLink>

                                    <DNavLink href={route('subscriptions')}
                                        active={route().current('subscriptions')}
                                    >
                                        <h6 className='text-sm font-medium pl-12 py-1 hover:text-white'>Subscriptions</h6>
                                    </DNavLink>

                                    <DNavLink href={route('pos.terminal.link')}
                                        active={route().current('pos.terminal.link')}
                                    >
                                        <h6 className='text-sm font-medium pl-12 py-1 hover:text-white'>POS Terminal Link</h6>
                                    </DNavLink>
                                </div>
                            </span>
                        </label>
                    </div>

                    <DNavLink href={route('mass.payouts')}
                        active={route().current('mass.payouts')}
                    >
                        <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i className="fa-solid fa-arrow-up-from-bracket mr-3"></i>Mass Payouts</h6>
                    </DNavLink>

                    <DNavLink href={route('fiat.withdrawals')}
                        active={route().current('fiat.withdrawals')}
                    >
                        <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i
                            className="fa-solid fa-briefcase mr-3"></i>Fiat Withdrawals</h6>
                    </DNavLink>

                    <DNavLink href={route('affiliate.program')}
                        active={route().current('affiliate.program')}
                    >
                        <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i
                            className="fa-solid fa-user mr-3"></i>Affiliate Program</h6>
                    </DNavLink>

                    {/* settings dropdown  */}
                    <div>
                        <label htmlFor="Toggle2" className="w-full items-center rounded-md cursor-pointer">
                            <input id="Toggle2" type="checkbox" className="hidden peer" />

                            <span className="rounded-l-md block peer-checked:hidden mb-5">
                                <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i className="fa-solid fa-gear mr-3"></i>Settings<i
                                    className="fa-solid fa-sort-down text-sm ml-24"></i></h6>
                            </span>

                            <span className="rounded-r-md hidden peer-checked:block mb-5">
                                <h6 className='text-sm font-medium mx-6 my-1 hover:text-white'><i className="fa-solid fa-gear mr-3"></i>Settings<i className="fa-solid fa-sort-up ml-24"></i></h6>
                                <div className="ml-11">

                                    <DNavLink href={route('company.settings')}
                                        active={route().current('company.settings')}
                                    >
                                        <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Company Settings</h6>
                                    </DNavLink>

                                    <DNavLink href={route('account.settings')}
                                        active={route().current('account.settings')}
                                    >
                                        <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Account Settings</h6>
                                    </DNavLink>

                                    <DNavLink href={route('coins.settings')}
                                        active={route().current('coins.settings')}
                                    >
                                        <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Coins Settings</h6>
                                    </DNavLink>
                                </div>
                            </span>
                        </label>
                    </div>

                    {/* Management  */}
                    <div className="my-4">
                        {
                            auth?.user?.permission.includes('role-list') &&
                            <DNavLink href={route('roles.index')}
                                active={route().current('roles.index')}
                            >
                                <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i
                                    className="fa-solid fa-user mr-3"></i>Role Management</h6>
                            </DNavLink>
                        }
                        {
                            auth?.user?.permission.includes('user-list') &&
                            <DNavLink href={route('users.index')}
                                active={route().current('users.index')}
                            >
                                <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i
                                    className="fa-solid fa-user mr-3"></i>User Management</h6>
                            </DNavLink>
                        }

                        {
                            auth?.user?.permission.includes('coin-list') &&
                            <DNavLink href={route('coins.index')}
                                active={route().current('coins.index')}
                            >
                                <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i
                                    className="fa-solid fa-user mr-3"></i>Coin Management</h6>
                            </DNavLink>
                        }

                        {
                            auth?.user?.permission.includes('currencies-list') &&
                            <DNavLink href={route('currencies.index')}
                                active={route().current('currencies.index')}
                            >

                                <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i
                                    className="fa-solid fa-user mr-3"></i>Fiat Management</h6>
                            </DNavLink>
                        }

                        {
                            auth?.user?.permission.includes('company-list') &&
                            <DNavLink href={route('company.index')}
                                active={route().current('company.index')}
                            >
                                <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i
                                    className="fa-solid fa-user mr-3"></i>Company Management</h6>
                            </DNavLink>
                        }

                        {/* Withdraw Management dropdown  */}
                        {
                            (auth?.user?.permission.includes('fiat-withdraw-list') || auth?.user?.permission.includes('crypto-withdraw-list')) && <div>
                                <label htmlFor="Toggle3" className="w-full items-center rounded-md cursor-pointer">
                                    <input id="Toggle3" type="checkbox" className="hidden peer" />

                                    <span className="rounded-l-md block peer-checked:hidden my-2">
                                        <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i className="fa-solid fa-user mr-3"></i>Withdraw Management<i
                                            className="fa-solid fa-sort-down text-sm ml-4"></i></h6>
                                    </span>

                                    <span className="rounded-r-md hidden peer-checked:block mb-2">
                                        <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i className="fa-solid fa-user mr-3"></i>Withdraw Management<i className="fa-solid fa-sort-up ml-4"></i></h6>

                                        <div className="ml-11">
                                            {
                                                auth?.user?.permission.includes('fiat-withdraw-list') &&
                                                <DNavLink href={route('fiat.index')}
                                                    active={route().current('fiat.index')}
                                                >
                                                    <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Fiat Withdraw</h6>
                                                </DNavLink>
                                            }

                                            {
                                                auth?.user?.permission.includes('crypto-withdraw-list') &&
                                                <DNavLink href={route('crypto.index')}
                                                    active={route().current('crypto.index')}
                                                >
                                                    <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Crypto Withdraw</h6>
                                                </DNavLink>
                                            }
                                        </div>
                                    </span>
                                </label>
                            </div>
                        }
                        {/* Payment Management dropdown  */}
                        {
                            (auth?.user?.permission.includes('payment-list') || auth?.user?.permission.includes('donation-list') || auth?.user?.permission.includes('subscription-list')) && <div>
                                <label htmlFor="Toggle4" className="w-full items-center rounded-md cursor-pointer">
                                    <input id="Toggle4" type="checkbox" className="hidden peer" />

                                    <span className="rounded-l-md block peer-checked:hidden my-2">
                                        <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i className="fa-solid fa-user mr-3"></i>Payment Management<i
                                            className="fa-solid fa-sort-down text-sm ml-4"></i></h6>
                                    </span>

                                    <span className="rounded-r-md hidden peer-checked:block mb-2">
                                        <h6 className='text-sm font-medium mx-6 my-2 hover:text-white'><i className="fa-solid fa-user mr-3"></i>Payment Management<i className="fa-solid fa-sort-up ml-4"></i></h6>

                                        <div className="ml-11">
                                            {
                                                auth?.user?.permission.includes('payment-list') &&
                                                <DNavLink href={route('payment.index')}
                                                    active={route().current('payment.index')}
                                                >
                                                    <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Payment Link</h6>
                                                </DNavLink>
                                            }

                                            {
                                                auth?.user?.permission.includes('donation-list') &&
                                                <DNavLink href={route('donation.index')}
                                                    active={route().current('donation.index')}
                                                >
                                                    <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Donations</h6>
                                                </DNavLink>
                                            }
                                            {
                                                auth?.user?.permission.includes('subscription-list') &&
                                                <DNavLink href={route('subscriptions.index')}
                                                    active={route().current('subscriptions.index')}
                                                >
                                                    <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Subscriptions</h6>
                                                </DNavLink>
                                            }
                                            {
                                                auth?.user?.permission.includes('account-management-list') &&
                                                <DNavLink href={route('account.index')}
                                                    active={route().current('account.index')}
                                                >
                                                    <h6 className='text-sm font-medium pl-10 py-1 hover:text-white'>Account Management</h6>
                                                </DNavLink>
                                            }
                                        </div>
                                    </span>
                                </label>
                            </div>
                        }

                    </div>



                    <div className='mx-5'>
                        <a href="http://localhost:8000/docs#" target="_blank"><h6 className='text-sm font-medium mx-1 mt-1 hover:text-white'><i
                            className="fa-solid fa-file-lines mr-3"></i>API Docs</h6>
                        </a>

                        <DNavLink href={route('logout')} method="post" as="button"><h6 className='text-sm font-medium mx-1 mt-1 mb-6 hover:text-white'><i
                            className="fa-solid fa-right-from-bracket mr-3"></i>Sign Out</h6>
                        </DNavLink>

                        <DNavLink href="support@nowpayments.io"><h6 className='text-xs font-extralight text-blue-500'>support@nowpayments.io</h6>
                        </DNavLink>

                        <h6 className="text-sm font-light mt-2 text-gray-100">2023 © BitBytePay</h6>
                    </div>
                </ul>
            </div>
        </div>
    );
}
