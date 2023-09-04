import { NextResponse } from "next/server";
import { queryPromise, pool } from "@/utils/sql";

export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const term = searchParams.get("term");

   try {
      const queryTerm = `'%${term}%'`;
      var sql = `SELECT c.id, c.telephone, CONCAT(c.first_name, ' ', c.last_name) AS full_name, d.id_card_url, d.passport_url, c.email, c.gender, CONCAT(c.add_street, ', ', c.area_address) AS address FROM customers AS c LEFT JOIN documents AS d ON d.customer_id = c.id WHERE first_name LIKE ${queryTerm} OR last_name LIKE ${queryTerm} OR c.id = '${term}' OR c.telephone LIKE ${queryTerm}`;
      const results = await queryPromise(pool, sql);
      return NextResponse.json({
         message: "Requested action successful",
         results,
      });
   } catch (error) {
      return NextResponse.json(
         {
            message: "Internal server error from catch",
            error,
         },
         {
            status: 400,
         },
      );
   }
}
