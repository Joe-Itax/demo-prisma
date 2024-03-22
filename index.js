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

//Get all cohortes
app.get("/cohorte", async (req, res) => {
  try {
    const cohortes = await cohorte.findMany({
      include: {
        apprenants: {
          select: {
            nom: true,
          },
        },
      },
    });
    res.send(cohortes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all session
app.get("/session", async (req, res) => {
  try {
    const sessions = await session.findMany();
    res.send(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post new ordi
app.post("/ordinateurs", async (req, res) => {
  try {
    const newOrdi = {
      tag: "ordi 003",
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

//Post new cohorte
app.post("/cohorte", async (req, res) => {
  try {
    const newCohorte = {
      code: 2,
      sessionId: 1,
      description: "Description du 1",
    };
    const addedCohorte = await cohorte.create({ data: newCohorte });
    return res.status(201).send(addedCohorte);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post new session
app.post("/session", async (req, res) => {
  try {
    const newSession = {
      annee: 2023,
      type: "Longue",
      ville: "Lubumbashi",
    };
    const addedSession = await session.create({ data: newSession });
    return res.status(201).send(addedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
