import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "@/actions";

// import Nav from "@/Components/Tiket/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Nav from "./Nav";

const ResultSearch = ({
    auth,
    addToCart,
    dateAndDays,
    result,
    countBookings,
}) => {
    const [harga, setHarga] = useState("");
    const [ticketType, setTicketType] = useState("REGULER");
    const [vehicleType, setVehicleType] = useState("RODA2");

    const submit = (e) => {
        e.preventDefault();

        const formData = {
            id: auth.user.id,
            nama_tempat: e.target.nama_tempat.value,
            foto_tempat: e.target.foto_tempat.value,
            tanggal: e.target.tanggal.value,
            harga: e.target.harga.value,
            tipe_tiket: e.target.tipe_tiket.value,
            vehicle_type: vehicleType,
        };

        addToCart(formData);

        toast.success("Success, Lihat Keranjang Belanja", {
            position: "bottom-right",
            autoClose: 3000,
        });
    };

    useEffect(() => {
        let updatedHarga = parseFloat(result[0].harga);

        if (ticketType === "REGULER") {
            updatedHarga += 0;
        } else if (ticketType === "VIP") {
            updatedHarga += 10000;
        }

        // Update price based on the selected vehicle type
        if (vehicleType === "RODA2") {
            updatedHarga += 7500;
        } else if (vehicleType === "RODA4") {
            updatedHarga += 15000;
        }

        setHarga(updatedHarga.toFixed(2));
    }, [ticketType, result, vehicleType]);

    return (
        <>
            <Nav auth={auth.user} countBookings={countBookings} />

            <section className="pt-24 pb-32 bg-slate-100">
                <div className="container mx-auto">
                    <div className="w-full px-4">
                        <div className="max-w-xl mx-auto text-center mb-8">
                            <h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl">
                                Cari Destinasi Yang Kamu Inginkan
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full max-w-md">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden py-6">
                                <div className="flex flex-col w-full justify-center lg:flex-row px-6">
                                    {result.map((data, i) => (
                                        <form onSubmit={submit} key={i}>
                                            <div className="py-2">
                                                <input
                                                    type="hidden"
                                                    name="foto_tempat"
                                                    value={data.foto_tempat}
                                                />
                                                <label
                                                    htmlFor="tempat"
                                                    className="label"
                                                >
                                                    Tempat yang kamu pilih
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input input-bordered w-full"
                                                    name="nama_tempat"
                                                    value={data.nama_tempat}
                                                    disabled
                                                />
                                            </div>
                                            <div className="py-2">
                                                <label
                                                    htmlFor="tanggal"
                                                    className="label"
                                                >
                                                    Tanggal
                                                </label>
                                                <select
                                                    name="tanggal"
                                                    id="tanggal"
                                                    className="select select-bordered w-full"
                                                >
                                                    {dateAndDays.map(
                                                        (selectDate, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    selectDate.date
                                                                }
                                                            >
                                                                {selectDate.day}
                                                                ,
                                                                {
                                                                    selectDate.date
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="py-2">
                                                <label
                                                    htmlFor="tipe_tiket"
                                                    className="label"
                                                >
                                                    Tipe Tiket
                                                </label>
                                                <select
                                                    name="tipe_tiket"
                                                    id="tipe_tiket"
                                                    className="select select-bordered w-full"
                                                    onChange={(e) =>
                                                        setTicketType(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={ticketType}
                                                >
                                                    <option value="VIP">
                                                        VIP
                                                    </option>
                                                    <option value="REGULER">
                                                        REGULER
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="py-2">
                                                <label
                                                    htmlFor="vehicle_type"
                                                    className="label"
                                                >
                                                    Jenis Kendaraan
                                                </label>
                                                <select
                                                    name="vehicle_type"
                                                    id="vehicle_type"
                                                    className="select select-bordered w-full"
                                                    onChange={(e) =>
                                                        setVehicleType(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={vehicleType}
                                                >
                                                    <option value="RODA2">
                                                        Roda 2
                                                    </option>
                                                    <option value="RODA4">
                                                        Roda 4
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="py-2">
                                                <label
                                                    htmlFor="harga"
                                                    className="label"
                                                >
                                                    Harga
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input input-bordered w-full"
                                                    name="harga"
                                                    value={harga}
                                                    disabled
                                                />
                                            </div>
                                            <div className="py-4 px-6">
                                                <button className="btn btn-primary btn-block font-bold">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    ))}
                                </div>
                                <div className="py-2 px-6">
                                    <ResponsiveNavLink
                                        method="get"
                                        className="btn btn-ghost btn-block text-sm"
                                        href={route("tiket.index")}
                                        as="button"
                                    >
                                        Back Tiket
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
};

export default connect(null, { addToCart })(ResultSearch);
