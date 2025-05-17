/** @type {import('@faustwp/core').FaustConfig} */

import { default as templates } from '@/wp-templates';
import possibleTypes from '@root/possibleTypes.json';
import { setConfig } from '@faustwp/core';

const faustConfig = {
    templates,
    possibleTypes,
    usePersistedQueries: true
};

export default setConfig(faustConfig);
