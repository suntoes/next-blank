import { promises as fs } from 'fs'
import path from 'path'

const banned: string[] = []
const pathsToCrawl: { flag: string; path: string }[] = []

const flags = [
    '-p', // pascalCase default
    '-c', // camelCase default
    '-n', // * for named export
    '--script', // for script importing
]

let currentFlag = ''

for (const argv of process.argv || []) {
    switch (true) {
        case flags.includes(argv):
            currentFlag = argv
            break
        case argv === '-b':
            currentFlag = argv
            break
        case currentFlag === '-b':
            banned.push(argv)
            break
        case !!currentFlag:
            pathsToCrawl.push({ flag: currentFlag, path: argv })
            break
        default:
            currentFlag = ''
    }
}

pathsToCrawl.forEach(async ({ flag, path }) => {
    crawl(path, flag)
})

async function crawlExports(dir: string, names: string[], absolutePath: string, mode: string) {
    const absoluteDir: string = `${absolutePath}${(names.length ? '/' : '') + names.join('/')}`

    try {
        const indexPath = path.join(dir, 'index.ts')
        // Read the list of files and subdirectories in the current directory
        const items = await fs.readdir(dir)

        const namedCaseFileException = (val: string) => (mode === '-n' ? !val.endsWith('css') : false)

        // Filter out both .tsx and .ts files
        const validFiles = items.filter(
            (file: string) =>
                (file.endsWith('.tsx') || file.endsWith('.ts') || namedCaseFileException(file)) && file !== 'index.ts',
            // (file: string) => (file.endsWith('.tsx') || file.endsWith('.ts')) && file !== 'index.ts',
        )

        // Check if not just dirs
        const hasTsFile = validFiles.some((file) => file.endsWith('tsx') || file.endsWith('ts'))

        // Generate import statements for each subdirectory
        const importStatements = validFiles.map((file: string) => getStatement(mode, file, absoluteDir))

        // Write the import statements to the index.ts file
        if (validFiles.length && hasTsFile) await fs.writeFile(indexPath, importStatements.join('\n') + '\n', 'utf8')
        else
            items.forEach((file: string) => {
                if (file === 'index.ts') fs.unlink(path.join(dir, file))
            })

        console.log(`${absoluteDir} ${mode} crawled!`)
    } catch (error) {
        console.error(`Error updating ${absoluteDir}/index.ts:`, error)
    }
}

async function crawlDir(dir: string, names: string[], absolutePath: string, mode: string) {
    const isLiterallyComponentsDir = absolutePath === 'components' && !names.length
    // Crawl through subdirectories recursively
    const items = await fs.readdir(dir)

    if (banned.includes(`${absolutePath}${(names.length ? '/' : '') + names.join('/')}`))
        return items.forEach((file: string) => {
            if (file === 'index.ts') fs.unlink(path.join(dir, file))
        })

    // Crawl through the top-level "components" directory
    if (!isLiterallyComponentsDir) crawlExports(dir, names, absolutePath, mode)

    for (const item of items) {
        const subpath = path.join(dir, item)
        const stat = await fs.stat(subpath)
        if (stat.isDirectory() && mode === '-n') {
            await crawlDir(subpath, [...names, item], absolutePath, mode)
        }
    }
}

async function crawl(absolutePath: string, mode: string) {
    const dir = path.join(__dirname, `../${absolutePath}`)
    await crawlDir(dir, [], absolutePath, mode) // Ensure await here
}

function kebabToPascal(str: string) {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
}

function kebabToCamel(kebabCaseString: string) {
    const camelCaseString = kebabCaseString.replace(/-([a-z])/g, function (match, letter) {
        return letter.toUpperCase()
    })

    return camelCaseString.charAt(0).toLowerCase() + camelCaseString.slice(1)
}

function getStatement(mode: string, file: string, absoluteDir: string) {
    const fromPath = `${absoluteDir}/${file.replace(/\.(tsx|ts)$/, '')}`

    switch (mode) {
        case '--script':
            return `import '${fromPath}'`
        default: {
            // -p for PascalCase conversion and by default is camelCase
            const itemCase = mode === '-p' ? kebabToPascal : kebabToCamel
            const conversion = (val: string) => (mode === '-n' ? '*' : `{ default as ${itemCase(val)} }`)
            return `export ${conversion(file.replace(/\.(tsx|ts)$/, ''))} from '${fromPath}'`
        }
    }
}
