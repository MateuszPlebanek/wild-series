import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

// BROWSE - Lire toutes les catégories
const browse: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryRepository.readAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// READ - Lire une seule catégorie par ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const category = await categoryRepository.read(Number(req.params.id));
    category ? res.json(category) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

// ADD - Ajouter une nouvelle catégorie
const add: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;

    const insertId = await categoryRepository.create({ name });
    res.status(201).json({ id: insertId, name });
  } catch (err) {
    next(err);
  }
};

// EDIT - Modifier une catégorie existante
const edit: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;

    const affectedRows = await categoryRepository.update({
      id: Number(req.params.id),
      name,
    });

    affectedRows ? res.sendStatus(204) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

// DESTROY - Supprimer une catégorie
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const affectedRows = await categoryRepository.delete(Number(req.params.id));

    affectedRows ? res.sendStatus(204) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

// VALIDATE - Middleware pour valider les données de la catégorie
const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];
  const { name } = req.body;

  if (!name) {
    errors.push({ field: "name", message: "Le nom est obligatoire." });
  } else if (name.length > 255) {
    errors.push({
      field: "name",
      message: "Le nom ne doit pas dépasser 255 caractères.",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

export default { browse, read, add, edit, destroy, validate };
