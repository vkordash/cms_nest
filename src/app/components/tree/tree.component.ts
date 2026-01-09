import { Component, OnInit, ViewChild } from '@angular/core'; 
import { MenuItem, TreeNode } from 'primeng/api'; 
import { PrimeIcons } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api'; 
import { SiteService } from '../../http.service';
import { IMenu, ItemMenu } from '../../type';
import { TokenService } from '../../services/token.service'

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass'],
  providers: [MessageService,TreeDragDropService],   
})
export class TreeComponent implements OnInit {

    data: TreeNode[] = []; 
    selectedNode: TreeNode | null = null;
   // cols: any[] = []; 
    Menu : ItemMenu[]=[];
    SelectedItem?: any;
    toolsMenu: MenuItem[]=[]; 
    current_menu_id: number = 0;
    preference_show: boolean = false; 
    preference_showAccess: boolean = false;
    visible: boolean = false;
    show_hide: boolean = false;
    openNode: string[]=[];
    
    id : number = 0;
    tp : number = 0;
    search : boolean = false;
    role: any = {};


    constructor(
        private siteService : SiteService,
        private router: Router, 
        private messageService: MessageService, 
        private route: ActivatedRoute,
        private tokenService:TokenService
    )
    { }

    ngOnInit() { 
        
        this.route.queryParams.subscribe(params => {      
            this.id = params['id'];
            this.tp = params['typ'];
            if (params['search']) {
                this.search = true;                
            }                                
        });

        this.getMenu();

        
        this.role = this.tokenService.getRole();
        console.log(this.role);

        this.toolsMenu = [ 
            { 
                label: "Новий",
                command: event => {
                    console.log(this.current_menu_id);
                    this.newItemMenu();                                
                }                
            }, 
            { 
                label: "Властивості",
                command: event => {
                    this.preferenceItem();                    
                }
            },            
            {
                label: "Доступ",
                command: event => {
                    //this.displayMessage(event.item.label)
                    this.preference_showAccess=true;
                }
            },
            { 
                label: "Видалити",
                command: event => {
                    this.deleteItem();                    
                }
            },  
        ]; 
    } 

    displayMessage(mess:any){
        console.log(mess);
    }

    getNodeExpand (id:number, id_component:number) {
        let s = this.siteService.getNodeExpand(id, id_component).subscribe(dataKey => {                         
            this.openNode = [...dataKey];
            this.expandedNode(this.data);
            s.unsubscribe(); 
        }); 
    }


    nodeExpand(event:any) {
        console.log(event);
        this.openNode.push(event.node.key);
        console.log(this.openNode);
       
    }
    nodeCollapse(event:any){
       this.openNode.forEach((_key,i)=>{
            if (event.node.key==_key){
                this.openNode.splice(i,1);
            }
       }) 
       console.log(this.openNode);
    }

    //CLICK NODE
    onNodeSelect(event: any) { 
        this.SelectedItem = event.node;
        console.log(this.SelectedItem);
        var params : any = {'id':event.node.key,'typ':event.node.id_component};
        console.log(params);
        this.router.navigate([event.node.url],{queryParams: params});      
    } 

    getMenu(): void {
        let s = this.siteService.getMenu(0).subscribe(tmenu => {                         
         //   this.Menu = this.convertIcons(tmenu);
            //this.data = [...this.Menu];
            this.data = [...tmenu];
            s.unsubscribe(); 
            if (this.search){
                this.getNodeExpand(this.id, this.tp);
            }
        }); 
    }

    newItemMenu() {
        let s = this.siteService.addMenu(this.current_menu_id).subscribe(itemmenu => {                         
        //  this.getMenu();
           // console.log(itemmenu);
            /*this.Menu = this.convertIcons(tmenu);
            this.data = [...this.Menu];*/
            this.updateNode();
            s.unsubscribe(); 
        });     
        console.log(event);
    }

    convertIcons(menu:ItemMenu[]): ItemMenu[]{
        menu.forEach(function(item:IMenu) {
            console.log(item);
           if (item.activ) {
            switch (item.id_component) {
                case 0:
                    item.icon = PrimeIcons.PLUS;
                    break;
                case 1:
                    item.icon = PrimeIcons.BOOK;
                    break;
                case 2:
                    item.icon = PrimeIcons.LIST;
                    break;
                case 6:
                    item.icon = PrimeIcons.LINK;                            
                    break;
                 case 8:
                     item.icon = PrimeIcons.VIDEO;                            
                     break;
                 case 12:
                     item.icon = PrimeIcons.MEGAPHONE;                            
                     break;    
                default:
                    console.log(`Sorry not icons for tree`, item.id_component);
             }
           }
           else 
                item.icon = PrimeIcons.INFO_CIRCLE;
            
          /* if ((item.children!=undefined) && (item.children?.length!=0)) {
                item.children = this.convertIcons(item.children);                
            }   */             
       });
       return menu;
    }

