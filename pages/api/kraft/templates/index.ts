import connectDB from "../../../../src/middleware/mongodb";
import kraftDB from "../../../../src/models";

import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

type ResponseData = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
	console.log("getList::req.body", req.body);
	console.log("getList::req.query", req.query);
	console.log("getList::req.method", req.method);
	// Check if name, email or password is provided
	let userData = {
		name: faker.person.firstName(),
		username: faker.number.int({ min: 26000, max: 29000 }),
	};
	let user = await kraftDB.User.create(userData);
	// console.log("user", user);

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
				let templateData = {
					code: faker.string.alphanumeric({ length: { min: 5, max: 10 }, casing: "upper" }),
					name: faker.location.country(),
					version: `${faker.number.int({ max: 100 })}`,
					properties: {
						dataSource: "node-be://localhost:3030/api/app/application-details",
						filter: { status: 0 },
						fields: ["application_id", ["status", "status_id"]],
					},
					createdBy: user._id,
				};

				let template = await kraftDB.Template.create(templateData);
				// console.log("template", template);

				return res.status(200).send(await kraftDB.Template.find(/* { username: "27991" } */).lean());
				break;
		}
	} catch (error: any) {
		return res.status(500).send(error);
	}
};

export default connectDB(handler);
