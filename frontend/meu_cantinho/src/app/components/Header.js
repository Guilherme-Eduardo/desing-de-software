"use client";

import Link from "next/link";
import Image from "next/image";

const menu = [
    { titulo: 'Clientes', href: "/cliente" },
    { titulo: 'Filiais', href: "/filial" },
    { titulo: 'Enderecos', href: "/endereco" },
    { titulo: 'Reservas', href: "/reserva" },
    { titulo: 'Espacos', href: "/espaco" },
];

export default function Header() {
    return (
        <>
            <div className="flex w-full bg-[#fff7e6]">

                <Link href={'http://localhost:3001/reserva'}>
                    <Image
                        src="/seu_cantinho_logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        href="/reserva"
                        className="ml-10 m-5"/>

                </Link>


                <div className="flex w-full justify-end p-4 text-black m-auto pr-10">
                    <div className="flex gap-6">
                        {menu.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-3 py-1 rounded hover:bg-orange-200 transition text-lg underline"
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
