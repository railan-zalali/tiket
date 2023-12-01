import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// export default function Edit(props) {
export default function Edit({ tempat, auth, message }) {
    const id = tempat.tempats_id;
    // console.log(props);
    console.log(message);
    console.log(id);

    const { data, setData, put, errors } = useForm({
        nama_tempat: tempat.nama_tempat,
        deskripsi: tempat.deskripsi,
        alamat: tempat.alamat,
        kapasitas: tempat.kapasitas,
        harga: tempat.harga,
        kontak: tempat.kontak,
        foto_tempat: tempat.foto_tempat || "",
        // Tambahkan field dan nilai awalnya sesuai kebutuhan
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("tempats.update", tempat.tempats_id), data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Tempat
                </h2>
            }
        >
            <Head title="Edit Tempat" />

            <div className="container mx-auto p-4">
                <div className="py-4">
                    <div className="w-full max-w-xl mx-auto min-h-screen sm:px-6 lg:px-8">
                        <div className="bg-slate-500 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="nama_tempat"
                                            className="label"
                                        >
                                            Nama Tempat
                                        </label>
                                        <input
                                            type="text"
                                            id="nama_tempat"
                                            className="input input-bordered w-full max-w-xs"
                                            value={data.nama_tempat}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_tempat",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        {errors.nama_tempat && (
                                            <div className="text-red-500">
                                                {errors.nama_tempat}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="deskripsi"
                                            className="label"
                                        >
                                            Deskripsi
                                        </label>
                                        <textarea
                                            type="text"
                                            id="deskripsi"
                                            className="textarea textarea-bordered w-full max-w-lg"
                                            value={data.deskripsi}
                                            onChange={(e) =>
                                                setData(
                                                    "deskripsi",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        {errors.deskripsi && (
                                            <div className="text-red-500">
                                                {errors.deskripsi}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="alamat"
                                            className="label"
                                        >
                                            Alamat
                                        </label>
                                        <input
                                            type="text"
                                            id="alamat"
                                            className="input input-bordered w-full"
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    "alamat",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        {errors.alamat && (
                                            <div className="text-red-500">
                                                {errors.alamat}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="kapasitas"
                                                className="label"
                                            >
                                                Kapasitas
                                            </label>
                                            <input
                                                type="number"
                                                id="kapasitas"
                                                className="input input-bordered w-full max-w-xs"
                                                value={data.kapasitas}
                                                onChange={(e) =>
                                                    setData(
                                                        "kapasitas",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.kapasitas && (
                                                <div className="text-red-500">
                                                    {errors.kapasitas}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="harga"
                                                className="label"
                                            >
                                                Harga
                                            </label>
                                            <input
                                                type="number"
                                                id="harga"
                                                className="input input-bordered w-full max-w-xs"
                                                value={data.harga}
                                                onChange={(e) =>
                                                    setData(
                                                        "harga",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.harga && (
                                                <div className="text-red-500">
                                                    {errors.harga}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="number"
                                            className="label"
                                        >
                                            Kontak
                                        </label>
                                        <input
                                            type="number"
                                            id="kontak"
                                            className="input input-bordered w-full max-w-xs"
                                            value={data.kontak}
                                            onChange={(e) =>
                                                setData(
                                                    "kontak",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        {errors.kontak && (
                                            <div className="text-red-500">
                                                {errors.kontak}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-row justify-between">
                                        <div className="mb-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Simpan Perubahan
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <a
                                                href={route("tempats.index")}
                                                className="btn btn-accent hover:text-white"
                                            >
                                                Batal
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
{
    /* <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Nama Tempat
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full"
                                        value={data.nama_tempat}
                                        onChange={(e) =>
                                            setData(
                                                "nama_tempat",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.nama_tempat && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.nama_tempat}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        className="form-input w-full"
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData("deskripsi", e.target.value)
                                        }
                                    />
                                    {errors.deskripsi && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.deskripsi}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Alamat
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                    />
                                    {errors.alamat && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.alamat}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Kapasitas
                                    </label>
                                    <input
                                        type="number"
                                        className="form-input w-full"
                                        value={data.kapasitas}
                                        onChange={(e) =>
                                            setData("kapasitas", e.target.value)
                                        }
                                    />
                                    {errors.kapasitas && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.kapasitas}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Harga
                                    </label>
                                    <input
                                        type="number"
                                        className="form-input w-full"
                                        value={data.harga}
                                        onChange={(e) =>
                                            setData("harga", e.target.value)
                                        }
                                    />
                                    {errors.harga && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.harga}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Kontak
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full"
                                        value={data.kontak}
                                        onChange={(e) =>
                                            setData("kontak", e.target.value)
                                        }
                                    />
                                    {errors.kontak && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.kontak}
                                        </p>
                                    )}
                                </div> */
}

{
    /* <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Foto Tempat
                                        </label>
                                        <input
                                            type="file"
                                            className="form-input w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "foto_tempat",
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                        {errors.foto_tempat && (
                                            <p className="text-red-500 text-xs italic">
                                                {errors.foto_tempat}
                                            </p>
                                        )}
                                    </div> */
}

{
    /* <div className="mb-4">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                    >
                                        Simpan Perubahan
                                    </button>
                                    <Link
                                        href={route("tempats.index")}
                                        className="btn btn-secondary ml-2"
                                    >
                                        Batal
                                    </Link>
                                </div> */
}
{
    /* </form> */
}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

// // resources/js/Pages/Admin/Tempat/Edit.jsx

// import { useForm } from "@inertiajs/react";
// import axios from "axios";
// import React, { useState } from "react";
// // import { useForm } from "@inertiajs/inertia-react";
// // import { Input, Textarea, Button, File } from "@headlessui/react";

// const Edit = ({ tempat }) => {
//     console.log(tempat);
//     console.log("edit", tempat);
//     const { data, setData, put, errors } = useForm({
//         nama_tempat: tempat[0].nama_tempat,
//         deskripsi: tempat[0].deskripsi,
//         kapasitas: tempat[0].kapasitas,
//         alamat: tempat[0].alamat,
//         harga: tempat[0].harga,
//         kontak: tempat[0].kontak,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         console.log(data);
//         console.log("hai", tempat[0].nama_tempat);

//         put(route("tempats.update", tempat[0].tempats_id), data);
//     };
//     return (
//         <div className="max-w-2xl mx-auto mt-6">
//             <h1 className="text-2xl font-bold mb-2">Edit Tempat</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-2">
//                     <label className="label">Nama Tempat</label>
//                     <input
//                         type="text"
//                         id="nama_tempat"
//                         name="nama_tempat"
//                         className="mt-1 p-2 w-full border rounded-md"
//                         value={data.nama_tempat}
//                         onChange={(e) => setData("nama_tempat", e.target.value)}
//                     />
//                     {errors.nama_tempat && (
//                         <div className="text-red-500">{errors.nama_tempat}</div>
//                     )}
//                 </div>
//                 <div className="mb-2">
//                     <label className="label">Deskripsi</label>
//                     <textarea
//                         name="deskripsi"
//                         className="textarea textarea-bordered textarea-lg w-full"
//                         value={data.deskripsi}
//                         onChange={(e) => setData("deskripsi", e.target.value)}
//                     />
//                     {errors.deskripsi && (
//                         <div className="text-red-500">{errors.deskripsi}</div>
//                     )}
//                 </div>
//                 <div className="mb-2">
//                     <label className="label">Alamat</label>
//                     <input
//                         type="text"
//                         name="alamat"
//                         className="input input-bordered w-full max-w-lg"
//                         value={data.alamat}
//                         onChange={(e) => setData("alamat", e.target.value)}
//                     />
//                     {errors.alamat && (
//                         <div className="text-red-500">{errors.alamat}</div>
//                     )}
//                 </div>
//                 <div className="flex flex-row justify-between">
//                     <div className="mb-2">
//                         <label className="label">Kapasitas</label>
//                         <input
//                             type="number"
//                             name="kapasitas"
//                             className="input input-bordered w-full max-w-xs"
//                             value={data.kapasitas}
//                             onChange={(e) =>
//                                 setData("kapasitas", e.target.value)
//                             }
//                         />
//                         {errors.kapasitas && (
//                             <div className="text-red-500">
//                                 {errors.kapasitas}
//                             </div>
//                         )}
//                     </div>
//                     <div className="mb-2">
//                         <label className="label">Harga</label>
//                         <input
//                             type="number"
//                             name="harga"
//                             className="input input-bordered w-full max-w-xs"
//                             value={data.harga}
//                             onChange={(e) => setData("harga", e.target.value)}
//                         />
//                         {errors.harga && (
//                             <div className="text-red-500">{errors.harga}</div>
//                         )}
//                     </div>
//                     <div className="mb-2">
//                         <label className="label">Kontak</label>
//                         <input
//                             type="text"
//                             name="kontak"
//                             className="input input-bordered w-full max-w-xs"
//                             value={data.kontak}
//                             onChange={(e) => setData("kontak", e.target.value)}
//                         />
//                         {errors.kontak && (
//                             <div className="text-red-500">{errors.kontak}</div>
//                         )}
//                     </div>
//                 </div>

//                 <div>
//                     <button
//                         type="submit"
//                         className="btn bg-slate-300 hover:btn-primary w-full"
//                     >
//                         Simpan
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Edit;
