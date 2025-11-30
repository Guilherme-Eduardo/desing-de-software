"use client";

import Header from "../components/Header";
import Image from "next/image";

export default function Iniciar() {

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#fff7e6]">
        <Header />
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md mx- items-center">
            <div className="flex flex-col p-0 justify-center items-center ">
              <Image
                src="/seu_cantinho_logo.png"
                alt="Logo"
                width={250}
                height={250}
                href="/reserva"
                className="" />
              <h1 className="text-black text-3xl text-center font-semibold">Seja bem vinda, Dona Heloísa</h1>
              <p className="text-black text-center text-lg py-8">
                Visite o menu que esta no canto superior direito conforme a sua necessidade :)
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
