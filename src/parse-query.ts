/** thing I use to memoize the function */
let saved_query_data: any = null;
export default function parse_query(): any {
    if(saved_query_data != null) return saved_query_data;

    let query = location.search.substring(1);
    let query_data: any = {};
    for(let data of query.split("&")) {
        let split = data.split("=");
        query_data[split[0]] = split[1];
    }

    saved_query_data = query_data;
    return query_data;
}
