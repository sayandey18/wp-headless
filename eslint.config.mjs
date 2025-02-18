/** @type {import('eslint').Linter.Config[]} */

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended
});

const eslintConfig = [
    ...compat.config({
        extends: [
            'eslint:recommended',
            'next/core-web-vitals',
            'prettier',
        ],
        settings: {
            next: {
                rootDir: ['./src/']
            }
        },
        plugins: ['@next/next', 'unused-imports'],
        rules: {
            semi: 'warn',
            curly: 'warn',
            'no-unused-vars': 'warn',
            'unused-imports/no-unused-imports': 'warn',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_'
                }
            ]
        }
    }),
    {
        ignores: ['**/node_modules/', '**/.next/', '**/.faust/', '**/public/']
    }
];

export default eslintConfig;
