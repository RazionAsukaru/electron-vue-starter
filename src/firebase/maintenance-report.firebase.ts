import { collection } from '@firebase/firestore';
import { db } from './connection';
import { useCollection } from 'vuefire';
// import { MaintenanceReport } from '../interface/maintenance-report.interface';

// here we can export reusable database references
const ref = collection(db, 'maintenanceReport');

export const find = () => {
    return useCollection(ref);
};

// export const create = (item: MaintenanceReport) => {
//     ref.
// };

/*   const findOne = (filters: any) => {
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
  } */
