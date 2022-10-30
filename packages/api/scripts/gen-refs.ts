import * as fs from 'fs'
import * as path from 'path'

const getFiles = async (dir: string): Promise<string[]> => {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map(async dirent => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : [res]
  }))
  return files.flat()
}

const main = async () => {
  const files = await getFiles(path.join(__dirname, '..', 'src', 'schemas'))

  const schemaNames = await Promise.all(files.map(async o => {
    const content = await fs.promises.readFile(o, 'utf-8')
    const schemaNames: string[] = []
    const regex = /export\s+const\s+(\w+)\s?(=|:).+OpenAPIV3\.SchemaObject/gm
    let match = regex.exec(content)
    while (match != null) {
      schemaNames.push(match[1])
      match = regex.exec(content)
    }
    return schemaNames
  }))

  const schemas = schemaNames.flat().sort().reduce((p, c) => ({
    ...p,
    [c]: `#/components/schemas/${c}`
  }), {})

  fs.promises.writeFile(path.join(__dirname, '..', 'src', 'res', 'openapi-refs.json'), JSON.stringify(schemas, null, 2))
}
main()
