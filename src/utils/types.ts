interface Item {
  brand?: string;
  code?: string;
  cost: number;
  id: Realm.BSON.UUID;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
}

interface Purchase {
  id: Realm.BSON.UUID;
  date: Date;
  items: PurchaseItem[];
}

interface PurchaseItem {
  cost: number;
  id: Realm.BSON.UUID;
  item: Item;
  quantity: number;
}

interface Sale {
  date: Date;
  id: Realm.BSON.UUID;
  items: SaleItem[];
}

interface SaleItem {
  id: Realm.BSON.UUID;
  item: Item;
  price: number;
  quantity: number;
}

export type { Item, Purchase, PurchaseItem, Sale, SaleItem };
