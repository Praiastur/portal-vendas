import { useState } from "react";
import axios from "axios";
import { Card, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { StepProps } from "../types";
import { Loader2 } from "lucide-react";

export function StepEndereco({
  formData,
  handleChange,
  setFormData,
}: StepProps) {
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  const estrangeiro = Boolean(formData.estrangeiro);

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (estrangeiro) return;

    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    setCepLoading(true);
    setCepError("");

    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) {
        setCepError("CEP não encontrado.");
      } else {
        setFormData((prevState) => ({
          ...prevState,
          rua: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));
      }
    } catch (error) {
      setCepError("Erro ao buscar CEP.");
    } finally {
      setCepLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Endereço do Titular"
        subtitle={
          estrangeiro
            ? "Cliente estrangeiro: CEP, bairro e estado são opcionais."
            : undefined
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            label="CEP"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
            required={!estrangeiro}
            placeholder={estrangeiro ? "Opcional" : "Apenas números"}
          />
          {cepLoading && (
            <Loader2 className="absolute right-3 top-9 animate-spin text-blue-500 h-5 w-5" />
          )}
          {cepError && (
            <span className="text-xs text-red-500 block mt-1">{cepError}</span>
          )}
        </div>

        <div className="md:col-span-3">
          <Input
            label="Rua, Nº"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required={!estrangeiro}
          />
        </div>

        <Input
          label="Cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
        />
        <Input
          label="Estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required={!estrangeiro}
        />
      </div>
    </Card>
  );
}
