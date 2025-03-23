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
  query,
  where,
  getDocs,
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
    console.error(error);
    return {
      success: false,
      message: error.message || "Something went wrong while adding asset",
    };
  }
};

const getAssetsByUser = async (
  role: "client" | "asset_provider",
  address: string
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  const collectionRef = collection(db, "assets");

  try {
    if (!["client", "asset_provider"].includes(role)) {
      throw new Error("Invalid role specified");
    }

    const assetsCollectionSnapshot = await getDocs(
      query(collectionRef, where(role, "==", address))
    );

    const assets = assetsCollectionSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log(assets);

    if (assets.length === 0) {
      return {
        success: false,
        message: `No assets found for role ${role} with address ${address}`,
      };
    }

    return {
      success: true,
      message: "Assets retrieved successfully",
      data: assets,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error fetching asset",
    };
  }
};

export { addAsset, getAssetsByUser };
