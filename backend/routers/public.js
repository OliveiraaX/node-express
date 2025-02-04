import { PrismaClient } from "@prisma/client"; // IMPORTAR PRISMA CLIENT
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import frontend from "../../frontend/index.js";

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// CADASTRO

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userdb = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });
    res.status(201).json(userdb);
  } catch (err) {
    res.status(500).json({ message: "Ocorreu algo inesperado" });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  // Corrigir a ordem dos parâmetros aqui
  try {
    const userInfo = req.body;

    // BUSCAR USUARIO NO BANCO
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    // VERIFICAR SE O USUARIO EXISTE
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    // COMPARAR SENHA
    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    // VERIFICAR SE A SENHA É VALIDA
    if (!isMatch) {
      return res.status(400).json({ message: "Senha invalida" });
    }

    // GERAR TOKEN JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Algo inesperado aconteceu" });
  }
});

export default router;
