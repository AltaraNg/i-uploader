import aws from "aws-sdk";
import { NextResponse } from "next/server";
import { queryPromise, pool } from "@/utils/sql";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import mysql from "mysql";

const s3 = new aws.S3({
   accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
   secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
   region: process.env.NEXT_AWS_REGION,
});

export async function POST(request) {
   try {
      const { id, filename, data, custom } = await request.json();

      const path = filename.replace("_url", "");

      const buffer = Buffer.from(data, "base64");
      const key = `${path}/${Date.now().toString()}-${path}.jpg`;

      const result = await s3
         .upload({
            Bucket: process.env.NEXT_AWS_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: "image/jpeg",
            ContentDisposition: "inline",
         })
         .promise();

      const { user } = await getServerSession(authOptions);

      if (
         filename === "other" ||
         filename === "utility_bill_url" ||
         filename === "residence_proof_url"
      ) {
         const documentableType = mysql.escape("App\\Models\\Customer");
         const newDocSql = `INSERT INTO new_documents (user_id, documentable_type, documentable_id, document_type, document_url, status, name) VALUES (${user.id}, ${documentableType}, ${id}, '${custom}', '${result.Key}', 'pending', '${custom}')`;
         await queryPromise(pool, newDocSql);
      } else {
         const sql = `UPDATE documents SET ${filename} = '${result.Key}', user_id = ${user.id} WHERE customer_id = ${id}`;
         const verificationSql = `UPDATE verifications SET ${path} = 1 WHERE customer_id = ${id}`;
         await queryPromise(pool, sql);
         await queryPromise(pool, verificationSql);
      }

      return NextResponse.json({ message: "Requested action successful" });
   } catch (error) {
      return NextResponse.json(
         {
            message: "Internal server error from catch",
            error,
         },
         { status: 500 },
      );
   }
}
