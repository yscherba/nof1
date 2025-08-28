"use client";
import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeftSidebar from '../components/LeftSidebar';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [form, setForm] = useState({
        org_name: "",
        info: "",
        license: "",
        subscription: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('organization').select('org_name');
            setData(data);
            setError(error);
        }
        fetchData();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('organization').insert([{
            org_name: form.org_name,
            info: form.info,
            license: form.license,
            subscription: form.subscription,
        }]);
        setLoading(false);
        if (error) {
            setError(error);
        } else {
            setForm({ org_name: "", info: "", license: "", subscription: false });
            const { data } = await supabase.from('organization').select('org_name');
            setData(data);
        }
    }

    return (
        <div className="page">
            <Header />
            <div className="container">
                <div className="grid grid-cols-12 min-h-1/2">
                    <LeftSidebar />
                    <main className="col-span-8 flex items-center">
                        <div className="rounded-lg border border-gray-300 justify-center m-4 px-4 py-6">
                            <h2>Chat here</h2>
                            <h3>Add Organization</h3>
                            <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Organization Name"
                                    className="border p-2 rounded"
                                    value={form.org_name}
                                    onChange={e => setForm({ ...form, org_name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Info"
                                    className="border p-2 rounded"
                                    value={form.info}
                                    onChange={e => setForm({ ...form, info: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="License"
                                    className="border p-2 rounded"
                                    value={form.license}
                                    onChange={e => setForm({ ...form, license: e.target.value })}
                                />
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form.subscription}
                                        onChange={e => setForm({ ...form, subscription: e.target.checked })}
                                    />
                                    Subscription
                                </label>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add Organization"}
                                </button>
                            </form>
                            <h3>Example data from supabase</h3>
                            {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
                            {data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}