export class DataClasses {
}

/**
 * the data clases for the views/component rendering
 */

export class SideNavDetails {
    constructor(
        public name: string,    // name of the router link to display
        public icon: string,    // the material icon name
        public routerLink: string,  // the routing path
    ) {
        // this.name = name;
        // this.icon = icon;
        // this.routerLink = routerLink;
     }
     /** the commented lines (above and below) were required
      *  when the constructor parameters were not public 
      */
    // name:string;
    // icon:string;
    // routerLink:string;

}
