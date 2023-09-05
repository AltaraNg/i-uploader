import { queryPromise, pool } from "@/utils/sql";

export async function getUser(id) {
    try {
        const sql =
            "SELECT c.id, CONCAT(c.first_name, ' ', c.last_name) AS full_name, d.id_card_url, d.passport_url, c.email, c.gender,  CONCAT(c.add_street, ', ', c.area_address) AS address FROM customers AS c JOIN documents AS d ON d.customer_id = c.id WHERE c.id = " +
            id;
        const results = await queryPromise(pool, sql);
        if (results.length > 0) {
            return results[0];
        }
        return null
    } catch (error) {
        return null
    }
}


export async function getDocuments(id) {
    try {
        const sql =
            "SELECT name, document_url FROM new_documents WHERE documentable_id = " +
            id + " ORDER BY id DESC";
        const results = await queryPromise(pool, sql);
        if (results.length > 0) {
            return results;
        }
        return []
    } catch (error) {
        return []
    }
}
