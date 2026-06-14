import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ team = {}, sports = [], tournaments = [], errors = {} }) {
  const initial = {
    name: team.name || '',
    alias: team.alias || '',
    type: team.type || '',
    color: team.color || '',
    sport_id: team.sport_id ?? '',
    tournament_id: team.tournament_id ?? '',
    logo: null,
  };

  const { data, setData, post, processing } = useForm(initial);
  const [preview, setPreview] = useState(team.logo_url || null);

  useEffect(() => {
    setPreview(team.logo_url || null);
  }, [team.logo_url]);

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      const file = files[0] || null;
      setData(name, file);
      setPreview(file ? URL.createObjectURL(file) : team.logo_url || null);
    } else {
      setData(name, value);
    }
  }

  function submit(e) {
    e.preventDefault();
    // spoof method so Laravel accepts multipart/form-data as PUT
    setData('_method', 'PUT');

    post(route('admin.teams.update', team.id), {
      forceFormData: true,
      onStart: () => console.log('Updating team', data),
      onSuccess: () => console.log('Update success'),
      onError: (errs) => console.log('Validation errors', errs),
      onFinish: () => console.log('Update finished'),
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title={`Editar: ${team.name || 'Equipo'}`} />

      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Editar Equipo</h2>
                <Link
                  href={route('admin.teams.index')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Volver a la lista →
                </Link>
              </div>

              <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Alias</label>
                  <input
                    name="alias"
                    value={data.alias}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Apodo o nombre corto"
                  />
                  {errors.alias && <p className="text-red-600 text-sm mt-1">{errors.alias}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deporte</label>
                    <select
                      name="sport_id"
                      value={data.sport_id}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="">Seleccionar deporte</option>
                      {sports.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.sport_id && <p className="text-red-600 text-sm mt-1">{errors.sport_id}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Torneo (opcional)</label>
                    <select
                      name="tournament_id"
                      value={data.tournament_id}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="">Ninguno</option>
                      {tournaments.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    {errors.tournament_id && (
                      <p className="text-red-600 text-sm mt-1">{errors.tournament_id}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                      name="type"
                      value={data.type}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color (opcional)</label>
                    <input
                      name="color"
                      value={data.color}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="Ej. red, #ff0000"
                    />
                    {errors.color && <p className="text-red-600 text-sm mt-1">{errors.color}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo (opcional)</label>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-700"
                  />
                  {preview && (
                    <img src={preview} alt="preview" className="mt-2 h-20 w-20 object-cover rounded-md" />
                  )}
                  {errors.logo && <p className="text-red-600 text-sm mt-1">{errors.logo}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                  >
                    Guardar Cambios
                  </button>
                  <Link
                    href={route('admin.teams.show', team.id)}
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