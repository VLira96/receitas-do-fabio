"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

// Função para criar uma receita
export async function createReceita(
  prevState: { message: string },
  formData: FormData
) {
  const schema = z.object({
    titulo: z.string().min(1),
    detalhes: z.string().min(1),
    tipo_refeicao: z.string().min(1),
    num_para_servir: z.number().min(1),
    nivel_dificuldade: z.string().min(1),
    lista_ingredientes: z.string().min(1),
  });

  const parse = schema.safeParse({
    titulo: formData.get("titulo"),
    detalhes: formData.get("detalhes"),
    tipo_refeicao: formData.get("tipo_refeicao"),
    num_para_servir: Number(formData.get("num_para_servir")),
    nivel_dificuldade: formData.get("nivel_dificuldade"),
    lista_ingredientes: formData.get("lista_ingredientes"),
  });

  if (!parse.success) {
    return { message: "Failed to create receita" };
  }

  const data = parse.data;

  try {
    await sql`
      INSERT INTO receitas (titulo, detalhes, tipo_refeicao, num_para_servir, nivel_dificuldade, lista_ingredientes)
      VALUES (${data.titulo}, ${data.detalhes}, ${data.tipo_refeicao}, ${data.num_para_servir}, ${data.nivel_dificuldade}, ${data.lista_ingredientes})
    `;

    revalidatePath("/");

    return { message: `Ta salvo papai` };
  } catch (e) {
    console.error(e);
    return { message: "Deu pra salvar n mano..." };
  }
}

// Função para excluir uma receita
export async function deleteReceita(prevState: any, formData: any) {
  const schema = z.object({
    id: z.string().min(1),
    titulo: z.string().min(1),
  });

  const data = schema.parse({
    id: formData.get("id"),
    titulo: formData.get("titulo"),
  });

  try {
    await sql`
      DELETE FROM receitas
      WHERE id = ${data.id}
    `;

    revalidatePath("/");

    return { message: `Salvando receita ${data.titulo}` };
  } catch (e) {
    console.error(e);
    return { message: "Falho papai" };
  }
}

// Função para editar uma receita
export async function updateReceita(
  prevState: { message: string },
  formData: FormData
) {
  const schema = z.object({
    id: z.string().min(1),
    titulo: z.string().min(1),
    detalhes: z.string().min(1),
    tipo_refeicao: z.string().min(1),
    num_para_servir: z.number().min(1),
    nivel_dificuldade: z.string().min(1),
    lista_ingredientes: z.string().min(1),
  });

  const parse = schema.safeParse({
    id: formData.get("id"),
    titulo: formData.get("titulo"),
    detalhes: formData.get("detalhes"),
    tipo_refeicao: formData.get("tipo_refeicao"),
    num_para_servir: Number(formData.get("num_para_servir")),
    nivel_dificuldade: formData.get("nivel_dificuldade"),
    lista_ingredientes: formData.get("lista_ingredientes"),
  });

  if (!parse.success) {
    return { message: "Falha na validação dos dados" };
  }

  const data = parse.data;

  try {
    // Atualizar os dados no banco de dados
    await sql`
      UPDATE receitas
      SET 
        titulo = ${data.titulo},
        detalhes = ${data.detalhes},
        tipo_refeicao = ${data.tipo_refeicao},
        num_para_servir = ${data.num_para_servir},
        nivel_dificuldade = ${data.nivel_dificuldade},
        lista_ingredientes = ${data.lista_ingredientes}
      WHERE id = ${data.id}
    `;

    revalidatePath("/");

    return { message: "Receita atualizada com sucesso!" };
  } catch (e) {
    console.error(e);
    return { message: "Falha ao atualizar receita" };
  }
}
