import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ sports = [], errors = {} }) {
  const { data, setData, post, processing } = useForm({
    name: '',
    sport_id: '',
    date_init: '',
    date_end: '',
    status: 0,
    type: '',
    priority: 0,
    logo: null,
  });

  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      const file = files[0] || null;
      setData(name, file);
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setData(name, value);
    }
  }

  function submit(e) {
    e.preventDefault();
    console.log('Submitting tournament form', data);

    post('/admin/tournaments', {
      forceFormData: true,
      onStart: () => console.log('Request started'),
      onSuccess: (page) => console.log('Success:', page),
      onError: (errors) => console.log('Validation errors:', errors),
      onFinish: () => console.log('Request finished'),
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title="Crear Torneo" />

      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Crear Torneo</h2>
                <Link
                  href={route('admin.tournaments.index')}
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
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                      name="type"
                      value={data.type}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="">Seleccionar tipo</option>
                      
                        <option key="Male" value="Male">
                          Masculino
                        </option>

                        <option key="Female" value="Female">
                          Femenino
                        </option>
                      
                    </select>
                    {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha inicio</label>
                    <input
                      type="date"
                      name="date_init"
                      value={data.date_init}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.date_init && <p className="text-red-600 text-sm mt-1">{errors.date_init}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha fin</label>
                    <input
                      type="date"
                      name="date_end"
                      value={data.date_end}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.date_end && <p className="text-red-600 text-sm mt-1">{errors.date_end}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                      name="status"
                      value={data.status}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                      <option value={0}>En Proceso</option>
                      <option value={1}>Finalizado</option>
                      <option value={2}>Eliminado</option>
                    </select>
                    {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                    <input
                      type="number"
                      name="priority"
                      value={data.priority}
                      onChange={handleChange}
                      min="0"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.priority && <p className="text-red-600 text-sm mt-1">{errors.priority}</p>}
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
                    Crear Torneo
                  </button>
                  <Link
                    href={route('admin.tournaments.index')}
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