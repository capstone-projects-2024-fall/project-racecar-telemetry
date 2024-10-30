// pages/api/dataAssignmentAPI.js

import { dbFirestore } from '@firebaseConfig'
import { collection, addDoc, getDoc } from "firebase/firestore"

// handler (request, response) only POST and GET 
const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { data, collectionName } = req.body

        try {
            const docRef = await addDoc(collection(dbFirestore, collectionName || "dataAssignment"), {
                ...data,
            })
            res.status(200).json({ message: 'Data saved successfully', docId: docRef.id })
        } catch (error) {
            console.error("Error retrieving data:", error);
            res.status(500).json({ message: 'Failed to save data', error: error.message })
        }
    } else if (req.method === 'GET') {
        const { collectionName } = req.query

        try {
            const querySnapshot = await getDocs(collection(dbFirestore, collectionName || "dataAssignments"))
            const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            if (docs.length === 0) {
                res.status(404).json({ message: 'No documents found' });
            } else {
                res.status(200).json({ data: docs });
            }

        } catch (error) {
            console.error("Error retrieving data:", error)
            res.status(500).json({ message: 'Failed to retrieve data', error: error.message })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}

export default handler
