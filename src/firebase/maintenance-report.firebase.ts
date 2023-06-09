import { db } from './connection';
import { collection, addDoc, updateDoc, doc, deleteDoc } from '@firebase/firestore';
import { useCollection } from 'vuefire';
import { MaintenanceReport } from '../interface/maintenance-report.interface';

// here we can export reusable database references
const collectionRef = collection(db, 'maintenanceReport');
const docRef = (id: string) => doc(db, 'maintenanceReport', id);

export const find = () => {
    return useCollection(collectionRef);
};

export const create = async (item: MaintenanceReport) => {
    try {
        const res = await addDoc(collectionRef, {
            ...item,
        });
        console.log('Document written with ID: ', res.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

export const update = async (item: MaintenanceReport) => {
    if (!!!item.id) return;

    try {
        console.log(item);

        await updateDoc(docRef(item.id), {
            ...item,
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

export const remove = async (id: string) => {
    try {
        await deleteDoc(docRef(id));
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};
