"use client";

import { useState } from "react";

const API_URL = "http://localhost:3032/recipes"; // URL do JSON Server

function SubmitButton() {
  return (
    <button
      className="bg-green-500 text-white rounded-full py-2 px-8 mt-4 transition-all hover:bg-green-600 focus:outline-none"
      type="submit"
    >
      Adicionar Receita
    </button>
  );
}

export function AddForm() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    titulo: "",
    detalhes: "",
    tipo_refeicao: "",
    num_para_servir: "",
    nivel_dificuldade: "",
    lista_ingredientes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar os dados para a API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lista_ingredientes: formData.lista_ingredientes.split(",").map((item) => item.trim()),
        }),
      });

      if (response.ok) {
        setMessage("Receita adicionada com sucesso!");
        setFormData({
          titulo: "",
          detalhes: "",
          tipo_refeicao: "",
          num_para_servir: "",
          nivel_dificuldade: "",
          lista_ingredientes: "",
        });
      } else {
        setMessage("Erro ao adicionar a receita.");
      }
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
      setMessage("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <form className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label htmlFor="titulo" className="text-lg font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label htmlFor="detalhes" className="text-lg font-medium text-gray-700">
            Detalhes
          </label>
          <input
            type="text"
            id="detalhes"
            name="detalhes"
            value={formData.detalhes}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label htmlFor="tipo_refeicao" className="text-lg font-medium text-gray-700">
            Tipo de Refeição
          </label>
          <input
            type="text"
            id="tipo_refeicao"
            name="tipo_refeicao"
            value={formData.tipo_refeicao}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label htmlFor="num_para_servir" className="text-lg font-medium text-gray-700">
            Número de Porções
          </label>
          <input
            type="number"
            id="num_para_servir"
            name="num_para_servir"
            value={formData.num_para_servir}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label htmlFor="nivel_dificuldade" className="text-lg font-medium text-gray-700">
            Nível de Dificuldade
          </label>
          <input
            type="text"
            id="nivel_dificuldade"
            name="nivel_dificuldade"
            value={formData.nivel_dificuldade}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label htmlFor="lista_ingredientes" className="text-lg font-medium text-gray-700">
            Ingredientes (separados por vírgula)
          </label>
          <textarea
            id="lista_ingredientes"
            name="lista_ingredientes"
            value={formData.lista_ingredientes}
            onChange={handleChange}
            required
            rows={4}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <SubmitButton />
        <p aria-live="polite" className="text-sm text-green-500 mt-4">
          {message}
        </p>
      </div>
    </form>
  );
}
