import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ teams = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    age: '',
    dni: '',
    gender: 'Male',
    number: '',
    observations: '',
    team_id: null,
  });

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const filtered = useMemo(() => {
    if (!query) return teams ?? [];
    const q = query.toLowerCase();
    return (teams ?? []).filter(t =>
      (t.name || '').toLowerCase().includes(q) ||
      (t.city || '').toLowerCase().includes(q)
    );
  }, [teams, query]);

  useEffect(() => {
    function onClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const selected = (teams || []).find(t => t.id === data.team_id) ?? null;

  function choose(team) {
    setData('team_id', team.id);
    setQuery(team.name);
    setOpen(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData(name, value);
  }

  function submit(e) {
    e.preventDefault();
    post(route('admin.players.store'), {
      onSuccess: () => Inertia.visit(route('admin.players.index')),
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title="Crear Jugador" />

      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Crear Jugador</h2>
                <Link
                  href={route('admin.players.index')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Volver a la lista →
                </Link>
              </div>

              <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      name="first_name"
                      value={data.first_name}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.first_name && <p className="text-red-600 text-sm mt-1">{errors.first_name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                      name="last_name"
                      value={data.last_name}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.last_name && <p className="text-red-600 text-sm mt-1">{errors.last_name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Edad</label>
                    <input
                      type="number"
                      name="age"
                      value={data.age}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Número</label>
                    <input
                      type="number"
                      name="number"
                      value={data.number}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.number && <p className="text-red-600 text-sm mt-1">{errors.number}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">DNI</label>
                    <input
                      name="dni"
                      value={data.dni}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.dni && <p className="text-red-600 text-sm mt-1">{errors.dni}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Género</label>
                    <select
                      name="gender"
                      value={data.gender}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                    <textarea
                      name="observations"
                      value={data.observations}
                      onChange={handleChange}
                      rows="4"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.observations && <p className="text-red-600 text-sm mt-1">{errors.observations}</p>}
                  </div>

                  <div className="md:col-span-2" ref={containerRef}>
                    <label className="block text-sm font-medium text-gray-700">Equipo</label>
                    <div className="mt-1 relative">
                      <input
                        type="text"
                        value={query}
                        onFocus={() => setOpen(true)}
                        onChange={e => { setQuery(e.target.value); setOpen(true); }}
                        placeholder="Buscar equipo..."
                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
                        aria-autocomplete="list"
                      />
                      <input type="hidden" name="team_id" value={data.team_id ?? ''} />
                      {open && (
                        <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                          {filtered.length === 0 ? (
                            <div className="p-3 text-sm text-gray-500">No se encontraron equipos</div>
                          ) : (
                            filtered.map(t => (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => choose(t)}
                                className="w-full text-left px-4 py-2 hover:bg-indigo-50"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-medium text-gray-800">{t.name}</div>
                                    {t.city && <div className="text-xs text-gray-500">{t.city}</div>}
                                  </div>
                                  {selected && selected.id === t.id && (
                                    <div className="text-xs text-indigo-600">Seleccionado</div>
                                  )}
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    {errors.team_id && <p className="text-sm text-red-600 mt-1">{errors.team_id}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                  >
                    Crear Jugador
                  </button>
                  <Link
                    href={route('admin.players.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}