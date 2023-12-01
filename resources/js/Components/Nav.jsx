import { Link } from "@inertiajs/react";

import ResponsiveNavLink from "./ResponsiveNavLink";
import { useEffect, useState } from "react";

export default function Nav({ props }) {
    // console.log("nav:", props);
    const [isHamburgerActive, setHamburgerActive] = useState(false);
    const [isNavMenuActive, setNavMenuActive] = useState(false);

    const toggleHamburger = () => {
        setHamburgerActive(!isHamburgerActive);
        setNavMenuActive(!isNavMenuActive); // Toggling keadaan menu
    };

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

        return () => {
            // Hapus event listener saat komponen tidak lagi dirender
            window.onscroll = null;
        };
    }, []); // Gunakan array kosong untuk efek componentDidMount
    return (
        <header className="absolute top-0 left-0 z-10 flex w-full items-center bg-transparent">
            <div className="container">
                <div className="flex items-center justify-between relative">
                    <div className="px-4">
                        <a
                            href="#home"
                            className="font-bold text-lg text-primary block py-6"
                        >
                            Railan Zalali
                        </a>
                    </div>
                    <div className="flex items-center">
                        <button
                            id="hamburger"
                            name="hamburger"
                            type="button"
                            className={`block absolute right-4 lg:hidden ${
                                isHamburgerActive ? "hamburger-active" : ""
                            }`}
                            onClick={toggleHamburger}
                        >
                            <span className="hamburger-line transition duration-300 ease-in-out bg-black origin-top-left"></span>
                            <span className="hamburger-line transition duration-300 ease-in-out bg-black"></span>
                            <span className="hamburger-line transition duration-300 ease-in-out bg-black origin-bottom-left"></span>
                        </button>
                        <nav
                            id="nav-menu"
                            className={`lg:block lg:static lg:bg-transparent lg:max-w-full ${
                                isNavMenuActive
                                    ? "absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full"
                                    : "hidden"
                            }`}
                        >
                            <ul className="block lg:flex">
                                {props.user ? (
                                    <>
                                        <li className="group">
                                            <a
                                                href="#home"
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Beranda
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a
                                                href="#about"
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                About
                                            </a>
                                        </li>
                                        <li className="group">
                                            <Link
                                                href={route("tiket.index")}
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Project
                                            </Link>
                                        </li>
                                        <li className="group">
                                            <a
                                                href="#portofolio"
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Portofolio
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a
                                                href="#clients"
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Clients
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a
                                                href="#blog"
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Blog
                                            </a>
                                        </li>
                                        <li className="group">
                                            <a
                                                href="#contact"
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Contact
                                            </a>
                                        </li>
                                        <li className="group">
                                            <ResponsiveNavLink
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                                method="post"
                                                href={route("logout")}
                                                as="button"
                                            >
                                                Logout
                                            </ResponsiveNavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="group">
                                            <Link
                                                href={route("login")} // Navigate to the "login" route
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Log in
                                            </Link>
                                        </li>
                                        <li className="group">
                                            <Link
                                                href={route("register")} // Navigate to the "register" route
                                                className="text-base text-dark  py-2 mx-8 flex group-hover:text-primary"
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
