/** @type {import('@faustwp/core').FaustConfig} */

import { setConfig } from "@faustwp/core";
import templates from "@/wp-templates";
import possibleTypes from "@root/possibleTypes.json";

const faustConfig = {
    templates,
    plugins: [],
    possibleTypes,
    usePersistedQueries: true,
};

export default setConfig(faustConfig);