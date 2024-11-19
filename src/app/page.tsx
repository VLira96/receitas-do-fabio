'use client'

import postgres from "postgres";
import { AddForm } from "../components/add-form";
import { DeleteForm } from "../components/delete-form";
// import { useState } from 'react';

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export default async function Home() {

  let receitas = await sql`
    SELECT * FROM receitas;
  `;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Receitas
      </h1>

      <div className="max-w-3xl mx-auto mb-12">
        <AddForm />
      </div>

      <div className="space-y-12">
        {receitas.map((receita) => {

          return (
            <div
              key={receita.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{receita.titulo}</h2>

              <p className="text-gray-700 mb-4">{receita.detalhes}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                <div>
                  <strong className="text-gray-700">Tipo de Refeição:</strong>
                  <p className="text-gray-600">{receita.tipo_refeicao}</p>
                </div>

                <div>
                  <strong className="text-gray-700">Porções:</strong>
                  <p className="text-gray-600">{receita.num_para_servir}</p>
                </div>

                <div>
                  <strong className="text-gray-700">Dificuldade:</strong>
                  <p className="text-gray-600">{receita.nivel_dificuldade}</p>
                </div>

                <div>
                  <strong className="text-gray-700">Ingredientes:</strong>
                  <p className="text-gray-600">{receita.lista_ingredientes}</p>
                </div>
              </div>

              <DeleteForm id={receita.id} titulo={receita.titulo} />
            </div>
          )
        })}
      </div>
    </main>
  );
}
