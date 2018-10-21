
export class User {
  public nombre: string;
  public email: string;
  public uid: string;

  constructor(doc: DocObj) {
    this.nombre = doc && doc.nombre || null;
    this.email = doc && doc.email || null;
    this.uid = doc && doc.uid || null;
  }

}

interface DocObj {
  uid: string;
  email: string;
  nombre: string;
}
