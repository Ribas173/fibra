import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end("Método não permitido");
  }

  try {
    const response = await axios.post(
      "https://api.nitropagamentos.com/api/public/v1/transactions?api_token=NXwr9Rgp2qPVbKCTfXbwXqwJWAZYy1j0cuSpCfKX4rZRIRArXDFeacerIcfF",
      {
        amount: 15000,
        offer_hash: "zixg3dvc2g",
        payment_method: "pix",
        customer: {
          name: "Cliente",
          email: "cliente@pix.com",
          phone_number: "11999999999",
          document: "12345678901",
          street_name: "Rua Teste",
          number: "123",
          complement: "",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
          zip_code: "01001000"
        },
        cart: [
          {
            product_hash: "rrlubqg0wt",
            title: "Confirmação de Exame",
            price: 15000,
            quantity: 1,
            operation_type: 1,
            tangible: false
          }
        ],
        installments: 1,
        expire_in_days: 1
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    const { qr_code_url, qr_code_base64 } = response.data.data.pix;
    res.status(200).json({ qr_code_url, qr_code_base64 });

  } catch (error) {
    console.error("Erro Nitro:", error.response?.data || error.message);
    res.status(500).json({ error: "Falha ao gerar Pix" });
  }
}
