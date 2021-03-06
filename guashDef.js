/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'C++',
        name: 'cpp',
        mimeTypes: [],
        defaultToken: '',
        lineComment: '//',
        blockCommentStart: '/*',
        blockCommentEnd: '*/',
        autoClosingPairs: [['{', '}'], ['[', ']'], ['(', ')'], ['"', '"']],
        keywords: [
            'break',
            'case',
            'continue',
            'do',
            'else',
            'false',
            'float',
            'for',
            'function',
            'if',
            'in',
            'int',
            'long',
            'print',
            'println',
            'printf',
            'short',
            'sizeof',
            'struct',
            'switch',
            'true',
            'while',
            '(',
            ')',
            '[',
            ']'
        ],
        operators: [
            '=',
            '>',
            '<',
            '!',
            '~',
            '?',
            ':',
            '==',
            '<=',
            '>=',
            '!=',
            '&&',
            '||',
            '++',
            '--',
            '+',
            '-',
            '*',
            '/',
            '&',
            '|',
            '^',
            '%',
            '<<',
            '>>',
            '>>>',
            '+=',
            '-=',
            '*=',
            '/=',
            '&=',
            '|=',
            '^=',
            '%=',
            '<<=',
            '>>=',
            '>>>='
        ],
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
        floatsuffix: /[fFlL]?/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                [/[a-zA-Z_]\w*/, { cases: { '@keywords': { token: 'keyword.$0' }, '@default': 'identifier' } }],
                { include: '@whitespace' },
                [/\[\[.*\]\]/, 'annotation'],
                [/^\s*#\w+/, 'keyword'],
                [/[{}()\[\]]/, '@brackets'],
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, { cases: { '@operators': 'delimiter', '@default': '' } }],
                [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
                [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
                [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],
                [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],
                [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],
                [/\d[\d']*\d(@integersuffix)/, 'number'],
                [/\d(@integersuffix)/, 'number'],
                [/[;,.]/, 'delimiter'],
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/"/, 'string', '@string'],
                [/'[^\\']'/, 'string'],
                [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                [/'/, 'string.invalid']
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/\/\*\*(?!\/)/, 'comment.doc', '@doccomment'],
                [/\/\*/, 'comment', '@comment'],
                [/#.*$/, 'comment'],
            ],
            comment: [
                [/[^\/*]+/, 'comment'],
                [/\/\*/, 'comment.invalid'],
                [/\*\//, 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],
            //Identical copy of comment above, except for the addition of .doc
            doccomment: [
                [/[^\/*]+/, 'comment.doc'],
                [/\/\*/, 'comment.doc.invalid'],
                [/\*\//, 'comment.doc', '@pop'],
                [/[\/*]/, 'comment.doc']
            ],
            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],
        },
    };
});
