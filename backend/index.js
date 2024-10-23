const express = require("express");
const app = express();
const cors = require("cors");
const admin = require('firebase-admin');

// Inicializa Firebase fuera de las rutas
const serviceAccount = require("./key.json"); // Reemplaza con la ruta a tu archivo de clave de servicio
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://questnetwork-3c8b6.firebaseio.com" // Reemplaza con tu URL de base de datos
});

const db = admin.firestore();

// Ruta de prueba
app.get("/ping", async (req, res) => {
  try {
    console.log("Attempting to fetch test-user document from Firestore...");
    const docRef = db.collection('users').doc('test-user');
    const doc = await docRef.get();

    if (doc.exists) {
      console.log("Document data:", doc.data());
      return res.status(200).send("Conexión a Firebase exitosa!");
    } else {
      console.log("No such document!");
      return res.status(404).send("Usuario de prueba no encontrado");
    }
  } catch (error) {
    console.error("Error al conectar a Firebase:", error);
    return res.status(500).send("Error al conectar a Firebase");
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));