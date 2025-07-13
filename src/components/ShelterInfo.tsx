"use client";
import { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";

export default function ShelterInfo() {
    const contract = useContract();
    const [info, setInfo] = useState<any>(null);

    useEffect(() => {
        const fetchInfo = async () => {
            if (!contract) return;
            try {
                const data = await contract.shelterInfo();
                console.log(data);
                setInfo(data);
            } catch (e) {
                setInfo(null);
            }
        };
        fetchInfo();
    }, [contract]);

    if (!info) {
        return null;
    }

    return (
        <div className="mb-6 bg-gray-50 border border-gray-200 rounded p-4">
            <h3 className="font-bold text-lg mb-2 text-green-700">{info[0]}</h3>
            <div className="text-sm text-gray-700">
                <div><b>Dirección:</b> {info[0]}</div>
                <div><b>Email:</b> {info.email}</div>
                <div><b>Teléfono:</b> {info.phone}</div>
                <div><b>Web:</b> <a href={info.website} className="underline text-blue-700" target="_blank">{info.website}</a></div>
                <div><b>Redes:</b> {info.socialMedia}</div>
                <div><b>Admins:</b> {(info.adminNames || []).join(", ")}</div>
            </div>
        </div>
    );
}