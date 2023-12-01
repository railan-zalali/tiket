import React, { Fragment, useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

import { connect, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Confirm from "@/Pages/Tiket/Confirm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Nav = (props) => {
const Nav = ({ cartItems, auth, countBookings }) => {
    // console.log(props);
    // console.log(cartItems);
    // console.log(countBookings);

    // console.log("nav", auth);
    const dispatch = useDispatch();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const subtotal = cartItems.reduce(
        (total, product) => total + parseFloat(product.harga),
        0
    );

    const { url } = usePage(); // Menggunakan usePage untuk mendapatkan informasi route saat ini

    // Fungsi untuk menangani proses checkout
    const handleCheckout = async () => {
        // Pastikan ada barang dalam keranjang belanja sebelum checkout
        if (cartItems.length === 0) {
            toast.error("Maaf keranjang belanja kamu kosong", {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            // Membuat objek data yang akan dikirim ke backend
            const checkoutData = {
                items: cartItems,
                subtotal: cartItems.reduce(
                    (total, product) => total + parseFloat(product.harga),
                    0
                ),
                jumlahData: cartItems.length,
            };

            console.log(checkoutData);

            const response = await axios.post("/checkout", checkoutData);

            // Dispatch aksi penghapusan item dari cart setelah berhasil checkout
            cartItems.forEach((item) => {
                dispatch(removeCartItem(item.id));
            });
            toast.success(response.data.message, {
                position: "bottom-right",
                autoClose: 3000,
            });
            // console.log(response.data);
        } catch (error) {
            console.error("Gagal melakukan checkout:", error);
        }
    };

    const [open, setOpen] = useState(true);
    // export default function Nav({ props }) {
    // console.log("nav : ", cartItems);

    useEffect(() => {
        window.onscroll = function () {
            const header = document.querySelector("header");
            const fixedNav = header.offsetTop;

            if (window.pageYOffset > fixedNav) {
                header.classList.add("navbar-fixed");
            } else {
                header.classList.remove("navbar-fixed");
            }
        };
    });

    return (
        <header className="bg-transparent absolute top-0 left-0 w-full flex items-center z-10">
            <div className="navbar bg-primary">
                <div className="flex-1">
                    <Link
                        href={route("dashboard")}
                        className="btn btn-ghost normal-case text-xl"
                    >
                        E-Tiket
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="drawer drawer-end">
                        <input
                            id="my-drawer-4"
                            type="checkbox"
                            className="drawer-toggle"
                            checked={openDrawer}
                            onChange={() => setOpenDrawer(!openDrawer)}
                        />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label
                                htmlFor="my-drawer-4"
                                className="btn btn-ghost btn-circle"
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">
                                        {cartItems.length}
                                    </span>
                                </div>
                            </label>
                        </div>

                        {/* Isi drawer menggunakan Dialog dan Transition */}
                        <Transition.Root show={openDrawer} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={() => setOpenDrawer(false)}
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-500"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-500"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pt-5" />
                                </Transition.Child>
                                <div className="fixed inset-0 overflow-hidden">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                                enterFrom="translate-x-full"
                                                enterTo="translate-x-0"
                                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                                leaveFrom="translate-x-0"
                                                leaveTo="translate-x-full"
                                            >
                                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md mt-16">
                                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                            <div className="flex items-start justify-between">
                                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                                    Keranjang
                                                                    Belanja
                                                                </Dialog.Title>
                                                                <div className="ml-3 flex h-7 items-center">
                                                                    <button
                                                                        type="button"
                                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                                        onClick={() =>
                                                                            setOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className="absolute -inset-0.5" />
                                                                        <span className="sr-only">
                                                                            Close
                                                                            panel
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="mt-8">
                                                                <div className="flow-root">
                                                                    <ul
                                                                        role="list"
                                                                        className="-my-6 divide-y divide-gray-200"
                                                                    >
                                                                        {cartItems.map(
                                                                            (
                                                                                product
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        product.id
                                                                                    }
                                                                                    className="flex py-6"
                                                                                >
                                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                        {product.foto_tempat && (
                                                                                            <img
                                                                                                src={route(
                                                                                                    "foto_tempats.show",
                                                                                                    product.foto_tempat
                                                                                                )}
                                                                                                alt={
                                                                                                    product.nama_tempat
                                                                                                }
                                                                                                className="h-full w-full object-cover object-center"
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                                        <div>
                                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                                <h3>
                                                                                                    <a
                                                                                                        href={
                                                                                                            product.href
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            product.nama_tempat
                                                                                                        }
                                                                                                    </a>
                                                                                                </h3>
                                                                                                <p className="ml-4">
                                                                                                    {
                                                                                                        product.harga
                                                                                                    }
                                                                                                </p>
                                                                                            </div>
                                                                                            <p className="mt-1 text-sm text-gray-500">
                                                                                                {
                                                                                                    product.tipe_tiket
                                                                                                }
                                                                                            </p>
                                                                                            <p className="mt-1 text-sm text-gray-500">
                                                                                                {
                                                                                                    product.tanggal
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                                            <p className="text-gray-500">
                                                                                                Qty
                                                                                                :
                                                                                                1
                                                                                            </p>

                                                                                            <div className="flex">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                                >
                                                                                                    Remove
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <p>Subtotal</p>
                                                                <p>
                                                                    Rp.
                                                                    {subtotal.toFixed(
                                                                        2
                                                                    )}
                                                                </p>
                                                            </div>

                                                            <div className="mt-6">
                                                                <button
                                                                    onClick={
                                                                        handleCheckout
                                                                    }
                                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                                >
                                                                    Proses
                                                                    Pesanan
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>
                    </div>
                </div>
                <div className="flex-none">
                    <Link href={route("confirm.page")} className="flex mx-4 ">
                        <div className="indicator d-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs indicator-item">
                                {countBookings}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="flex-none dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://source.unsplash.com/360x200?programming"
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a className="justify-between">{auth.name}</a>
                            <Link href={route("profile.edit")}>Profile</Link>
                        </li>
                        <li>
                            <Link href={route("tiket.index")} as="button">
                                Tiket
                            </Link>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
    };
};

// actions.js
export const removeCartItem = (productId) => {
    return {
        type: "REMOVE_CART_ITEM",
        payload: productId,
    };
};

export default connect(mapStateToProps)(Nav);
