import React from 'react';
import { totalTrim } from './util/string';

function App() {
    return (
        <div className="App">
            {totalTrim('  adsa   asdf sdg    asdf dsgdf agfdhfds h         adsafdsaf')}
        </div>
    );
}

export default App;
