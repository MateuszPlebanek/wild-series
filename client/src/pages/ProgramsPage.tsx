import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState<string | null>(null); // ✅ Gestion des erreurs

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPrograms(data))
      .catch((error) => setError(error.message)); // ✅ Capture l'erreur
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>Erreur : {error}</p>; // ✅ Affiche l'erreur si échec
  }

  return (
    <div>
      <h1>Liste des Séries 📺</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <h2>
              {program.title} ({program.year})
            </h2>
            <img src={program.poster} alt={program.title} width="200px" />
            <p>
              <strong>Pays :</strong> {program.country}
            </p>
            <p>{program.synopsis}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramsPage;
