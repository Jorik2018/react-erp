export const contactFilter = (contactArr:{name?:string,email?:string,phone?:string}[], 
    searchTerm:string) => {

    if(!searchTerm) return contactArr;

    const searchTermLower:string = searchTerm.toLowerCase();

    return contactArr.filter((contact:{name?:string,email?:string,phone?:string}) => {

        if(contact.name) {
            if(contact.name.toLowerCase().includes(searchTermLower)) return true;
        }

        if(contact.email) {
            if(contact.email.toLowerCase().includes(searchTermLower)) return true;
        }

        if(contact.phone) {
            if(contact.phone.toLowerCase().includes(searchTermLower)) return true;
        }

        return false;
    })

};