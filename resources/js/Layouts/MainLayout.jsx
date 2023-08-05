import { useEffect, useState } from 'react';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import ButtonBlue from '@/Components/ButtonBlue';
import Footer from './Share/Footer';
import '../../css/Main.css'

export default function MainLayout({ auth, children }) {
    // menu state
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // navbar scroll functionality start
    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) { // if scroll up show the navbar
                setShow(true);
            } else { // if scroll down hide the navbar
                setShow(false);
            }

            // remember current page location to use in the next move
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);
    // navbar scroll functionality end

    return (
        <div className="min-h-screen">
            <nav className={`bg-slate-900 actives ${show && 'hiddens'}`}>
                <div className={`max-w-7xl mx-auto px-4  lg:px-8`}>
                    <div className="flex justify-between h-16">
                        <div className="flex items-center justify-between w-full">
                            <div className="shrink-0 flex items-center scroll">
                                <Link href="/">
                                    <h2 className='text-2xl text-blue-600'>BitByte<span className='text-white'>Pay</span></h2>
                                </Link>
                            </div>

                            <div className='flex items-center'>
                                {/* product dropdown */}
                                <div className="hidden lg:mr-4 lg:flex lg:items-center ">
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex items-center rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center  text-white hover:text-blue-500 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        Products

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('main.payment')}>Accept Payments</Dropdown.Link>
                                                <Dropdown.Link href={route('main.donation')}>Accept Donations</Dropdown.Link>
                                                <Dropdown.Link href={route('main.payout')}>Send Mass Payouts</Dropdown.Link>
                                                <Dropdown.Link href={route('main.fiat')}>Fiat Processing</Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="hidden space-x-8 lg:mr-4 lg:flex ">
                                    <NavLink href={route('pricing')} active={route().current('pricing')}
                                    >
                                        Price
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 lg:mr-4 lg:flex">
                                    <NavLink href={route('main.affiliate')} active={route().current('main.affiliate')}
                                    >
                                        Affiliate Program
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 lg:mr-4 lg:flex">
                                    <NavLink href={route('allcoin')} active={route().current('allcoin')}
                                    >
                                        Supported coins
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 lg:mr-4 lg:flex">
                                    <NavLink href=''
                                    >
                                        Blog
                                    </NavLink>
                                </div>

                                {/* help dropdown */}
                                <div className="hidden lg:flex lg:items-center lg:mr-4">
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex items-center rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center text-white hover:text-blue-500 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        Help
                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('help')}>FAQ</Dropdown.Link>
                                                <Dropdown.Link href={route('status')}>Status Page</Dropdown.Link>

                                                <Dropdown.Link href={route('contact')}>Contact us</Dropdown.Link>
                                                <a
                                                    className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out '
                                                    href="mailto:support@nowpayments.io">Support</a>
                                                <Dropdown.Link href={route('about')}>About</Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                {
                                    auth.user ?
                                        <Link
                                            href={route('dashboard')}
                                        >
                                            <ButtonBlue className='hidden space-x-8 lg:flex px-5 py-2 text-md font-bold'>Dashboard</ButtonBlue>
                                        </Link>
                                        :
                                        <>
                                            <div className="hidden space-x-8 lg:mr-4 lg:flex">
                                                <NavLink href={route('login')}
                                                    className=' text-[17px] '
                                                >
                                                    <span className='text-blue-500 hover:text-white'>
                                                        Sign In
                                                    </span>
                                                </NavLink>
                                            </div>
                                            <Link
                                                href={route('register')}
                                            >
                                                <ButtonBlue className='hidden space-x-8 lg:flex px-5 py-2 text-md font-bold'>Get Start</ButtonBlue>
                                            </Link>
                                        </>
                                }

                            </div>
                        </div>
                        {/* menu button */}
                        <div className="-mr-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>

                {/* mobile and laptop */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden'}>
                    <div className="pt-3 space-y-1">
                        {/* product  dropdown  */}
                        <div>
                            <label htmlFor="Toggle1" className="w-full items-center rounded-md cursor-pointer">
                                <input id="Toggle1" type="checkbox" className="hidden peer" />

                                <span className="rounded-l-md block peer-checked:hidden">
                                    <h6 className='font-medium text-white w-full flex items-start pl-3 py-2
                                    hover:bg-slate-800 hover:text-blue-500'>Products<i
                                            className="fa-solid fa-sort-down ml-16"></i></h6>
                                </span>

                                <span className="rounded-r-md hidden peer-checked:block">
                                    <h6 className='font-medium text-white w-full flex items-end pl-3 py-2 hover:bg-slate-800 hover:text-blue-500'>Products<i className="fa-solid fa-sort-up ml-16"></i></h6>
                                    <div>
                                        {/* dropdown items */}
                                        <ResponsiveNavLink className='pl-10' href={route('main.payment')} active={route().current('main.payment')}>
                                            Accept Payments
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink className='pl-10' href={route('main.donation')} active={route().current('main.donation')}>
                                            Accept Donations
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink className='pl-10' href={route('main.payout')} active={route().current('main.payout')}>
                                            Send Mass Payouts
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink className='pl-10' href={route('main.fiat')} active={route().current('main.fiat')}>
                                            Fiat Processing
                                        </ResponsiveNavLink>
                                    </div>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className=" space-y-1">
                        <ResponsiveNavLink className='pl-3' href={route('pricing')} active={route().current('pricing')}>
                            Price
                        </ResponsiveNavLink>
                    </div>
                    <div className="space-y-1">
                        <ResponsiveNavLink className='pl-3' href={route('main.affiliate')} active={route().current('main.affiliate')}>
                            Affiliate Program
                        </ResponsiveNavLink>
                    </div>
                    <div className="space-y-1">
                        <ResponsiveNavLink className='pl-3' href={route('allcoin')} active={route().current('allcoin')}>
                            Supported coins
                        </ResponsiveNavLink>
                    </div>
                    <div className="space-y-1">
                        <ResponsiveNavLink className='pl-3' href=''>
                            Blog
                        </ResponsiveNavLink>
                    </div>
                    <div className="space-y-1">
                        {/* Help  dropdown  */}
                        <div>
                            <label htmlFor="Toggle2" className="w-full items-center rounded-md cursor-pointer">
                                <input id="Toggle2" type="checkbox" className="hidden peer" />

                                <span className="rounded-l-md block peer-checked:hidden">
                                    <h6 className='font-medium text-white w-full flex items-start pl-3 py-2
                                    hover:bg-slate-800 hover:text-blue-500'>Help<i
                                            className="fa-solid fa-sort-down ml-16"></i></h6>
                                </span>

                                <span className="rounded-r-md hidden peer-checked:block">
                                    <h6 className='font-medium text-white w-full flex items-end pl-3 py-2 hover:bg-slate-800 hover:text-blue-500'>Help<i className="fa-solid fa-sort-up ml-16"></i></h6>
                                    <div>
                                        {/* dropdown items */}
                                        <ResponsiveNavLink className='pl-10' href={route('help')} active={route().current('help')}>
                                            FAQ
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink className='pl-10' href={route('status')} active={route().current('status')}>
                                            Status Page
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink className='pl-10' href={route('contact')} active={route().current('contact')}>
                                            Contact us
                                        </ResponsiveNavLink>
                                        <a
                                            className='w-full flex items-start pl-10 py-2 text-white hover:text-blue-500 font-medium hover:bg-slate-800 focus:outline-none transition duration-150 ease-in-out'
                                            href="mailto:support@nowpayments.io">Support</a>

                                        <ResponsiveNavLink className='pl-10' href={route('about')} active={route().current('about')}>
                                            About
                                        </ResponsiveNavLink>
                                    </div>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="my-5 flex justify-around items-center mx-4">
                        {
                            auth.user ?
                                <Link
                                    href={route('dashboard')}
                                    className=''
                                >
                                    <ButtonBlue className=' px-16 py-2 text-md font-bold'>Dashboard</ButtonBlue>
                                </Link>
                                :
                                <>
                                    <div className="space-x-8 lg:mr-4">
                                        <NavLink href={route('login')}
                                            className='text-blue-500 text-[20px]'
                                        >
                                            <span className='text-blue-500 hover:text-white'>
                                                Sign In
                                            </span>
                                        </NavLink>
                                    </div>
                                    <Link
                                        href={route('register')}
                                    >
                                        <ButtonBlue className='space-x-8 px-9 py-2 text-md font-bold'>Get Start</ButtonBlue>
                                    </Link>
                                </>

                        }
                    </div>
                </div>
            </nav>
            {/* main content */}
            <main className='pt-[60px]'>{children}</main>
            {/* footer  */}
            <Footer />
        </div>
    );
}
