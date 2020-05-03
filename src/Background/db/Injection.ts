export interface Injection {
    name: string,
    rx: string,
    assets: string[],
    css: string,
    js: string
}

/*

var injection = {
    name: 'stackoverflow',
    rx: 'https?:\/\/[www.]?stackoverflow.com',
    assets: ['sample-script-inline'],
    css: 'h1 a.question-hyperlink { color: white !important; } h1 { background-color: blue; }',
    js: 'console.log("js from injection!");'
}

*/