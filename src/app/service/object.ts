export class Todo {
    private _name: string = '';
    private _createDate: Date = new Date();
    private _dueDate: Date = new Date();
    
    constructor(data?: {[key: string]: any}) {
        if(!data) return this;
        this.name = data['_name'];
        this.createDate = new Date(data['_createDate']);
        this.dueDate = new Date(data['_dueDate']);
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value; 
    }

    get createDate(): Date {
        return this._createDate
    }

    set createDate(value: Date)  {
        this._createDate = value
    }

    get dueDate(): Date {
        return this._dueDate;
    }

    set dueDate(value: Date | string) {
        console.log(value)
        this._dueDate =  typeof value == 'string' ? new Date(value) : value; 
    }
}