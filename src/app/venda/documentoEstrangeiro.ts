// RUC / Cédula paraguaia: 5 a 9 dígitos com dígito verificador opcional (ex: 1234567-8)
export const EMAILS_GENERICOS = [
  "naotem@gmail.com",
  "nao.tem@gmail.com",
  "sememail@gmail.com",
];

export function limparDocumentoEstrangeiro(valor: string) {
  const [base, ...resto] = String(valor || "")
    .replace(/[^\d-]/g, "")
    .split("-");
  const digitos = base.slice(0, 9);

  if (!resto.length) return digitos;
  return `${digitos}-${resto.join("").slice(0, 1)}`;
}

export function documentoEstrangeiroValido(valor: string) {
  return /^\d{5,9}(-\d)?$/.test(String(valor || "").trim());
}

export function telefoneInternacionalValido(valor: string) {
  const digitos = String(valor || "").replace(/\D/g, "");
  return digitos.length >= 9 && digitos.length <= 15;
}

export function emailGenerico(valor: string) {
  return EMAILS_GENERICOS.includes(String(valor || "").trim().toLowerCase());
}
