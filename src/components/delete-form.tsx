"use client";

import { useState } from "react";
import { deleteReceita } from "./actions";  // Certifique-se de que o caminho para actions esteja correto.
import { useFormStatus } from "react-dom";

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
            Delete Receita
        </button>
    );
}

export function DeleteForm({ id, titulo }: { id: number; titulo: string }) {
    // Estado para gerenciar a resposta da operação de exclusão
    const [state, setState] = useState({
        message: "",
        isDeleting: false,
    });

    // Função para enviar o pedido de exclusão
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setState((prevState) => ({ ...prevState, isDeleting: true, message: "" }));

        try {
            // Chama a função deleteReceita com os dados necessários
            const response = await deleteReceita(state, new FormData(e.target as HTMLFormElement));

            setState({ message: response.message, isDeleting: false });
        } catch (error) {
            setState({ message: "Falha ao deletar receita", isDeleting: false });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Usamos campos ocultos para passar os dados necessários */}
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="titulo" value={titulo} />

            <DeleteButton />

            <p aria-live="polite" className="sr-only" role="status">
                {state.message}
            </p>
        </form>
    );
}
