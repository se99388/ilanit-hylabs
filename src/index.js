import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components';

document.cookie = 'ofir=cookie-value';
document.cookie = 'adiel=oz; expires=Fri, 31 Dec 9999 23:59:59 GMT';

ReactDOM.render(<Root />, document.getElementById('root'));
