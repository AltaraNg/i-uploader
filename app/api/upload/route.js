import aws from "aws-sdk";
import { NextResponse } from "next/server";
import { queryPromise, pool } from "@/utils/sql";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const s3 = new aws.S3({
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
    region: process.env.NEXT_AWS_REGION,
});

export async function POST(request) {
    try {
        const { id, filename, data } = await request.json();
        const path = filename.replace("_url", "")

        const buffer = Buffer.from(data, "base64");
        const key = `${path}/${Date.now().toString()}-${path}.jpg`;

        const result = await s3
            .upload({
                Bucket: process.env.NEXT_AWS_BUCKET_NAME, Key: key, Body: buffer, ContentType: 'image/jpeg',
                ContentDisposition: 'inline'
            })
            .promise();

        const { user } = await getServerSession(authOptions);

        const sql = `UPDATE documents SET ${filename} = '${result.key}', user_id = ${user.id} WHERE customer_id = ${id}`;
        await queryPromise(pool, sql);
        return NextResponse.json({ message: "Requested action successful" });
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error from catch",
            error,
        }, { status: 500 });
    }
}
