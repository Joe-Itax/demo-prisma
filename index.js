require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const { PrismaClient } = require("@prisma/client");

const { apprenant, ordinateur, cohorte, session } = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello");
});

//Get all desktops
app.get("/ordinateurs", async (req, res) => {
  try {
    const ordinateurs = await ordinateur.findMany();
    res.send(ordinateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all students
app.get("/apprenants", async (req, res) => {
  try {
    const apprenants = await apprenant.findMany();
    res.send(apprenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post new ordi
app.post("/ordinateurs", async (req, res) => {
  try {
    const newOrdi = {
      tag: "ordi 001",
      modele: "i mac",
      fabriquant: "apple",
    };
    const addedOrdi = await ordinateur.create({ data: newOrdi });
    return res.status(201).send(addedOrdi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post new student
app.post("/apprenants", async (req, res) => {
  try {
    //const apprenants = await apprenant.findMany();
    //res.status(201).send(apprenants);
    const newStudent = {
      prenom: "Prenom",
      nom: "nom",
      postnom: "postnom",
      date_naissance: new Date(),
      adresse: "adresse blabla",
      email: "nom@gmail.com",
      telephone: "0810191650",
      ordinateurId: 1,
      cohorteId: 1,
    };
    const addedStudent = await apprenant.create({ data: newStudent });
    return res.status(201).send(addedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
