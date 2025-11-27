"use client";

import Link from "next/link";
import Image from "next/image";

const menu = [
    { titulo: 'Clientes', href: "/clientes" },
    { titulo: 'Enderecos', href: "/enderecos" },
    { titulo: 'Reservas', href: "/reservas" },
    { titulo: 'Espacos', href: "/espacos" },
];

export default function Header() {
    return (
        <>
            <div className="flex w-full bg-[#fff7e6]">
                <Image
                    src="/seu_cantinho_logo.jpg"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="ml-10 m-5"
                />


                <div className="flex w-full justify-end p-4 text-black m-5 pr-10">
                    <div className="flex gap-6">
                        {menu.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-3 py-2 rounded hover:bg-gray-200 transition"
                            >
                                {item.titulo}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
