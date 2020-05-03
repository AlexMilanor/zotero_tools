

function compare(itemA, itemB){
    
    var nameA = itemA.getField('title');
    var nameB = itemB.getField('title');

    if (nameA.toLowerCase() < nameB.toLowerCase()){return -1;}

    if (nameA.toLowerCase() > nameB.toLowerCase()){return 1;}

    return 0;

}

Zotero.NumberingRef = {
    
    run: async function(ZoteroCollection){
        
        var items = ZoteroCollection.getChildItems();

        items = items.sort(compare);    

        for (var i=0; i<items.length; i++){

            var n=i+1;

            items[i].setField('callNumber',String(n));

        }

        var altered_items = [];
        
        for (var i=0;i<items.length;i++){

            var title = items[i].getField('title');

            var number = items[i].getField('callNumber');

            var title_and_number = number.concat('-').concat(title);

            altered_items.push(title_and_number);
        }
        
        alert(altered_items)

    }
}


