"use client";

import { useState, useEffect } from "react";
import { AddForm } from "../components/add-form";
import { DeleteForm } from "../components/delete-form";
import { EditForm } from "../components/edit-form";

export default function Home() {
  const [receitas, setReceitas] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const API_URL = "http://localhost:3032/recipes";
      const response = await fetch(API_URL, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Erro ao buscar receitas. Verifique o JSON Server.");
      }

      const data = await response.json();
      setReceitas(data);
    };

    fetchRecipes();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Receitas
      </h1>

      <div className="max-w-3xl mx-auto mb-12">
        <AddForm />
      </div>

      <div className="space-y-12">
        {receitas.map((receita) =>
          editId === receita.id ? (
            <EditForm
              key={receita.id}
              id={receita.id}
              receitaAtual={receita}
              onClose={() => setEditId(null)}
            />
          ) : (
            <div
              key={receita.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {receita.titulo}
              </h2>

              <p className="text-gray-700 mb-4">{receita.detalhes}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
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
                  <ul className="text-gray-600 list-disc pl-5">
                    {receita.lista_ingredientes.map((ingrediente: any, index: any) => (
                      <li key={index}>{ingrediente}</li>
                    ))}
                  </ul>
                </div>
              </div>
              </div>

              <div className="">
                <DeleteForm id={receita.id} titulo={receita.titulo} />
                <button
                  onClick={() => setEditId(receita.id)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-yellow-600"
                >
                  Editar Receita
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
