const defineKeySearch = (keyword) => {
    let name = {};
    if (keyword) {
        name = {
            name: {
                $regex: keyword,
                $options: 'i'
            }
        }
    }

    return name;
}

const defineEmailSearch = (email) => {
    let emailSearch = {};
    if (email) {
        email.trim().replace("@gmail.com", '');
        emailSearch = {
            email: {
                $regex: email,
                $options: 'i'
            }
        }
    }

    return emailSearch;
}
const filterKeyword = (queryStr) => {
    const queryCopy = { ...queryStr }
    let keySearch = defineKeySearch(queryCopy.keyword);

    //console.log(">>>", queryCopy)
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach(element => delete queryCopy[element]);
    //console.log(">>>", queryCopy)
    //advance filter

    let queries = JSON.stringify(queryCopy);

    queries = queries.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    //console.log(">>>", queries)
    let filterKey = { ...keySearch, ...JSON.parse(queries) }
    console.log(filterKey)
    return filterKey;
}

const pagination = (pageQuery, perPage) => {
    const { page } = pageQuery
    const currentPage = Number(page) || 1;
    const skip = perPage * (currentPage - 1);

    return { currentPage, skip };
}

module.exports = {
    defineKeySearch,
    filterKeyword,
    pagination,
    defineEmailSearch
}