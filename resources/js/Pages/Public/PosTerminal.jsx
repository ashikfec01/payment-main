import { Head } from "@inertiajs/react";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FiDelete } from "react-icons/fi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { IoTime } from "react-icons/io5";
import { useEffect } from "react";


export default function PosTerminal(props) {
    const [inputNumber, setInputNumber] = useState()
    const [coinSelect, setCoinSelect] = useState(null)
    const [coinStep, setCoinStep] = useState(false)
    const [barcodeStep, setBarcodeStep] = useState(props.barcodeStep)


    const numbers = [
        { id: 1, number: '1' },
        { id: 2, number: '2' },
        { id: 3, number: '3' },
        { id: 4, number: '4' },
        { id: 5, number: '5' },
        { id: 6, number: '6' },
        { id: 7, number: '7' },
        { id: 8, number: '8' },
        { id: 9, number: '9' },
        { id: 10, number: '00' },
        { id: 11, number: '0' },
        { id: 12, number: '.' },
    ]

    const addInputNumber = e => {
        setInputNumber(inputNumber.concat(e.target.name));
        var intValue = parseInt(inputNumber.concat(e.target.name).split(".")[0]);
        var intValueString = inputNumber.concat(e.target.name).split(".")[0];
        if (intValue.toString() != intValueString) {
            setInputNumber(parseFloat(inputNumber.concat(e.target.name)).toString());
        }
    }

    const keyPressAction = (e) => {
        if ((e.keyCode < 48 || e.keyCode > 57)) {
            if ((e.keyCode < 96 || e.keyCode > 105)) {
                if (!(e.keyCode == 8)) {
                    if (!(e.keyCode == 196 || e.keyCode == 110)) {
                        if (e.preventDefault) e.preventDefault();
                        e.returnValue = false;
                    } else {
                        setInputNumber(inputNumber.concat('.'));
                    }
                } else {
                    let x = inputNumber.slice(0, - 1);

                    if (x == '') {
                        x = '0';
                    }

                    setInputNumber(x);
                }
            } else {
                setInputNumber(inputNumber.concat(e.key));
            }
        } else {
            setInputNumber(inputNumber.concat(e.key));
        }
    }
    const backspaceNumber = () => {
        let x = inputNumber.slice(0, - 1);

        if (x == '') {
            x = '0';
        }

        setInputNumber(x);
    }
    const clearNumber = () => {
        setInputNumber('0');
    }

    useEffect(() => {
        setInputNumber('20');
    }, [setInputNumber]);
    return (
        <section>
            <Head title={`Pos Terminal`} />
            <div className="bg-slate-900 text-white min-h-screen">
                {
                    !barcodeStep ?
                        <>
                            {
                                !coinStep ?
                                    <div className="max-w-xs mx-auto py-10 px-14">
                                        <h3 className="text-xl font-medium text-center">BitBytePay</h3>
                                        <div className="flex px-4 border border-blue-600 rounded-md p-1 mt-1">
                                            <img
                                                className="rounded-full w-8 h-8"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHT9hSTrhnw5_FvXT219zV-Ge0aXmk-P1kZA&usqp=CAU" alt="" />
                                            <h1 className="text-xl font-bold pl-2">USD</h1>
                                        </div>
                                        <div className="flex px-4 border border-blue-600 rounded-md p-1 mt-4">
                                            <form action="">
                                                <input
                                                    autoFocus
                                                    onFocus={e => e.currentTarget.focus()}
                                                    className="input w-full max-w-xs focus:outline-none focus:ring-0 border-0 bg-none text-xl font-normal pl-2 bg-slate-900 text-blue-500"
                                                    type="text"
                                                    value={inputNumber}
                                                    onKeyDown={keyPressAction.bind(this)}
                                                />
                                            </form>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            {
                                                numbers.map((num, i) => <button
                                                    key={i}
                                                    onClick={addInputNumber}
                                                    name={num.number}
                                                    className="bg-blue-500 text-center text-lg font-bold p-3 rounded-md">{num.number}</button>)
                                            }
                                            <button
                                                onClick={clearNumber}
                                                className="bg-pink-500 flex items-center justify-center text-lg font-bold p-3 rounded-md">
                                                <RxCrossCircled className="text-3xl" />
                                            </button>
                                            <button
                                                onClick={backspaceNumber}
                                                className="bg-amber-500 flex items-center justify-center text-lg font-bold p-3 rounded-md">
                                                <FiDelete className="text-3xl" />
                                            </button>
                                            <button
                                                onClick={() => setCoinStep(!coinStep)}
                                                className="bg-green-500 flex items-center justify-center text-lg font-bold p-3 rounded-md">
                                                <BsArrowRight className="text-3xl" />
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="max-w-xs mx-auto py-10 px-14">
                                        <h3 className="text-xl font-medium text-center">BitBytePay</h3>
                                        {/* search field */}
                                        <div className="flex items-center justify-center px-2 border border-blue-600 rounded-md mt-1">
                                            <RiSearchLine className="text-2xl text-blue-500" />
                                            <input

                                                className="input w-full max-w-xs focus:outline-none focus:ring-0 border-0 text-sm font-normal pl-2 bg-slate-900 text-blue-500 py-0 max-h-10"
                                                placeholder="Search..."
                                                type="text" />
                                        </div>
                                        {/* search field end */}

                                        {/* coin  */}
                                        <div className="max-h-80 overflow-auto">
                                            {
                                                props?.coins?.data.map((coin) => <div
                                                    key={coin.id}
                                                    onClick={() => setCoinSelect(coin)}
                                                    className={`flex items-center  px-2 border border-blue-600 rounded-md p-1 mt-3 ${coinSelect && coinSelect.id === coin.id && 'bg-blue-500'}`}>
                                                    <img
                                                        className="rounded-full w-8 h-8"
                                                        src={coin.logourl} alt="" />
                                                    <div className="ml-2 leading-none">
                                                        <div className="flex items-center">
                                                            <h6 className="text-lg font-bold">{coin.ticker}</h6>
                                                            <p className={`font-medium ml-1 ${coinSelect && coinSelect.id === coin.id ? 'text-white' : 'text-slate-400'}`}>{coin.name}</p>
                                                        </div>
                                                        <button className="bg-green-500 text-xs rounded-sm px-2">{coin.ticker}</button>
                                                    </div>
                                                </div>
                                                )
                                            }
                                        </div>
                                        <p className="text-blue-500 text-center text-base font-medium mt-4">1.25425 BTC </p>
                                        <div className="flex justify-between items-center mt-4">
                                            <button
                                                onClick={() => setCoinStep(!coinStep)}
                                                className="bg-yellow-500 flex items-center justify-center w-full text-lg font-bold p-1 mr-2 rounded-md">
                                                <BsArrowLeft className="text-3xl" />
                                            </button>

                                            <form
                                                className="w-full"
                                                action={route('pos.terminal.post')} method='post'
                                            // encType="multipart/form-data"
                                            >

                                                {
                                                    coinSelect && inputNumber &&
                                                    <>< input type="hidden" name="_token" value={props.csrf} />
                                                        <input type="hidden" name="coin_id" value={coinSelect.id} />
                                                        <input type="hidden" name="coin_name" value={coinSelect.name} />
                                                        <input type="hidden" name="coin_ticker" value={coinSelect.ticker} />
                                                        <input type="hidden" name="coin_logourl" value={coinSelect.logourl} />
                                                        <input type="hidden" name="amount" value={inputNumber} />
                                                    </>
                                                }
                                                <button
                                                    // onClick={() => setBarcodeStep(!barcodeStep)}
                                                    disabled={coinSelect ? false : true}
                                                    type='submit'
                                                    className={`flex items-center justify-center w-full text-lg font-bold p-1 ml-2 rounded-md ${coinSelect ? 'bg-green-500' : 'bg-slate-500'}`}>
                                                    <BsArrowRight className="text-3xl" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                            }
                        </>
                        :
                        <>
                            <div className="max-w-xs mx-auto py-10 px-14">
                                <h3 className="text-base font-medium text-center">Order Total:</h3>
                                <p className="text-slate-400 text-center text-base font-medium mt-3">1.25425 BTC </p>
                                <p className="text-slate-400 text-center text-base font-medium">≈</p>
                                <p className="text-slate-400 text-center text-lg font-medium">20 USD</p>
                                <p className="text-center text-sm font-medium mt-3">Send:</p>
                                <p className="text-blue-500 text-center text-base font-medium my-3">1.25425 BTC </p>
                                <p className="flex items-center justify-center">
                                    <IoTime className="text-slate-400 text-lg rounded-full mr-1" />
                                    <small>
                                        19:80
                                    </small>
                                </p>
                                <p className="text-center text-base font-medium mt-3">To Address:</p>
                                <p className="text-blue-500 text-center text-lg font-semibold my-3 break-words leading-tight">3B7ivY6eeYCkVCGjvJR3vpsnJLJeH82n2p </p>
                                <img
                                    className="w-32 block mx-auto"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvnnF6LOIc-g4nnFr4sTXZRvKjUVnK0CNhOA&usqp=CAU" alt="" />
                                <div className="flex flex-col justify-between items-center mt-4">
                                    <button
                                        className="bg-yellow-600 flex items-center justify-center w-full text-sm font-medium p-2  rounded-sm mt-3">
                                        Waiting
                                    </button>
                                    <button
                                        className="bg-pink-500 flex items-center justify-center w-full text-sm font-medium p-2 rounded-rounded-sm mt-3">
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </>
                }
            </div>
        </section>
    );
}