"use client";

import { useState } from "react";

const API_URL = "http://localhost:3032/recipes"; // URL do JSON Server

export function EditForm({
  id,
  receitaAtual,
  onClose,
}: {
  id: string;
  receitaAtual: {
    titulo: string;
    detalhes: string;
    tipo_refeicao: string;
    num_para_servir: string | number;
    nivel_dificuldade: string;
    lista_ingredientes: string[];
  };
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(receitaAtual);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Receita atualizada com sucesso!");
        onClose(); // Fecha o formulário após a edição
      } else {
        const errorMsg = await response.text();
        setMessage(`Erro ao atualizar a receita: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
      setMessage("Erro ao conectar-se ao servidor.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Editar Receita</h3>
      <label className="block mb-2">
        Título:
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <label className="block mb-2">
        Detalhes:
        <textarea
          name="detalhes"
          value={formData.detalhes}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <label className="block mb-2">
        Tipo de Refeição:
        <input
          type="text"
          name="tipo_refeicao"
          value={formData.tipo_refeicao}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <label className="block mb-2">
        Porções:
        <input
          type="number"
          name="num_para_servir"
          value={formData.num_para_servir}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <label className="block mb-2">
        Dificuldade:
        <input
          type="text"
          name="nivel_dificuldade"
          value={formData.nivel_dificuldade}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <label className="block mb-2">
        Ingredientes (separados por vírgula):
        <input
          type="text"
          name="lista_ingredientes"
          value={formData.lista_ingredientes.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              lista_ingredientes: e.target.value.split(",").map((ing) => ing.trim()),
            })
          }
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <button
        type="submit"
        disabled={isSaving}
        className={`w-full py-2 px-4 mt-4 rounded text-white ${
          isSaving ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSaving ? "Salvando..." : "Salvar Alterações"}
      </button>
      {message && <p className="text-sm mt-4">{message}</p>}
    </form>
  );
}
