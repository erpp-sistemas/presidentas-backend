const c = require('../controllers/files.controllers');


const httpGetAllFiles = async (req, res) => {
  const files = await c.getAllFiles();
  res.status(200).json({ files });
}

const httpGetByIdFile = async (req, res) => {
  const id = req.params.id;
  const file = await c.getByIdFile(id);
  res.status(200).json({ file });
}

const httpNewFile = async (req, res) => {
  const data = req.body;
  const file = await c.newFile(data);
  res.status(201).json({ file });
}

const httpUpdateFile = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const file = await c.updateByIdFile(data, id);
  res.status(200).json({ file });
}

const httpDeleteFile = async (req, res) => {
  const id = req.params.id;
  const file = await c.deleteByIdFile (id);
  res.status(200).json({ Message: 'this event was delete success' });
}


const httpProxi = async (req, res) => {
  try {
    const url = req.body.url;
    const response = await c.proxi(url);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>90",response)
    // Verifica si la respuesta es válida
    if (!response || !response.data || !response.status === 200) {
      throw new Error(`Error fetching PDF: Invalid response`);
    }

    // Establece el tipo de contenido de la respuesta como PDF
    res.set('Content-Type', 'application/pdf');

    // Envía el contenido del archivo PDF como respuesta HTTP
    res.send(response);

  } catch (error) {
    // Maneja cualquier error que ocurra durante el proceso
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = {
  httpGetAllFiles ,
  httpGetByIdFile ,
  httpDeleteFile ,
  httpNewFile ,
  httpUpdateFile ,
  httpProxi
}