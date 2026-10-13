// Cliente estrangeiro (América Latina): documento e telefone livres, quem confere é o vendedor.
export const EMAILS_GENERICOS = [
  "naotem@gmail.com",
  "nao.tem@gmail.com",
  "sememail@gmail.com",
];

export const PAIS_PADRAO = "PY";

// Mesma lista do backend (backend/utils/paises.js)
export const PAISES_LATINOS = [
  { iso: "AR", nome: "Argentina" },
  { iso: "BO", nome: "Bolívia" },
  { iso: "CL", nome: "Chile" },
  { iso: "CO", nome: "Colômbia" },
  { iso: "CR", nome: "Costa Rica" },
  { iso: "CU", nome: "Cuba" },
  { iso: "EC", nome: "Equador" },
  { iso: "SV", nome: "El Salvador" },
  { iso: "GT", nome: "Guatemala" },
  { iso: "HT", nome: "Haiti" },
  { iso: "HN", nome: "Honduras" },
  { iso: "MX", nome: "México" },
  { iso: "NI", nome: "Nicarágua" },
  { iso: "PA", nome: "Panamá" },
  { iso: "PY", nome: "Paraguai" },
  { iso: "PE", nome: "Peru" },
  { iso: "DO", nome: "República Dominicana" },
  { iso: "UY", nome: "Uruguai" },
  { iso: "VE", nome: "Venezuela" },
];

export function nomeDoPais(iso: string) {
  return PAISES_LATINOS.find((p) => p.iso === iso)?.nome || "";
}

export function limparDocumentoEstrangeiro(valor: string) {
  return String(valor || "").replace(/^\s+/, "").slice(0, 20);
}

export function documentoEstrangeiroValido(valor: string) {
  return String(valor || "").trim().length >= 4;
}

export function limparTelefoneInternacional(valor: string) {
  return String(valor || "").replace(/[^\d+\s()-]/g, "").slice(0, 25);
}

export function telefoneInternacionalValido(valor: string) {
  const digitos = String(valor || "").replace(/\D/g, "");
  return digitos.length >= 6 && digitos.length <= 15;
}

export function emailGenerico(valor: string) {
  return EMAILS_GENERICOS.includes(String(valor || "").trim().toLowerCase());
}
