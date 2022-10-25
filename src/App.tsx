import React, { useEffect, useState } from 'react';
import './App.css';
import { transportService } from './service';
import { ITransport } from './types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { SearchInput } from './components';
import { useDebounce } from './hook'

function App() {
  const [transport, setTransport] = useState<ITransport[]>([])
  const [search, setSearch] = useState<string>('')
  const debouncedValue = useDebounce<string>(search, 500)

  useEffect(() => {
    transportService.getAll().then(d => setTransport([...d]))
  }, [])

  const columns: TableColumn<ITransport>[] = [
    { name: "Id", selector: row => row.id },
    { name: "Номер машины", selector: row => row.transport_plates },
    { name: "Страна", selector: row => row.Country },
    { name: "Модель транспорта", selector: row => row.transport_model },
    { name: "Производитель", selector: row => row.transport_brand },
  ];

  return (
    <div className="App">
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 1000, alignItems: 'center', margin: 10}}>
          <SearchInput
            style={{ width: 400 }}
            placeholder='Введите номер машины'
            value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} 
          />
          <DataTable
            columns={columns}
            data={transport.filter(t => debouncedValue ? t.transport_plates.toLowerCase().indexOf(debouncedValue) > -1 : 1 == 1)} />
        </div>
      </div>
    </div>
  );
}

export default App;
