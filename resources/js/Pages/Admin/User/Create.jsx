import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Link } from "react-router-dom";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({});
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("user.store"), formData);
    };
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        User
                    </h2>
                }
            >
                <div className="container mx-auto p-4">
                    <div className="py-4">
                        <div className="w-full mx-auto min-h-screen sm:px-6 lg:px-8">
                            <div className="bg-slate-500 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex items-center justify-center">
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Name"
                                                />

                                                <TextInput
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={data.name}
                                                    className="mt-1 block w-full"
                                                    autoComplete="name"
                                                    isFocused={true}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    message={errors.name}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="username"
                                                    value="Username"
                                                />

                                                <TextInput
                                                    id="username"
                                                    type="text"
                                                    name="username"
                                                    value={data.username}
                                                    className="mt-1 block w-full"
                                                    autoComplete="username"
                                                    onChange={(e) =>
                                                        setData(
                                                            "username",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    message={errors.username}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="email"
                                                    value="Email"
                                                />

                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-1 block w-full"
                                                    autoComplete="email"
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    message={errors.email}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="Password"
                                                />

                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="mt-1 block w-full"
                                                    autoComplete="new-password"
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />

                                                <InputError
                                                    message={errors.password}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="role"
                                                    value="Role"
                                                />
                                                <select
                                                    name="role"
                                                    id="role"
                                                    className="select select-bordered w-full mt-1"
                                                >
                                                    <option value="user">
                                                        User
                                                    </option>
                                                    <option value="petugas">
                                                        Petugas
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="flex items-center justify-end mt-4">
                                                <PrimaryButton
                                                    className="ml-4"
                                                    disabled={processing}
                                                >
                                                    Submit
                                                </PrimaryButton>
                                            </div>
                                        </form>
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
export default Create;
