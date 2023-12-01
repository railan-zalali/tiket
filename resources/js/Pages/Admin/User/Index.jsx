import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Link } from "react-router-dom";
import PrimaryButton from "@/Components/PrimaryButton";

const Index = ({ auth, userData }) => {
    function destroy(e) {
        console.log(e.currentTarget.id);
        if (confirm("Apakah anda yakin ingin menghapus data post ini?")) {
            router.delete(route("user.destroy", e.currentTarget.id));
        }
    }
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        User
                        <Link href={route("user.create")}>
                            <button className="btn btn-sm ml-7 bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Tambah User
                            </button>
                        </Link>
                    </h2>
                }
            >
                <div className="container mx-auto p-4">
                    <div className="py-4">
                        <div className="w-full mx-auto min-h-screen sm:px-6 lg:px-8">
                            <div className="bg-slate-500 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex items-center justify-center">
                                        <div className="overflow-x-auto">
                                            <table className="table table-lg">
                                                <thead>
                                                    <tr>
                                                        <th className="py-2">
                                                            Nama User
                                                        </th>
                                                        <th className="py-2">
                                                            Username
                                                        </th>
                                                        <th className="py-2">
                                                            Email
                                                        </th>
                                                        <th className="py-2">
                                                            Role
                                                        </th>

                                                        <th className="py-2">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userData.map((data) => (
                                                        <tr key={data.user_id}>
                                                            <td>
                                                                <div className="flex items-center space-x-3">
                                                                    <div>
                                                                        <div className="font-bold">
                                                                            {
                                                                                data.name
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-sm max-w-xs">
                                                                {data.username}
                                                            </td>
                                                            <td className="text-sm max-w-xs">
                                                                {data.email}
                                                            </td>
                                                            <td className="text-sm max-w-xs">
                                                                {data.role}
                                                            </td>
                                                            <th>
                                                                <button
                                                                    onClick={
                                                                        destroy
                                                                    }
                                                                    id={
                                                                        data.user_id
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
};
export default Index;
