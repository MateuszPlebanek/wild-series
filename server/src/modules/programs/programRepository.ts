import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async readAll() {
    // Execute la requête SQL pour récupérer toutes les séries
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM Program");
    return rows as Program[];
  }
}

export default new ProgramRepository();
