export class IngresoEgreso {
  description: string;
  monto: number;
  tipo: string;
  uid?: string;

  constructor(doc) {
    this.description = doc && doc.description || null;
    this.monto = doc && doc.monto || null;
    this.tipo = doc && doc.tipo || null;
    this.uid = doc && doc.uid || null;
  }
}