    onDrop(event: any) {
        console.log(event); 
        console.log('Id node ',event.dragNode.key);
        console.log('New Parent ',event.dropNode.key);   
        let s = this.siteService.dropItemMenu(event.dragNode.key,event.dropNode.key).subscribe(item => {                                    
            s.unsubscribe(); 
        });            
    }

    handleShow(event: any) { 
      
       /* this.messageService.add({ 
            severity: "success", 
            summary: "ContextMenu onShow", 
            detail: "Welcome to GeeksforGeeks"
        }); */
    } 
    handleHide(event : any) { 
       /* this.messageService.add({ 
            severity: "error", 
            summary: "ContextMenu onHide", 
            detail: "Welcome to GeeksforGeeks"
        }); */
    } 
  
    onNodeContextMenuSelect(event : any){
      //  console.log(event);
        this.current_menu_id = event.node.key;
        this.SelectedItem = event.node;
        console.log(this.SelectedItem);
        console.log(this.current_menu_id);
    }

    _Dialog(){    
        this.preference_show=false;
    //    this.getMenu();
        this.updateNode();
      }
    
    _DialogAccess(){    
        this.preference_showAccess=false;
    //    this.getMenu();
    }

    updateNode(): void {
        let s = this.siteService.getTreeItem(this.current_menu_id).subscribe(tmenu => {                         
            console.log(this.SelectedItem);
            console.log(tmenu);            
            this.SelectedItem=tmenu;
            console.log(this.data);
            this.refreshNode(this.data);
            console.log(this.data);
        //    this.handleClick(this.SelectedItem);
            s.unsubscribe(); 
        }); 
    }

    preferenceItem() {
        let s = this.siteService.getMenu(this.current_menu_id).subscribe(itemmenu => {                                    
             s.unsubscribe(); 
         });     
        this.preference_show=true;
        console.log(this.current_menu_id);
    }

    deleteItem():void {
        let s = this.siteService.deleteMenuItem(this.current_menu_id).subscribe(itemmenu => {      
            //this.current_menu_id=0;
            this.SelectedItem.key=this.SelectedItem['parent']['key'];
            this.current_menu_id=this.SelectedItem['parent']['key'];
            this.updateNode();
            s.unsubscribe(); 
        });     
       console.log(this.current_menu_id);
    }

    // Обновляем узел после изменения параметров Menu - preferences
    refreshNode(Nodes:TreeNode[]): void {
        let i=0;
        for (let node of Nodes) {
            if (node.key === this.SelectedItem.key) {
                Nodes[i]=this.SelectedItem;
                Nodes[i]['expanded'] = true;
                var params : any = {'id':this.SelectedItem.key,'typ':this.SelectedItem.id_component};
                console.log(params);
                this.router.navigate([this.SelectedItem.url],{queryParams: params});    
                return ;
            }
            else if (node.children) {
                this.refreshNode(node.children);
            }            
            i++;            
        }
    }
    
    // открываем узлы после поиска
    expandedNode(Nodes:TreeNode[]): void{
        let i=0;
        for (let node of Nodes) {
            for (let o of this.openNode) {
                if (o==node['key']){
                    Nodes[i]['expanded'] = true;
                    this.SelectedItem= Nodes[i];
                 //   this.selection[0]=Nodes[i];
                    this.selectedNode = Nodes[i];
                    this.onNodeSelect({ node: this.selectedNode });
                }
            }    
            
            if (node.children) {
                this.expandedNode(node.children);
            }            
            i++;            
        }        
    }


    /*
    var params : any = {'id':this.SelectedItem.key,'typ':this.SelectedItem.id_component};
                console.log(params);
                this.router.navigate([this.SelectedItem.url],{queryParams: params});    
                return ;
    
    
    */
    
    updateTree(){
        this.data.forEach((node) => {
            this.expandRecursive(node, true);
        });
    }

    changeTreeActiv(){
        console.log(this.show_hide);
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
}
