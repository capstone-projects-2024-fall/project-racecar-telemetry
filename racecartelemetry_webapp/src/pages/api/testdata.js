import { db } from '@firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const snapshot = await getDocs(collection(db, 'Testdata'));
      const testdata = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("test data: " + testdata);

      res.status(200).json({ data: testdata });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve test data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
