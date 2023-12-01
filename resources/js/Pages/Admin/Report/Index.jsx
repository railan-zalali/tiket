import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useRef } from "react";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.flash";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import $ from "jquery";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import { Head } from "@inertiajs/react";

const Index = ({ auth, tempat, head }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        // Inisialisasi DataTables pada tabel
        const dataTable = $(tableRef.current).DataTable({
            dom: "Bfrtip",
            buttons: ["copy", "excel", "pdf", "print"],
            // ... konfigurasi DataTables lainnya
        });

        // Hapus DataTables ketika komponen unmount
        return () => {
            dataTable.destroy();
        };
    }, [tempat]);

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Cetak Laporan Tempat
                    </h2>
                }
            >
                <Head title={head} />
                <div className="container mx-auto p-4">
                    <div className="py-4">
                        <div className="w-full mx-auto min-h-screen sm:px-6 lg:px-8">
                            <div className="bg-slate-500 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex items-center justify-center">
                                        <div className="overflow-x-auto">
                                            <table
                                                ref={tableRef}
                                                className="table table-zebra-zebra w-full"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nama Tempat</th>
                                                        <th>Deskripsi</th>
                                                        <th>Alamat</th>
                                                        <th>Kapasitas</th>
                                                        <th>Harga</th>
                                                        <th>Kontak</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tempat.map(
                                                        (tempatItem) => (
                                                            <tr
                                                                key={
                                                                    tempatItem.tempats_id
                                                                }
                                                            >
                                                                <td>
                                                                    {
                                                                        tempatItem.tempats_id
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        tempatItem.nama_tempat
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        tempatItem.deskripsi
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        tempatItem.alamat
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        tempatItem.kapasitas
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        tempatItem.harga
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        tempatItem.kontak
                                                                    }
                                                                </td>
                                                            </tr>
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
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
