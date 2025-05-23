import axios from "axios";

export default async function handler(req, res) {
  // Mantendo GET para facilitar testes sem body
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Chamada à API Nitro com token e hashes fixos
    const response = await axios.post(
      "https://api.nitropagamentos.com/api/public/v1/transactions?api_token=sUUcluHNoLW4996zpe3fLehjchHgp1nD5miC67Pr77xCec9P2OOXvnma3WxH",
      {
        amount: 6400,
        offer_hash: "ER8wKwquMC",    // Hash da oferta cadastrada
        payment_method: "pix",
        customer: {
          name: "Confirma Exame",
          email: "cliente@pix.com",
          phone_number: "11999999999",
          document: "07412039440",
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
            product_hash: "7xka0xgzt8",  // Hash do produto cadastrado
            title: "Realização de Exame",
            price: 6400,
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
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const { qr_code_url, qr_code_base64 } = response.data.data.pix;
    return res.status(200).json({ qr_code_url, qr_code_base64 });

  } catch (error) {
    // Log completo do erro no console
    const nitroError = error.response?.data  { message: error.message };
    console.error("Erro Nitro completo:", nitroError);

    // Retorna o erro completo no response para debugging
    return res
      .status(error.response?.status  500)
      .json({
        error: "Falha ao gerar PIX",
        details: nitroError
      });
  }
}
