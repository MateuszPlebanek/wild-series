// Some data to make the trick
import type { RequestHandler } from "express";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    let programs = await programRepository.readAll();

    if (req.query.q) {
      const searchTerm = (req.query.q as string).toLowerCase();
      programs = programs.filter((program) =>
        program.synopsis.toLowerCase().includes(searchTerm),
      );
    }

    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const program = await programRepository.read(Number(req.params.id));
    program ? res.json(program) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

// Add - Ajouter un nouveua program
const add: RequestHandler = async (req, res, next) => {
  try {
    const { title, synopsis, poster, country, year, category_id } = req.body;

    if (!title || !synopsis || !poster || !country || !year || !category_id) {
      res.status(400).json({ error: "Tous les champs sont obligatoires." });
      return;
    }

    const id = await programRepository.create({
      title,
      synopsis,
      poster,
      country,
      year,
      category_id,
    });
    res
      .status(201)
      .json({ id, title, synopsis, poster, country, year, category_id });
  } catch (err) {
    next(err);
  }
};

//Edit - Modifier un program existant
const edit: RequestHandler = async (req, res, next) => {
  try {
    const { title, synopsis, poster, country, year, category_id } = req.body;

    if (!title || !synopsis || !poster || !country || !year || !category_id) {
      res.status(400).json({ error: "Tous les champs sont obligatoires." });
      return;
    }

    const affectedRows = await programRepository.update({
      id: Number(req.params.id),
      title,
      synopsis,
      poster,
      country,
      year,
      category_id,
    });

    affectedRows ? res.sendStatus(204) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

//Destroy - Supprimer un program
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const affectedRows = await programRepository.delete(Number(req.params.id));
    affectedRows ? res.sendStatus(204) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};
// Export it to import it somewhere else
// Commentaire ajouté pour forcer une différence
export default { browse, read, add, edit, destroy };
