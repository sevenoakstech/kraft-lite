import connectDB from "../../../../src/middleware/mongodb";
import kraftDB from "../../../../src/models";

import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

type ResponseData = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
	/* console.log("req.body", req.body);
	console.log("req.query", req.query);
	console.log("req.method", req.method); */
	// Check if name, email or password is provided
	const { id, field, meta } = req.body;

	try {
		switch (req.method) {
			case "put":
				break;
			case "post":
				break;
			case "patch":
				break;
			case "delete":
				break;
			default:
				if (req.query.id) {
					// let model = (await kraftDB.Template.findOne({ code: "J13TKPGTWZ" })) || {};
					let model = (await kraftDB.Template.findOne({ id: req.query.id })) || {};
					return res.status(200).send(model);
				}

				return res.status(200).send((await kraftDB.Template.find({})) || {});
				break;
		}
	} catch (error: any) {
		return res.status(500).send(error);
	}
};

export default connectDB(handler);
