import * as admin from 'firebase-admin';
import * as serviceAccount from './cri-public-firebase-adminsdk-2360t-341ccca8d3.json';
import * as fs from 'fs';
import * as path from 'path';
import { ServiceAccount } from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://solis-public.firebaseio.com'
});

const uploadData = async () => {
  const filePath = path.join(__dirname, './product-list.data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const db = admin.firestore();

  const batch = db.batch();

  jsonData.forEach((product: any) => {
    const docRef = db.collection('product').doc(product.id);
    batch.set(docRef, product);
  });

  await batch.commit();
  console.log('Successfully uploaded data to Firebase');
};

uploadData().catch(console.error);