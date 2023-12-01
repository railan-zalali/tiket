import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// export default function Index(props) {
export default function Index({ tempats, auth, head, message }) {
    console.log("index", auth);
    console.log("index", tempats);
    console.log("index", message);

    useEffect(() => {
        if (message) {
            toast.info(message, {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    }, [message]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const editTempats = (id) => {
        const formData = new FormData();
        formData.append("id", id);

        router.put(route("confirm.checkout", id), formData);
    };

    // const { post } = useForm();
    console.log(tempats);
    function destroy(e) {
        console.log(e.currentTarget.id);
        if (confirm("Apakah anda yakin ingin menghapus data post ini?")) {
            router.delete(route("tempats.destroy", e.currentTarget.id));
        }
    }

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        All Posts
                        <Link href={route("tempats.create")}>
                            <button className="btn btn-sm ml-7 bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Tambah Tempat
                            </button>
                        </Link>
                    </h2>
                }
            >
                <Head title={head} />
                <div className="container mx-auto p-4">
                    <div className="py-4">
                        <div className="w-full mx-auto min-h-screen sm:px-6 lg:px-8">
                            <div className="bg-slate-500 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="overflow-x-auto">
                                            <table className="table table-lg">
                                                <thead>
                                                    <tr>
                                                        <th className="py-2">
                                                            Nama Tempat
                                                        </th>
                                                        <th className="py-2">
                                                            Deskripsi
                                                        </th>

                                                        <th className="py-2">
                                                            Kapasitas
                                                        </th>
                                                        <th className="py-2">
                                                            Harga
                                                        </th>
                                                        <th className="py-2">
                                                            Kontak
                                                        </th>
                                                        <th className="py-2">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tempats.map((tempat) => (
                                                        <tr
                                                            key={
                                                                tempat.tempats_id
                                                            }
                                                        >
                                                            <td>
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                            {tempat.foto_tempat && (
                                                                                <img
                                                                                    src={route(
                                                                                        "foto_tempats.show",
                                                                                        tempat.foto_tempat
                                                                                    )}
                                                                                    alt={
                                                                                        tempat.nama_tempat
                                                                                    }
                                                                                    className="w-full max-w-[75px]"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold">
                                                                            {
                                                                                tempat.nama_tempat
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="truncate max-w-xs">
                                                                {
                                                                    tempat.deskripsi
                                                                }
                                                                <div className="text-sm opacity-50">
                                                                    {
                                                                        tempat.alamat
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    tempat.kapasitas
                                                                }
                                                            </td>
                                                            <td>
                                                                {tempat.harga}
                                                            </td>
                                                            <td>
                                                                {tempat.kontak}
                                                            </td>
                                                            <th>
                                                                <Link
                                                                    href={route(
                                                                        "tempats.edit",
                                                                        tempat.tempats_id
                                                                    )}
                                                                    className="text-blue-500 hover:underline mr-2"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={
                                                                        destroy
                                                                    }
                                                                    id={
                                                                        tempat.tempats_id
                                                                    }
                                                                    tabIndex="-1"
                                                                    type="button"
                                                                    className="btn
                                                                btn-error btn-xs
                                                                text-black
                                                                hover:text-white"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
