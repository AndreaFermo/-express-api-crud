 function generateSlug (title, array) {

    if (!title || typeof title != "string") {
        throw new Error("kebab-case: il titolo non è presente o non è una stringa");
    } else if (!array) {
        throw new Error("kebab-case: devi passare un array come secondo argomento");
    };

    let slug = title.toLowerCase().trim().replaceAll(" ", "-");

    let counter = 2;
    let myString = slug;
    const mySlugArray = array.map((element) => element.slug.valueOf());

    while (mySlugArray.includes(myString)) {
        myString = `${slug}-${counter}`
        if (!mySlugArray.includes(myString)) {
            slug = myString;
        } else {
            counter++;
        }
    };

    return slug;
};

module.exports = {
    generateSlug
}

