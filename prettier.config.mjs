/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions}
 */

const prettierConfig = {
    semi: true,
    tabWidth: 4,
    endOfLine: 'auto',
    singleQuote: true,
    arrowParens: 'always',
    trailingComma: 'none',
    plugins: ['prettier-plugin-tailwindcss']
};

export default prettierConfig;
