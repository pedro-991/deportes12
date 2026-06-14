import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TournamentsIndex({ tournaments }) {
    return (
        <AuthenticatedLayout
           /*  header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Torneos
                </h2>
            } */
        >
            
            <Head title="Torneos" />
            
         

            <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                             <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Torneos</h2>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route('admin.tournaments.create')}
                                            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                                        >
                                            Nuevo Torneo
                                        </Link>
                                        <Link
                                            href={route('admin.tournaments.index')}
                                            className="text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            Refrescar
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        </div>
                        </div>
                    


{/* <div className="py-12"> */}
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
 <div className="bg-white shadow rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                               
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Estado
                                    </label>
                                    <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                        <option value="">Todos</option>
                                        <option value="0">En Proceso</option>
                                        <option value="1">Finalizados</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Deporte
                                    </label>
                                    <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                        <option value="">Todos</option>
                                        <option value="1">Fútbol</option>
                                        <option value="2">Basquetbol</option>
                                        <option value="3">Voleibol</option>
                                        <option value="4">Futsal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Buscar
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del torneo..."
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                </div>
            </div>
            
            {/* Tabla de torneos */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Torneo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deporte
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fechas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Equipos
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tournaments.data.map((tournament) => (
                                <tr key={tournament.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {tournament.logo && (
                                                <img
                                                    src={`/storage/${tournament.logo}`}
                                                    alt={tournament.name}
                                                    className="h-10 w-10 rounded-full mr-3"
                                                />
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {tournament.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {tournament.organization?.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {tournament.sport?.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(tournament.date_init).toLocaleDateString()} - {new Date(tournament.date_end).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {tournament.teams_count || 0} equipos
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            tournament.status === 0 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : tournament.status === 1 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {tournament.status === 0 
                                                ? 'En Proceso' 
                                                : tournament.status === 1 
                                                ? 'Finalizado'
                                                : 'Eliminado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route('admin.tournaments.show', tournament.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Ver detalles"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                            <Link
                                                href={route('admin.tournaments.edit', tournament.id)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Editar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginación */}
                {tournaments.links && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">{tournaments.from}</span> a <span className="font-medium">{tournaments.to}</span> de <span className="font-medium">{tournaments.total}</span> resultados
                            </div>
                            <div className="flex space-x-2">
                                {tournaments.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Total Torneos
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {tournaments.total}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        En Proceso
                    </h3>
                    <p className="text-3xl font-bold text-yellow-600">
                        {tournaments.data.filter(t => t.status === 0).length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Finalizados
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                        {tournaments.data.filter(t => t.status === 1).length}
                    </p>
                </div>
            </div>


                </div> {/* max-w-7xl mx-auto sm:px-6 lg:px-8 */}
            {/* </div> */} {/* py-12 */}
            
            {/* Filtros */}
           
        </AuthenticatedLayout>
    );
}