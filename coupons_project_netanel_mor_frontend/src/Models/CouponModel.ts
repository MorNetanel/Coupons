import CompanyModel from "./CompanyModel";

class CouponModel{
    public id :number;
    public company:CompanyModel;
    public category:Category;
    public title:string;
    public image:File | FileList | string;
    public startDate :Date;
    public endDate : Date;
    public amount:number;
    public price: number;
    public description:string;



    constructor (id:number,company:CompanyModel,category:Category,title:string,image:File | FileList,startDate:Date,endDate:Date,amount:number,price:number, description:string){
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.description = description;
    }
}


export enum Category {
    FOOD, ELECTRICITY, RESTAURANT, VACATION, OTHER
}

export default CouponModel;