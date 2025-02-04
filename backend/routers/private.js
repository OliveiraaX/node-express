import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/listar", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      omit: { password: true, email: true, id: true },
    });

    res.status(200).json({ message: "Usuários listados com sucesso", users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ocorreu algo inesperado.." });
  }
});
export default router;
