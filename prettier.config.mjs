/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const prettierConfig = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: "none",
    plugins: ['prettier-plugin-tailwindcss']
};

export default prettierConfig;