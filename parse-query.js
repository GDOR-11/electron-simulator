/** thing I use to memoize the function */
let idk_how_to_name_this = null;
export default function parse_query() {
    if(idk_how_to_name_this != null) return idk_how_to_name_this;

    let query = location.search.substring(1);
    let query_data = {};
    for(let data of query.split("&")) {
        let split = data.split("=");
        query_data[split[0]] = split[1];
    }

    idk_how_to_name_this = query_data;
    return query_data;
}
