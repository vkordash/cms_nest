
export interface ItemMenu {
    id        : number;
    name     : string;
    icon: string;    
    children : ItemMenu[];    
}

export interface IAccess {
    id     : number;    
    full_name : string;
}

export interface IEmployee {
    id : number;
    fullname : string;
    post : string;
}

export interface IMenu {
    id?        : number;
    parent? : number;
    name?     : string;
    icon?: string;
    id_component?: number;
    children? : IMenu[];
    routerlink?: string;
    new_window?:number,
    pn?:number;
    activ?: boolean;
    show_name?: boolean;
    show_dt?: boolean;    
    show_icon?: boolean;  
    last_user?: number;
    last_user_name?: string;
    last_date?: Date ;
    create_date?: Date;
    create_user?: number;
    create_user_name?: string;
    id_site?: number;
}

export interface ITitPhoto {
    id        : number;
    src     : string;
    alt?     : string;
    title?     : string;
    width?: number;
    height?: number;
}

export interface IPage {
    id:number,
    head?:string,
    title?:string,
    text:string,
    date:string,
    photo?: string
    photo_src?:string,
    photo_alt?:string,
    photo_title?:string,
    seo_title?:string,
    seo_description?:string,
    seo_keywords?:string,
    seo_robots?:string,
    seo_canonical?:string,
    seo_opengraph?:string
}

export interface IListPages {
    id    : number,
    head  : string,
    title : string,
    tags : string[],
    date  : Date,
    text  : string,
    photo : string,
    v_len : number,
    photo_src?:string,
    photo_alt?:string,
    photo_title?:string,
    seo_title?:string,
    seo_description?:string,
    seo_keywords?:string,
    seo_robots?:string,
    seo_canonical?:string,
    seo_opengraph?:string
}

export interface IListVideos {
    id    : number;
    head  : string;
    title : string;
    tags : string[];
    date  : Date;
    text  : string;
    photo : string;
    v_len : number
}


export interface IListPhotos {
    id_page : number;
    id_menu? : number;
    src  : string
    alt? : string;
    title? : string;
    width?  : string;
    height? : string;
    path? : string;
    pn? : number;
}

export interface IListDocs {
    id    : number;
    num_doc : string[];
    data_doc : Date;
    name  : string    
}