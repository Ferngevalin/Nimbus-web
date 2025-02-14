import sql from "../../postgres";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const query = sql`WITH ins_plan AS (
            INSERT INTO plan (plan_name, est_price_level, plan_sequence)
            VALUES ('test name', 2, 'plan string')
            RETURNING plan_id AS temp_id
        )
        INSERT INTO saved (user_id, plan_id)
        SELECT 'auth0|642c62dc9e6ad19131004860', temp_id FROM ins_plan;`;
        const result = await query;
        // console.log(req.body[0].plan);
        console.log(result);

        res.status(200).json(result);

        // res.status(200).json(location_data);
    } catch (e) {
        console.log(e);

        res.status(500).json("Error occured");
    }
}
