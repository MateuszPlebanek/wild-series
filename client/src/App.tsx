import "./App.css";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <h1 className="logo">JS Monorepo</h1>
      </header>

      <nav className="navbar">
        <ul>
          <li>
            <Link to="/programs">Séries</Link> {/* ✅ Garde uniquement le lien vers /programs */}
          </li>
          <li>
            <a
              href="https://github.com/WildCodeSchool/create-js-monorepo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>

      <main className="text-box">
        <Outlet /> {/* 📌 Permet d'afficher les routes enfants définies dans `main.tsx` */}
      </main>

      <footer>
        Développé par la&nbsp;
        <a
          href="https://www.wildcodeschool.com/"
          className="wcs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wild Code School
        </a>
      </footer>
    </>
  );
}

export default App;
