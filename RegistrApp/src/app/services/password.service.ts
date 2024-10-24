import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar contraseña
  async savePassword(email: string, password: string): Promise<void> {
    await this._storage?.set(email, password);
  }

  // Recuperar contraseña
  async getPassword(email: string): Promise<string | null> {
    return await this._storage?.get(email);
  }

  // Limpiar la contraseña (opcional)
  async removePassword(email: string): Promise<void> {
    await this._storage?.remove(email);
  }
}
