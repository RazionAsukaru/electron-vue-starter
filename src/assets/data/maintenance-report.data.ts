import { app } from '@electron/remote'
import fs from 'fs'
import pathModule from 'path'

const filePath = pathModule
  .join(app.getAppPath(), 'maintenance-report.json')
  .replace('app.asar', '')

const init = () => {
  if (fs.existsSync(filePath)) return
  try {
    fs.writeFileSync(filePath, JSON.stringify([]))
  } catch (e) {
    console.error('Failed to create json file')
  }
}

const find = () => {
  const rawdata: any = fs.readFileSync(filePath)
  return JSON.parse(rawdata)
}

const create = (item: any) => {
  const existedData = find()
  item.id = existedData.length ? +existedData[existedData.length - 1].id + 1 : 0

  fs.writeFileSync(filePath, JSON.stringify([...existedData, item]))
}

const findOne = (filters: any) => {
  let attrfilters: any = []
  for (const property in filters) {
    attrfilters.push({ attr: property, value: filters[property] })
  }

  const existedData = find()
  const idx = existedData.findIndex((data: any) => {
    let result = true
    attrfilters.forEach(({ attr, value }: any) => result && data[attr] === value)
    return result
  })
  console.log(idx)
  return { idx, value: existedData[idx] }
}

const findById = (id: string) => {
  return findOne({ id })
}

const update = (item: any) => {
  const existedData = find()
  const { idx: foundIdx } = findById(item.id)
  console.log(foundIdx)
  if (foundIdx === -1) {
    return { error: 'Order Not Found!' }
  }
  console.log(existedData[foundIdx])
  existedData[foundIdx] = item
  fs.writeFileSync(filePath, JSON.stringify([...existedData]))
}

const remove = (id: string) => {
  const existedData = find()
  const { idx: foundIdx } = findById(id)
  if (foundIdx === -1) return { error: 'Order Not Found!' }
  existedData.splice(id, 1)
  fs.writeFileSync(filePath, JSON.stringify([...existedData]))
}

export default {
  init,
  find,
  create,
  findOne,
  findById,
  update,
  remove
}
