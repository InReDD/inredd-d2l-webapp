import { getWorkByDOI } from "@/src/services/crossref";
import { API } from "@/helpers/api";

const INREDD_WEB_API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Busca todos os papers da API interna e enriquece cada um
 * com metadados do Crossref via DOI.
 */
export async function getPapers() {
  // 1. Requisição original de papers da nossa API
  const path = `/papers`;
  const url = `${INREDD_WEB_API_BASE}${path}`;
  const data = await API.get( {path: url, searchParams: {}} );
  const papers = data.content

  // 2. Para cada paper, extrai o DOI e busca no Crossref
  const enriched = await Promise.all(
    papers.map(async (paper) => {
      const { doi } = paper;
      let crossrefData = null;

      if (doi) {
        try {
          const resp = await getWorkByDOI(doi);
          crossrefData = resp;
        } catch (error) {
          console.error(`Falha ao buscar Crossref para DOI ${doi}:`, error);
        }
      }

      return {
        ...paper,
        crossref: crossrefData,
      };
    })
  );

  return enriched;
}
