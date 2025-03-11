/** @type {import('@faustwp/core').FaustConfig} */

import { default as templates } from '@/wp-templates';
import possibleTypes from '@root/possibleTypes.json';
import { setConfig } from '@faustwp/core';
import { RelayStylePagination } from '@/plugins/RelayStylePagination';

const faustConfig = {
    templates,
    possibleTypes,
    plugins: [new RelayStylePagination()],
    usePersistedQueries: true
};

export default setConfig(faustConfig);
