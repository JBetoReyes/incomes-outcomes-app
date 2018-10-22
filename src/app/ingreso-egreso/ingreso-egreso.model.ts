export class IngresoEgreso {
  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string;

  constructor(doc) {
    this.descripcion = doc && doc.descripcion || null;
    this.monto = doc && doc.monto || null;
    this.tipo = doc && doc.tipo || null;
  }
}
