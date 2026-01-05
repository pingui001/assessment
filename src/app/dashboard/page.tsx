'use client';

import { useCharactersDashboard } from '@/hooks/useCharactersDashboard';
import NavigationButton from '@/components/NavigationButton'

export default function DashboardPage() {
  const {
    filteredCharacters,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    stats,
    totalVisible,
  } = useCharactersDashboard();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary"></div>
        <span className="ms-3">Cargando personajes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard de Personajes</h1>

      {/* Statistics */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h6>Total</h6>
            <p className="fw-bold">{stats.total}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h6>Alive</h6>
            <p className="fw-bold text-success">{stats.alive}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h6>Dead</h6>
            <p className="fw-bold text-danger">{stats.dead}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h6>Unknown</h6>
            <p className="fw-bold text-warning">{stats.unknown}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar personaje..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-center">
            <span className="text-muted">
              Total visibles: {totalVisible}
            </span>
          </div >
        </div>
      </div>
      <div className="container-fluid p-4">
  <NavigationButton destination="/home" label="Ir a Home" /></div>

      {/* list of characters */}
      <div className="px-5 py-10 mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCharacters.map((character) => (
          <div key={character.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={character.image}
                alt={character.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">
                  <span
                    className={`badge ${
                      character.status === 'Alive'
                        ? 'bg-success'
                        : character.status === 'Dead'
                        ? 'bg-danger'
                        : 'bg-secondary'
                    }`}
                  >
                    {character.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Especie: {character.species}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="alert alert-info mt-4">
          No se encontraron resultados.
        </div>
      )}
    </div>
  );
}