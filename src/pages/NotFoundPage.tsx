import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="section">
      <div className="section__inner">
        <h1 className="section__title">Página não encontrada</h1>
        <p className="page-note">O endereço que você abriu não existe ou foi movido.</p>
        <Link to="/" className="btn btn--primary">Voltar ao início</Link>
      </div>
    </main>
  );
}
