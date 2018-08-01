const removeDiacritics = text => {
    const mapping = {
        'á': 'a',
        'ä': 'a',
        'č': 'c',
        'ď': 'd',
        'é': 'e',
        'í': 'i',
        'ĺ': 'l',
        'ľ': 'l',
        'ň': 'n',
        'ó': 'o',
        'ô': 'o',
        'ŕ': 'r',
        'š': 's',
        'ť': 't',
        'ú': 'u',
        'ý': 'y',
        'ž': 'z',
        ' ': '-'
    }

    return text.toLowerCase().split('').map(character => {
        return character in mapping ?
            mapping[character] :
            character
    }).join('')
}

module.exports = {
    removeDiacritics
}