const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

app.get('/Mobile/ProductBranchOffice/GetProductByBalance', (req, res) => {
  const { IdBranchOffice, BarCode } = req.query;

  fs.readFile('productos.json', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON', err);
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }

    const productos = JSON.parse(data);

    const productoEncontrado = productos.find(producto => producto.barCode === BarCode/*&& producto.productPacking.idBranchOffice === Number(IdBranchOffice)*/);

    if (!productoEncontrado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoEncontrado);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
