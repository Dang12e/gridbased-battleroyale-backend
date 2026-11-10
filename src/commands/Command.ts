export abstract class Command{
   readonly id: number;

   constructor(id:number)
   {
    this.id=id;
   }
   public exacute(param: any)
   {

   }

}