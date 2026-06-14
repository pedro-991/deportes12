import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ player = {}, errors = {} }) {
  const initial = {
    first_name: player.first_name || '',
    last_name: player.last_name || '',
    age: player.age || '',
    dni: player.dni || '',
    gender: player.gender || 'Male',
    number: player.number || '',
    observations: player.observations || '',
  };

  const { data, setData, post, processing } = useForm(initial);

  useEffect(() => {
    setData(initial);
  }, [player]);

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      const file = files[0] || null;
      setData(name, file);
    } else {
      setData(name, value);
    }
  }

  function submit(e) {
    e.preventDefault();
    setData('_method', 'PUT');

    post(route('admin.players.update', player.id), {
      onStart: () => console.log('Updating player', data),
      onSuccess: () => console.log('Update success'),
      onError: (errs) => console.log('Validation errors', errs),
      onFinish: () => console.log('Update finished'),
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title={`Editar: ${player.first_name || 'Jugador'}`} />

      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Editar Jugador</h2>
                <Link
                  href={route('admin.players.show', player.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Volver a la ficha →
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
                    href={route('admin.players.show', player.id)}
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