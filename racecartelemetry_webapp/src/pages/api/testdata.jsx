// pages/api/testdata.js

import { db } from '@firebaseConfig'; 
import { ref, get } from "firebase/database"; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {

        
      // Create reference to the 'testdata' node
        const dataRef = ref(db, 'CANdata/001');
      
      //Fetch the data once using get
        const snapshot = await get(dataRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val(); //grab JSON data
        res.status(200).json({ data });
      } else {
        res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.error('Error fetching test data:', error);
      console.error('Firebase Database instance:', db);
      res.status(500).json({ error: 'Failed to retrieve data', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
