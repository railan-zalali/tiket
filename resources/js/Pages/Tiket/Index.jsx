import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import Nav from "./Nav";

export default function Index({ props, auth, countBookings }) {
    // console.log("Tiket", dateAndDays);

    console.log(auth.user);
    // console.log("Tiket", today);
    // console.log("search", props);

    // const [activeButton, setActiveButton] = useState({ tanggal: "", hari: "" });

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_tempat: "",
    });

    console.log(data);
    console.log(data.nama_tempat);
    const submit = (e) => {
        e.preventDefault();
        post(route("tiket.searchTickets"), {
            data: data.nama_tempat,
        });
    };

    return (
        <>
            <Nav auth={auth.user} countBookings={countBookings} />
            <section className="pt-24 pb-32 bg-slate-100">
                <div className="w-full px-4">
                    <div className="max-w-xl mx-auto text-center mb-8">
                        <h4 className="font-semibold text-lg text-primary mb-2">
                            Cari Tiket
                        </h4>
                        <h2 className="font-bold text-dark text-3xl mb-4 sm:text-4xl">
                            Cari Destinasi Yang Kamu Inginkan
                        </h2>
                    </div>
                </div>

                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
                            <div className="px-6">
                                <div>
                                    <form onSubmit={submit}>
                                        <div className="py-2">
                                            <label
                                                htmlFor="namePlace"
                                                className="label"
                                            >
                                                Nama Tempat
                                            </label>
                                            <select
                                                className="select select-bordered w-full"
                                                id="namePlace"
                                                value={data.nama_tempat}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_tempat",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value={""}>
                                                    Pilih Tempat
                                                </option>
                                                {props.map((item, index) => (
                                                    <option
                                                        key={index}
                                                        value={item.nama_tempat}
                                                    >
                                                        {item.nama_tempat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="py-4 px-6">
                                            <button
                                                className="btn btn-primary btn-block font-bold"
                                                disabled={processing}
                                            >
                                                Cari Tiket
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
