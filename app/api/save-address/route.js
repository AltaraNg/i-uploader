import { NextResponse } from "next/server";
import { queryPromise, pool } from "@/utils/sql";


export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('term');

    try {
        const { id, add_street, add_addinfo_description } = await request.json();

        var sql =
        `UPDATE customers SET add_street = '${add_street}', add_addinfo_description = '${add_addinfo_description}', add_houseno = '', add_nbstop = '', city = '', state = '' WHERE id = ${id}`;
        const results = await queryPromise(pool, sql);
        return NextResponse.json(
            {
                message: "Requested action successful",
                results,
            }
        );
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error from catch",
            error,
        }, {
            status: 400,
        });
    }
}
