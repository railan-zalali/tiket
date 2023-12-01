// const confirmPay = (bookings_id) => {
//     const pay = bookings_id;
//     console.log("ini", pay);
//     router.put(route("pay.update", pay));
//     // axios
//     //     .put(`/pay/${pay}`)
//     //     .then((response) => {
//     //         // Handle respon dari server jika diperlukan
//     //         console.log(response.data);
//     //         toast.success("Pembayaran berhasil dikonfirmasi!");
//     //     })
//     //     .catch((error) => {
//     //         // Handle kesalahan jika terjadi
//     //         console.error("Error confirming payment:", error);
//     //         toast.error("Gagal mengkonfirmasi pembayaran.");
//     //     });
// };
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = ({ auth, bookings }) => {
    const [searchedBooking, setSearchedBooking] = useState(null);
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render((decodedText, decodedResult) => success(decodedText), {
            qrCodeErrorCallback: (error) => handleError(error),
        });

        function success(decodedText) {
            setScanResult(decodedText);

            // Memisahkan data menjadi array berdasarkan koma
            const dataArray = decodedText.split(",");

            // Kirim data ke backend Laravel
            sendDataToBackend(dataArray);
        }

        function handleError(err) {
            console.log(err);
        }
        function success(decodedText) {
            setScanResult(decodedText);
            // console.log(decodedText);

            // Panggil backend untuk mendapatkan data bookings berdasarkan bookings_id
            axios
                .get(`/bookings/${decodedText}`)
                .then((response) => {
                    setSearchedBooking(response.data[0]);
                    // console.log("data", response.data[0]);
                    // console.log("data", );
                })
                .catch((error) => {
                    console.error("Error fetching booking data:", error);
                    toast.error("Data not found!");
                });
        }

        // return () => {
        //     scanner.stop();
        // };
    }, []);

    const confirmPay = (bookingId) => {
        console.log(bookingId);
        // Panggil endpoint untuk mengubah status di Laravel
        axios
            .post(`/confirm-booking/${bookingId}`)
            .then((response) => {
                // Handle respons dari server jika diperlukan
                toast.success("Booking confirmed successfully!");

                // Refresh data atau lakukan operasi lain setelah konfirmasi berhasil
                // Misalnya, fetch ulang data bookings
                // atau lakukan manipulasi data langsung di state jika Anda menyimpan data di state
            })
            .catch((error) => {
                console.error("Error confirming booking:", error);
                toast.error("Failed to confirm booking!");
            });
    };
    console.log(scanResult);

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Pembayaran
                    </h2>
                }
            >
                <div>
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
                                        <div className="mt-12 shadow-2xl">
                                            <table className="table table-lg">
                                                <thead>
                                                    <tr>
                                                        <th className="py-2">
                                                            Nama User
                                                        </th>
                                                        <th className="py-2">
                                                            Detail Pesanan
                                                        </th>

                                                        <th className="py-2">
                                                            Tanggal Booking
                                                        </th>
                                                        <th className="py-2">
                                                            Jumlah Tiket
                                                        </th>
                                                        <th className="py-2">
                                                            Harga
                                                        </th>
                                                        <th className="py-2">
                                                            Status
                                                        </th>
                                                        <th className="py-2">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedBooking ? (
                                                        <tr
                                                            key={
                                                                searchedBooking.bookings_id
                                                            }
                                                        >
                                                            <td>
                                                                <div className="flex items-center space-x-3">
                                                                    <div>
                                                                        <div className="font-bold text-xs">
                                                                            {
                                                                                searchedBooking
                                                                                    .user
                                                                                    .name
                                                                            }
                                                                        </div>
                                                                        <div className="text-xs text-gray-700">
                                                                            {
                                                                                searchedBooking
                                                                                    .user
                                                                                    .email
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="flex items-center space-x-3">
                                                                    <div>
                                                                        <div className="font-bold">
                                                                            {
                                                                                searchedBooking
                                                                                    .tempat
                                                                                    .nama_tempat
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    searchedBooking.tanggal
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    searchedBooking.jumlah_tiket
                                                                }
                                                            </td>
                                                            <td>
                                                                Rp.
                                                                {
                                                                    searchedBooking.harga
                                                                }
                                                            </td>
                                                            <td>
                                                                <a className="btn btn-xs">
                                                                    {
                                                                        searchedBooking.status
                                                                    }
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-xs"
                                                                    onClick={() =>
                                                                        confirmPay(
                                                                            searchedBooking.bookings_id
                                                                        )
                                                                    }
                                                                >
                                                                    Confirm
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        bookings.map(
                                                            (booking) => (
                                                                <tr
                                                                    key={
                                                                        booking.bookings_id
                                                                    }
                                                                >
                                                                    <td>
                                                                        <div className="flex items-center space-x-3">
                                                                            <div>
                                                                                <div className="font-bold text-xs">
                                                                                    {
                                                                                        booking
                                                                                            .user
                                                                                            .name
                                                                                    }
                                                                                </div>
                                                                                <div className="text-xs text-gray-700">
                                                                                    {
                                                                                        booking
                                                                                            .user
                                                                                            .email
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex items-center space-x-3">
                                                                            <div>
                                                                                <div className="font-bold">
                                                                                    {
                                                                                        booking
                                                                                            .tempat
                                                                                            .nama_tempat
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            booking.tanggal
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            booking.jumlah_tiket
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        Rp.
                                                                        {
                                                                            booking.harga
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <a className="btn btn-xs">
                                                                            {
                                                                                booking.status
                                                                            }
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
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
