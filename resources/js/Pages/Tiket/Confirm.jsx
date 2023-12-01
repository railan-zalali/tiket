import { useState } from "react";
import QRCode from "qrcode.react";
import Nav from "./Nav";
import { router } from "@inertiajs/react";

// const Confirm = (props) => {
const Confirm = ({ data, auth, countBookings }) => {
    console.log(data);
    // console.log(data[0].user.name);
    console.log("confirm", countBookings);
    // console.log(props);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenQr, setModalOpenQr] = useState(false);
    const [qrCodeValue, setQRCodeValue] = useState("");

    const openModalQr = () => {
        setModalOpenQr(true);
    };
    const closeModalQr = () => {
        setModalOpenQr(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // console.log(data.data.id);

    const cetakFunction = (bookings_id) => {
        // console.log("bis", bookings_id);
        const cetakData = bookings_id;
        const qrCodeArray = [cetakData];

        // Gabungkan array menjadi satu string dengan pemisah tertentu, misalnya '\n' (baris baru)
        const qrCodeData = qrCodeArray.join("\n");

        // Setel nilai QR code
        setQRCodeValue(qrCodeData);

        // Buka modal QR
        openModalQr();
    };
    const confirmCheckout = (id) => {
        const formData = new FormData();
        formData.append("id", id);

        router.put(route("confirm.checkout", id), formData);
    };

    function destroy(e) {
        console.log(e.currentTarget.id);
        if (confirm("Apakah anda yakin ingin menghapus data post ini?")) {
            router.delete(route("confirm.destroy", e.currentTarget.id));
        }
    }
    return (
        <>
            <Nav auth={auth.user} countBookings={countBookings} />
            <div className="container pt-24 pb-32 mx-auto p-4">
                <div className="py-4">
                    {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
                    <div className="w-full mx-auto sm:px-6 lg:px-8">
                        <div className="bg-slate-500 overflow-hidden shadow-lg sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="overflow-x-auto">
                                        <table className="table table-lg table-zebra-zebra">
                                            {/* head */}
                                            <thead className="text-black shadow-sm">
                                                <tr>
                                                    <th className="py-2">
                                                        Nama Tempat
                                                    </th>
                                                    <th className="py-2">
                                                        Tipe TIket
                                                    </th>
                                                    <th className="py-2">
                                                        Tanggal
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
                                                {data.map((data, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                            {data
                                                                                .tempat
                                                                                .foto_tempat && (
                                                                                <img
                                                                                    src={route(
                                                                                        "foto_tempats.show",
                                                                                        data
                                                                                            .tempat
                                                                                            .foto_tempat
                                                                                    )}
                                                                                    alt={
                                                                                        data
                                                                                            .tempat
                                                                                            .nama_tempat
                                                                                    }
                                                                                    className="w-full max-w-[75px]"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold">
                                                                            {
                                                                                data
                                                                                    .tempat
                                                                                    .nama_tempat
                                                                            }
                                                                        </div>
                                                                        <div className="text-base text-gray-700 truncate max-w-xs">
                                                                            {
                                                                                data
                                                                                    .tempat
                                                                                    .deskripsi
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    data.tipe_tiket
                                                                }
                                                            </td>
                                                            <td>
                                                                {data.tanggal}
                                                            </td>
                                                            <td>
                                                                {
                                                                    data.jumlah_tiket
                                                                }
                                                            </td>
                                                            <td>
                                                                {data.harga}
                                                            </td>
                                                            <td>
                                                                {data.status}
                                                            </td>

                                                            <td>
                                                                {data.status ===
                                                                    "pending" && (
                                                                    <button
                                                                        className="btn btn-success btn-xs hover:text-white mr-2"
                                                                        onClick={
                                                                            openModal
                                                                        }
                                                                        disabled={
                                                                            data.status ===
                                                                            "diproses"
                                                                        }
                                                                    >
                                                                        Confirm
                                                                    </button>
                                                                )}
                                                                {(data.status ===
                                                                    "diproses" ||
                                                                    data.status ===
                                                                        "success") && (
                                                                    <button
                                                                        className="btn btn-primary btn-xs mx-2 hover:text-white"
                                                                        onClick={() =>
                                                                            cetakFunction(
                                                                                data.bookings_id
                                                                            )
                                                                        }
                                                                        bookings_id={
                                                                            data.bookings_id
                                                                        }
                                                                    >
                                                                        Cetak
                                                                    </button>
                                                                )}
                                                                <dialog
                                                                    id="my_modal_2"
                                                                    className={`modal modal-bottom sm:modal-middle ${
                                                                        isModalOpen
                                                                            ? "modal-open"
                                                                            : ""
                                                                    }`}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        // Tutup modal jika di luar modal diklik
                                                                        if (
                                                                            e
                                                                                .target
                                                                                .id ===
                                                                            "my_modal_2"
                                                                        ) {
                                                                            closeModal();
                                                                        }
                                                                    }}
                                                                >
                                                                    <div className="modal-box">
                                                                        <form
                                                                            onSubmit={
                                                                                confirmCheckout
                                                                            }
                                                                            encType="multipart/form-data"
                                                                        >
                                                                            <input
                                                                                type="hidden"
                                                                                name="id"
                                                                                value={
                                                                                    data.id
                                                                                }
                                                                            />
                                                                            <div className="flex items-center justify-center pt-6 mx-auto">
                                                                                {/* Formulir Kiri */}
                                                                                <div className="flex flex-col mx-auto">
                                                                                    <label
                                                                                        htmlFor="username"
                                                                                        className="mb-2 text-gray-600"
                                                                                    >
                                                                                        Username
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        id="username"
                                                                                        name="username"
                                                                                        value={
                                                                                            data
                                                                                                .user
                                                                                                .username
                                                                                        }
                                                                                        className="mb-4 p-2 border border-gray-300 rounded-md"
                                                                                    />

                                                                                    <label
                                                                                        htmlFor="name"
                                                                                        className="mb-2 text-gray-600"
                                                                                    >
                                                                                        Nama
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        id="name"
                                                                                        name="name"
                                                                                        value={
                                                                                            data
                                                                                                .user
                                                                                                .name
                                                                                        }
                                                                                        className="mb-4 p-2 border border-gray-300 rounded-md"
                                                                                    />

                                                                                    <label
                                                                                        htmlFor="email"
                                                                                        className="mb-2 text-gray-600"
                                                                                    >
                                                                                        Email
                                                                                    </label>
                                                                                    <input
                                                                                        type="email"
                                                                                        id="email"
                                                                                        name="email"
                                                                                        value={
                                                                                            data
                                                                                                .user
                                                                                                .email
                                                                                        }
                                                                                        className="mb-4 p-2 border border-gray-300 rounded-md"
                                                                                    />
                                                                                </div>

                                                                                {/* Garis Lurus Vertikal */}
                                                                                <div className="border-r border-gray-300 h-40"></div>

                                                                                {/* Formulir Kanan */}
                                                                                <div className="flex flex-col mx-auto">
                                                                                    <label
                                                                                        htmlFor="nama_tempat"
                                                                                        className="mb-2 text-gray-600"
                                                                                    >
                                                                                        Nama
                                                                                        Tempat
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        id="nama_tempat"
                                                                                        name="nama_tempat"
                                                                                        value={
                                                                                            data
                                                                                                .tempat
                                                                                                .nama_tempat
                                                                                        }
                                                                                        className="mb-4 p-2 border border-gray-300 rounded-md"
                                                                                    />

                                                                                    <label
                                                                                        htmlFor="tanggal"
                                                                                        className="mb-2 text-gray-600"
                                                                                    >
                                                                                        Tanggal
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        id="tanggal"
                                                                                        name="tanggal"
                                                                                        value={
                                                                                            data.tanggal
                                                                                        }
                                                                                        className="mb-4 p-2 border border-gray-300 rounded-md"
                                                                                    />
                                                                                    <div className="flex space-x-4 mb-4">
                                                                                        <div className="flex flex-col w-24">
                                                                                            <label
                                                                                                htmlFor="harga"
                                                                                                className="mb-2 text-gray-600"
                                                                                            >
                                                                                                Jumlah
                                                                                                Tiket
                                                                                            </label>
                                                                                            <input
                                                                                                type="text"
                                                                                                id="harga1"
                                                                                                name="harga1"
                                                                                                value={
                                                                                                    data.jumlah_tiket
                                                                                                }
                                                                                                className="p-2 border border-gray-300 rounded-md"
                                                                                            />
                                                                                        </div>

                                                                                        <div className="flex flex-col w-24">
                                                                                            <label
                                                                                                htmlFor="harga"
                                                                                                className="mb-2 text-gray-600"
                                                                                            >
                                                                                                Harga
                                                                                                Tiket
                                                                                            </label>
                                                                                            <input
                                                                                                type="text"
                                                                                                id="harga2"
                                                                                                name="harga2"
                                                                                                value={
                                                                                                    data.harga
                                                                                                }
                                                                                                className="p-2 border border-gray-300 rounded-md"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="modal-action">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        confirmCheckout(
                                                                                            data.bookings_id
                                                                                        )
                                                                                    }
                                                                                    id={
                                                                                        data.bookings_id
                                                                                    }
                                                                                    tabIndex="-1"
                                                                                    type="button"
                                                                                    className="btn btn-primary hover:text-white"
                                                                                >
                                                                                    Confirm
                                                                                </button>

                                                                                <button
                                                                                    className="btn"
                                                                                    onClick={
                                                                                        closeModal
                                                                                    }
                                                                                >
                                                                                    Close
                                                                                </button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </dialog>
                                                                {data.status !==
                                                                    "success" && (
                                                                    <button
                                                                        onClick={
                                                                            destroy
                                                                        }
                                                                        id={
                                                                            data.bookings_id
                                                                        }
                                                                        tabIndex="-1"
                                                                        type="button"
                                                                        className="btn btn-error btn-xs text-black hover:text-white"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                        <div>
                                            <dialog
                                                id="my_modal_5"
                                                className={`modal modal-bottom sm:modal-middle ${
                                                    isModalOpenQr
                                                        ? "modal-open"
                                                        : ""
                                                }`}
                                            >
                                                <div className="modal-box">
                                                    <h1 className="font-bold text-lg">
                                                        Qr Code Kamu
                                                    </h1>
                                                    <p className="py-4">
                                                        Harap tunjukan Qr Code
                                                        saat di loket
                                                    </p>
                                                    <QRCode
                                                        value={qrCodeValue}
                                                    />
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button
                                                                className="btn"
                                                                onClick={
                                                                    closeModalQr
                                                                }
                                                            >
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div>
                {data.map((data, i) => {
                    return (
                        <div key={i}>
                            <h1>{data.tempat.nama_tempat}</h1>
                        </div>
                    );
                })}
            </div> */}
        </>
    );
};
export default Confirm;
