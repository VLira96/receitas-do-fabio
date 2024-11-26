"use client";

import { useState } from "react";

const API_URL = "http://localhost:3032/recipes"; // URL do JSON Server

function DeleteButton({ isDeleting }: { isDeleting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isDeleting}
      className={`${
        isDeleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500"
      } text-white rounded-full py-2 px-8 mt-4 transition-all ${
        !isDeleting && "hover:bg-red-600"
      } focus:outline-none`}
    >
      {isDeleting ? "Excluindo..." : "Excluir Receita"}
    </button>
  );
}

export function DeleteForm({ id, titulo }: { id: string; titulo: string }) {
  const [state, setState] = useState({
    message: "",
    isDeleting: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setState({ message: "", isDeleting: true });

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setState({
          message: `Receita "${titulo}" excluída com sucesso.`,
          isDeleting: false,
        });
      } else {
        const errorMessage = await response.text();
        setState({
          message: `Falha ao excluir a receita: ${errorMessage}`,
          isDeleting: false,
        });
      }
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
      setState({
        message: "Erro ao conectar-se ao servidor. Tente novamente mais tarde.",
        isDeleting: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DeleteButton isDeleting={state.isDeleting} />
      <p
        aria-live="polite"
        className={`mt-4 text-sm ${
          state.message.includes("sucesso")
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}
