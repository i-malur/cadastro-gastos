let gastos = []; 

export default function handler(req, res) {
  if (req.method === "POST") {

    let body = [];
    req.on("data", chunk => body.push(chunk));
    req.on("end", () => {
      const parsed = new URLSearchParams(Buffer.concat(body).toString());
      gastos.push(Object.fromEntries(parsed.entries()));
      res.status(200).json({ message: "Gasto registrado!" });
    });
  } else if (req.method === "GET") {
    res.status(200).json(gastos);
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}