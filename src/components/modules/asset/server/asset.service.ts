import { db } from "@/core/config/firebase/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  DocumentReference,
  addDoc,
} from "firebase/firestore";
import { AssetPayload } from "@/@types/asset.entity";

interface AddAssetProps {
  payload: AssetPayload;
}

const addAsset = async ({
  payload,
}: AddAssetProps): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  const collectionRef = collection(db, "assets");
  console.log(payload);

  try {
    const docRef: DocumentReference = await addDoc(collectionRef, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const createdDoc = await getDoc(docRef);

    if (createdDoc.exists()) {
      return {
        success: true,
        message: `Asset ${payload.title} created successfully`,
        data: { id: docRef.id, ...createdDoc.data() },
      };
    } else {
      return {
        success: false,
        message: "Document was created but no data was found.",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while adding asset",
    };
  }
};

const getAsset = async (
  token: string
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    const assetRef = doc(collection(db, "assets"), token);
    const snapshot = await getDoc(assetRef);

    if (snapshot.exists()) {
      const rawData = snapshot.data();

      const parsedMonthlyPayout: Record<number, bigint> = {};
      for (const [key, value] of Object.entries(rawData.monthly_payout || {})) {
        parsedMonthlyPayout[Number(key)] = BigInt(value as string);
      }

      const asset = {
        ...rawData,
        monthly_payout: parsedMonthlyPayout,
      };

      return {
        success: true,
        message: `Asset ${token} found`,
        data: asset,
      };
    } else {
      return {
        success: false,
        message: `Asset with id ${token} not found`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error fetching asset",
    };
  }
};

const updateAsset = async (
  token: string,
  payload: AssetPayload
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    const assetRef = doc(collection(db, "assets"), token);
    const snapshot = await getDoc(assetRef);

    if (snapshot.exists()) {
      await updateDoc(assetRef, {
        ...payload,
        updatedAt: serverTimestamp(),
      });

      return {
        success: true,
        message: `Asset ${token} updated successfully`,
        data: { id: token, ...payload },
      };
    } else {
      return {
        success: false,
        message: `Asset with id ${token} not found, cannot update.`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error updating asset",
    };
  }
};

export { addAsset, getAsset, updateAsset };
