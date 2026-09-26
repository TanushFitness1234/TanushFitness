import fs from 'fs';
import path from 'path';
import { logger } from '../../config/logger';

const DATA_DIR = path.join(__dirname, '../../../data');
const DATA_FILE = path.join(DATA_DIR, 'user_rfq_baskets.json');

export interface UserCartEntry {
  items: any[];
  metadata?: any;
  updatedAt: string;
}

class UserCartStorageService {
  private cache: Map<string, UserCartEntry> = new Map();
  private isInitialized = false;

  private ensureInitialized() {
    if (this.isInitialized) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        for (const [key, val] of Object.entries(parsed)) {
          this.cache.set(key, val as UserCartEntry);
        }
      }
    } catch (err) {
      logger.warn('Notice loading user RFQ baskets from disk:', err);
    }
    this.isInitialized = true;
  }

  private persistToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const obj: Record<string, UserCartEntry> = {};
      for (const [key, val] of this.cache.entries()) {
        obj[key] = val;
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8');
    } catch (err) {
      logger.warn('Notice saving user RFQ baskets to disk:', err);
    }
  }

  get(userKey: string): any[] {
    this.ensureInitialized();
    const cleanKey = userKey.trim().toLowerCase();
    const entry = this.cache.get(cleanKey);
    return entry?.items || [];
  }

  save(userKey: string, items: any[], metadata?: any): void {
    this.ensureInitialized();
    const cleanKey = userKey.trim().toLowerCase();
    this.cache.set(cleanKey, {
      items,
      metadata,
      updatedAt: new Date().toISOString(),
    });
    this.persistToDisk();
  }

  delete(userKey: string): void {
    this.ensureInitialized();
    const cleanKey = userKey.trim().toLowerCase();
    this.cache.delete(cleanKey);
    this.persistToDisk();
  }
}

export const UserCartStorage = new UserCartStorageService();
