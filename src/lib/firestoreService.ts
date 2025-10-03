import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ImageData {
  id?: string;
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  uploadedAt: Timestamp;
  metadata?: {
    title?: string;
    description?: string;
    category?: string;
  };
}

const COLLECTION_NAME = 'catalogs';

// Save Cloudinary image data to Firestore
export const saveImageToFirestore = async (imageData: Omit<ImageData, 'id' | 'uploadedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...imageData,
      uploadedAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving image to Firestore:', error);
    return { success: false, error };
  }
};

// Get all images from Firestore
export const getImagesFromFirestore = async (): Promise<ImageData[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('uploadedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ImageData[];
  } catch (error) {
    console.error('Error getting images from Firestore:', error);
    return [];
  }
};

// Delete image from Firestore
export const deleteImageFromFirestore = async (imageId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, imageId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting image from Firestore:', error);
    return { success: false, error };
  }
};

// Delete multiple images from Firestore
export const deleteMultipleImagesFromFirestore = async (imageIds: string[]) => {
  try {
    const deletePromises = imageIds.map(id => deleteDoc(doc(db, COLLECTION_NAME, id)));
    await Promise.all(deletePromises);
    return { success: true };
  } catch (error) {
    console.error('Error deleting multiple images from Firestore:', error);
    return { success: false, error };
  }
};

// Contact form interface
export interface ContactData {
  id?: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

// Save contact form to Firestore
export const saveContactToFirestore = async (contactData: Omit<ContactData, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contact'), {
      ...contactData,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact to Firestore:', error);
    return { success: false, error };
  }
};

// Get all contact submissions from Firestore
export const getContactsFromFirestore = async (): Promise<ContactData[]> => {
  try {
    const q = query(collection(db, 'contact'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactData[];
  } catch (error) {
    console.error('Error getting contacts from Firestore:', error);
    return [];
  }
};
