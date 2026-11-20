import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PublicLinkData } from "@/components/public/PublicLinkCard";

/**
 * Firestore 컬렉션 경로: users/anonymous/links
 */
export const FIRESTORE_LINKS_PATH = ["users", "anonymous", "links"] as const;

/**
 * Firestore 문서 데이터 형식
 */
export interface FirestoreLinkData {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  badge?: string;
  category?: string;
  isActive: boolean;
  createdAt: unknown;
}

/**
 * users/anonymous/links 컬렉션 참조 반환
 */
export function getLinksCollectionRef() {
  return collection(db, ...FIRESTORE_LINKS_PATH);
}

/**
 * Firestore Timestamp / Date / number를 millisecond 타임스탬프로 변환
 */
export function parseTimestamp(val: unknown): number {
  if (!val) return 0;
  if (typeof (val as { toMillis?: () => number }).toMillis === "function") {
    return (val as { toMillis: () => number }).toMillis();
  }
  if (val instanceof Date) return val.getTime();
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const parsed = new Date(val).getTime();
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * 링크 추가 시 Firestore에 저장하는 함수
 * 경로 : users/anonymous/links
 */
export async function addLinkToFirestore(
  link: Omit<PublicLinkData, "id"> & { id?: string }
): Promise<PublicLinkData> {
  const colRef = getLinksCollectionRef();

  // Firestore는 undefined 필드를 허용하지 않으므로 데이터 정제
  const docData: Record<string, unknown> = {
    title: link.title.trim(),
    url: link.url.trim(),
    icon: link.icon || "globe",
    category: link.category || "repo",
    isActive: link.isActive ?? true,
    createdAt: serverTimestamp(),
  };

  if (link.description && link.description.trim()) {
    docData.description = link.description.trim();
  }

  if (link.badge && link.badge.trim()) {
    docData.badge = link.badge.trim().toUpperCase();
  }

  const docRef = await addDoc(colRef, docData);

  return {
    id: docRef.id,
    title: link.title.trim(),
    url: link.url.trim(),
    description: link.description?.trim() || undefined,
    icon: link.icon || "globe",
    badge: link.badge?.trim().toUpperCase() || undefined,
    category: link.category || "repo",
    isActive: link.isActive ?? true,
    createdAt: Date.now(),
  };
}

/**
 * Firestore(users/anonymous/links)에서 저장된 링크 목록 조회 (createdAt 기준 최신순 정렬)
 */
export async function getLinksFromFirestore(): Promise<PublicLinkData[]> {
  const colRef = getLinksCollectionRef();
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const items: PublicLinkData[] = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    const createdTime = parseTimestamp(data.createdAt);

    return {
      id: docSnap.id,
      title: (data.title as string) || "",
      url: (data.url as string) || "",
      description: (data.description as string) || undefined,
      icon: (data.icon as string) || "globe",
      badge: (data.badge as string) || undefined,
      category: (data.category as string) || "repo",
      isActive: (data.isActive as boolean) ?? true,
      createdAt: createdTime || Date.now(),
    };
  });

  // 클라이언트 측 최신순(createdAt 내림차순) 정렬 보장
  items.sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0));

  return items;
}

/**
 * Firestore(users/anonymous/links) 실시간 변경사항 구독 (createdAt 기준 최신순 정렬)
 */
export function subscribeToLinks(
  onUpdate: (links: PublicLinkData[]) => void,
  onError?: (error: Error) => void
): () => void {
  const colRef = getLinksCollectionRef();
  const q = query(colRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const items: PublicLinkData[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const createdTime = parseTimestamp(data.createdAt);

        return {
          id: docSnap.id,
          title: (data.title as string) || "",
          url: (data.url as string) || "",
          description: (data.description as string) || undefined,
          icon: (data.icon as string) || "globe",
          badge: (data.badge as string) || undefined,
          category: (data.category as string) || "repo",
          isActive: (data.isActive as boolean) ?? true,
          createdAt: createdTime || Date.now(),
        };
      });

      // 클라이언트 측 최신순(createdAt 내림차순) 정렬 확정
      items.sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0));

      onUpdate(items);
    },
    (err) => {
      console.error("[Firestore subscribeToLinks Error]", err);
      onError?.(err);
    }
  );

  return unsubscribe;
}

/**
 * Firestore(users/anonymous/links)에서 링크 삭제
 */
export async function deleteLinkFromFirestore(linkId: string): Promise<void> {
  const docRef = doc(db, ...FIRESTORE_LINKS_PATH, linkId);
  await deleteDoc(docRef);
}
