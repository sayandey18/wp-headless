/** @type {import('@faustwp/core').FaustConfig} */

import { setConfig } from '@faustwp/core';
import templates from '@/wp-templates';
import possibleTypes from '@root/possibleTypes.json';
import { RelayStylePagination } from '@/plugins/RelayStylePagination';

const faustConfig = {
    templates,
    plugins: [new RelayStylePagination()],
    possibleTypes,
    usePersistedQueries: true,
};

export default setConfig(faustConfig);