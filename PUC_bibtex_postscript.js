if (Translator.BetterBibTeX){

    // Changing name of reference Types
    if (reference.referencetype == 'article'){reference.referencetype='Article';}
    if (reference.referencetype == 'book'){reference.referencetype='Book';}
    if (reference.referencetype == 'phdthesis'){
        if (item.type == 'Ph.D. Thesis'){
            reference.referencetype='PhdThesis';
        }
        if (item.type == 'Masters Thesis'){
            reference.referencetype='MastersThesis';
        }
    }

// Making the authors first name abbreviated
    for (var i=0; i < item.creators.length; i++){

        var first_names = item.creators[i].firstName.split(' ');
        var abbrev_names = first_names.map(function(name){
            abbrev = name.charAt(0).toUpperCase().concat('.');
            return abbrev
        })
        var first_name = abbrev_names.join(' ');
        item.creators[i].firstName = first_name;
    }
    reference.addCreators();

// Changing author separation "and" for ";"
    var changed_authors = reference.has['author'];
    changed_authors.bibtex = changed_authors.bibtex.split(' and ').join('; ');
    changed_authors.bibtex = changed_authors.bibtex.replace('{','{\\uppercase{').concat('}');
    reference.has['author'] = changed_authors;

// Changing field order.
// 1) Defining the order
    const order = ['key', 'author', 'title',  'journal', 'school', 'publisher', 'year', 'volume', 'edition',
                    'type', 'pages', 'address'];
// 2) Taking only the items that exist in the reference
    const has_order = order.filter(first => reference.has[first]);
// 3) Getting the items that are not in the array
    const all_order  = has_order.concat(Object.keys(reference.has).filter(other=>!has_order.includes(other)));
// 4) Mapping order to [field, value] array.
    const field_value = all_order.map(f=>[f,reference.has[f]]);

    for (const [field, value] of field_value){
        delete reference.has[field];
        reference.has[field] = value;
    }
}
