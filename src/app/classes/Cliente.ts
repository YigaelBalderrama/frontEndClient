export class Cliente {
    public constructor(init?: Partial<Cliente>) {
          Object.assign(this, init);
      }
  }