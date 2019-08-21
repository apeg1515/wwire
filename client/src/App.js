import React from 'react';
import axios from 'axios';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid-addons';

const Loading = () => (
    <div style={{ fontSize: 20, color: 'blue', padding: 50 }}>...Loading</div>
);

function App() {
    const [ data, setData ] = React.useState(null); const [ err, setErr ] = React.useState(false);
    const [filters, setFilters] = React.useState({});

    React.useEffect(() => {
        let cancelled = false;

        async function getData() {
            if(!cancelled) {
                try {
                    const grid = await axios.get('http://localhost:5000');
                    if(grid) {
                        const { master }  = grid.data;
                        console.log('grid', master);

                        setData(master);
                    }
                } catch(error) {
                    console.log(error);
                    setErr(true);
                }
            }
        }
        getData();
        return () => {
            cancelled = true;
        };
    }, []);

    const defaultColumnProperties = {
        filterable: true,
        width: 220
    };
    const selectors = Data.Selectors;
    const columnsIdentifiers = [
        { key: 'uuid', name: 'UniqueID' },
        { key: 'lineNumber', name: 'Line' },
        { key: 'date', name: 'Date' },
        { key: 'time', name: 'Time' },
        { key: 'ipAddress', name: 'IP' },
        { key: 'urlRoute', name: 'UrlRoute' },
        { key: 'method', name: 'Method' },
        { key: 'text', name: 'Text' },
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    const handleFilterChange = filter => filters => {
        const newFilters = { ...filters };
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        return newFilters;
    };

    const getRows = (rows, filters) => {
        console.log('DataRow', selectors.getRows({ rows, filters }))
        return selectors.getRows({ rows, filters });
    };

    if(data === null) {
        return <Loading />;
    } else if(err) {
        return (
            <div>
                <h1> There was an Error that occured.</h1>
                <pre style={{ padding: 20, width: 500 }}>{JSON.stringify(err)}</pre>
            </div>
        )

    } else {
        const filteredRows = getRows(data, filters);
        return (
            <div style={{ margin: 'auto', overFlow: 'auto', maxWidth: 1000, paddingTop: 25 }}>
                <ReactDataGrid
                    columns={columnsIdentifiers}
                    rowGetter={i => filteredRows[i]}
                    rowsCount={data.length +1}
                    rowHeight={40}
                    minHeight={550}
                    onRowClick={i => {
                        alert(
                            `uuid: ${filteredRows[i].uuid} ,
                             lineNumber: ${filteredRows[i].lineNumber},
                             date: ${filteredRows[i].date} ,
                             time: ${filteredRows[i].time},
                             ipAddress: ${filteredRows[i].ipAddress},
                             urlRoute: ${filteredRows[i].urlRoute},
                             method: ${filteredRows[i].method},
                             text: ${filteredRows[i].text} `
                        );
                    }}
                    toolbar={<Toolbar enableFilter={true} />}
                    onAddFilter={filter => setFilters(handleFilterChange(filter))}
                    onClearFilters={() => setFilters({})}
                />
            </div>
        )
    }
}

export default App;
