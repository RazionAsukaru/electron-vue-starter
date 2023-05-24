import { app } from '@electron/remote'
import fs from 'fs'
import pathModule from 'path'

const filePath = pathModule
  .join(app.getAppPath(), 'technician.json')
  .replace('app.asar', '')

const init = () => {
  if (fs.existsSync(filePath)) return
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify([
        {
          label: 'User 1',
          value: 'User 1'
        }
      ])
    )
  } catch (e) {
    console.error('Failed to create json file')
  }
}

const find = () => {
  const rawdata = fs.readFileSync(filePath)
  return JSON.parse(rawdata)
}
export default {
  init,
  find
}
