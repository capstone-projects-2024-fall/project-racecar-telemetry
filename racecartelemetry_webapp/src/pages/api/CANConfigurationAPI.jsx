// pages/api/CANConfigurationAPI.js

import { dbFirestore } from '@firebaseConfig'
import { collection, setDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

// handler (request, response) POST || GET || DELETE
const handler = async (req, res) => {

  if (req.method === 'POST') {

    const { collectionName, data, docId } = req.body;

    if (!collectionName) {
      return res.status(400).json({ message: 'Collection name is required' });
    }

    try {
      const docRef = doc(dbFirestore, collectionName, docId);

      await setDoc(docRef, { ...data });

      res.status(200).json({ message: 'Data saved successfully', docId: docRef.id })
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ message: 'Failed to save data', error: error.message })
    }
  } else if (req.method === 'GET') {

    const { collectionName, docId } = req.query;

    if (!collectionName) {
      return res.status(400).json({ message: 'Collection name is required' });
    }
    try {
      if (docId) {
        // Fetch a specific document
        const docRef = doc(dbFirestore, collectionName, docId);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          res.status(404).json({ message: 'Document not found' });
        } else {
          res.status(200).json(docSnapshot.data());
        }
      } else {
        // Fetch all documents in the collection
        const querySnapshot = await getDocs(collection(dbFirestore, collectionName));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (docs.length === 0) {
          res.status(404).json({ message: 'No documents found' });
        } else {
          res.status(200).json({ data: docs });
        }
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ message: 'Failed to retrieve data', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { collectionName, docId } = req.body;

    try {
      const docRef = doc(dbFirestore, collectionName, docId)
      await deleteDoc(docRef)
      res.status(200).json({ message: 'Config deleted successfully' })

    } catch (error) {
      console.error("Failed to delete config:", error)
      res.status(500).json({ message: 'Failed to delete config', error: error.message })

    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}



export default handler
