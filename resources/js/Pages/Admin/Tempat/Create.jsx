import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ tempats, auth, header }) {
    // console.log(props);
    console.log(tempats);

    const { data, setData, post, errors } = useForm({
        nama_tempat: "",
        deskripsi: "",
        alamat: "",
        kapasitas: "",
        harga: "",
        foto_tempat: null,
        kontak: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Menggunakan FormData untuk mengirim file (foto_tempat)
        const formData = new FormData();
        formData.append("nama_tempat", data.nama_tempat);
        formData.append("deskripsi", data.deskripsi);
        formData.append("alamat", data.alamat);
        formData.append("kapasitas", data.kapasitas);
        formData.append("harga", data.harga);
        formData.append("foto_tempat", data.foto_tempat);
        formData.append("kontak", data.kontak);

        post(route("tempats.store"), formData);
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tambah Tempat
                    </h2>
                }
            >
                <Head title="Edit Tempat" />
                <div className="container mx-auto p-4">
                    <div className="py-4">
                        <div className="w-full max-w-xl mx-auto min-h-screen sm:px-6 lg:px-8">
                            <div className="bg-slate-500 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <form
                                        onSubmit={handleSubmit}
                                        encType="multipart/form-data"
                                    >
                                        <div className="mb-4">
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
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.nama_tempat}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="deskripsi"
                                                className="label"
                                            >
                                                Deskripsi
                                            </label>
                                            <textarea
                                                id="deskripsi"
                                                type="text"
                                                className={`textarea textarea-bordered w-full max-w-lg ${
                                                    errors.deskripsi
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } `}
                                                value={data.deskripsi}
                                                onChange={(e) =>
                                                    setData(
                                                        "deskripsi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.deskripsi && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="alamat"
                                                className="label"
                                            >
                                                alamat
                                            </label>
                                            <input
                                                id="alamat"
                                                type="text"
                                                className={`input input-bordered w-full max-w-xs ${
                                                    errors.alamat
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                                value={data.alamat}
                                                onChange={(e) =>
                                                    setData(
                                                        "alamat",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.alamat && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.alamat}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="kapasitas"
                                                className="label"
                                            >
                                                Kapasitas
                                            </label>
                                            <input
                                                id="kapasitas"
                                                type="number"
                                                className={`input input-bordered w-full max-w-xs ${
                                                    errors.kapasitas
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                                value={data.kapasitas}
                                                onChange={(e) =>
                                                    setData(
                                                        "kapasitas",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.kapasitas && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.kapasitas}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="harga"
                                                className="label"
                                            >
                                                harga
                                            </label>
                                            <input
                                                id="harga"
                                                type="number"
                                                className={`input input-bordered w-full max-w-xs ${
                                                    errors.harga
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                                value={data.harga}
                                                onChange={(e) =>
                                                    setData(
                                                        "harga",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.harga && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.harga}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="foto_tempat"
                                                className="label"
                                            >
                                                Foto Tempat
                                            </label>
                                            <input
                                                id="foto_tempat"
                                                type="file"
                                                accept="image/*"
                                                className={`file-input file-input-bordered w-full max-w-xs ${
                                                    errors.foto_tempat
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                                onChange={(e) =>
                                                    setData(
                                                        "foto_tempat",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            {errors.foto_tempat && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.foto_tempat}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="kontak"
                                                className="label"
                                            >
                                                Kontak
                                            </label>
                                            <input
                                                id="kontak"
                                                type="number"
                                                className={`input input-bordered w-full max-w-xs ${
                                                    errors.kontak
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                                value={data.kontak}
                                                onChange={(e) =>
                                                    setData(
                                                        "kontak",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.kontak && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.kontak}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Simpan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
