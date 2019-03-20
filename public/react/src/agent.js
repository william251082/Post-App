import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'http://localhost:8000/api';

export const requests = {
    get: (url) =>
        superagent.get(`${API_ROOT}${url}`)
};

