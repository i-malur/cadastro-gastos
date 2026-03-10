let gastos = [];

export default function handler(req, res) {

  if (req.method === "POST") {

    const gasto = req.body;

    gastos.push(gasto);

    res.status(200).json({
      message: "Gasto registrado!",
      gasto
    });

  }

  else if (req.method === "GET") {

    res.status(200).json(gastos);

  }

  else {

    res.status(405).json({
      message: "Método não permitido"
    });

  }

}