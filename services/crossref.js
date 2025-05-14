import { API } from "@/helpers/api";

const CROSSREF_BASE = "https://api.crossref.org";

/**
 * Busca metadados de um paper no Crossref pelo DOI.
 * Retorna o objeto `message` do Crossref ou lança erro.
 *
 * @param {string} doi - DOI do artigo (ex: "10.1038/nature12373").
 * @returns {Promise<Object>} Metadados retornados pelo Crossref.
 */
export async function getWorkByDOI(doi) {
  if (!doi) {
    throw new Error("DOI é obrigatório para buscar no Crossref.");
  }

  // Codifica o DOI para uso em URL
  const path = `/works/${doi}`;
  const url = `${CROSSREF_BASE}${path}`;
  
  try {
    // Usamos API.get passando a URL completa no path
    const resp = await API.get({ path: url, searchParams: {} });

    // Crossref embrulha o resultado em { status, message, ... }
    if (resp && resp.message) {
      return resp.message;
    } else {
      throw new Error("Resposta inesperada do Crossref.");
    }
  } catch (error) {
    console.error(`Erro no getWorkByDOI(${doi}):`, error);
    throw error;
  }
}
