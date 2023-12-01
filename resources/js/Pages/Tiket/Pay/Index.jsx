import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = ({ cartItems, auth, countBookings }) => {
    // function index() {
    const [scanResult, setScanResult] = useState(null);
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(
            (decodedText, decodedResult) => success(decodedText, decodedResult),
            { qrCodeErrorCallback: (error) => error(error) }
        );

        function success(decodedText, decodedResult) {
            setScanResult(decodedText);
        }
        function error(err) {
            console.log(err);
        }
    }, []);
    console.log(scanResult);

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Pembayaran ee
                    </h2>
                }
            >
                <div className="container mx-auto p-4">
                    <div className="py-4">
                        <div className="w-full mx-auto min-h-screen sm:px-6 lg:px-8">
                            <div className="bg-slate-500 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex items-center justify-center">
                                        {scanResult ? (
                                            <div className="w-full max-w-sm">
                                                Success:{" "}
                                                <a href={scanResult}>
                                                    {scanResult}
                                                </a>
                                            </div>
                                        ) : (
                                            <div
                                                id="reader"
                                                className="w-full max-w-sm"
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
