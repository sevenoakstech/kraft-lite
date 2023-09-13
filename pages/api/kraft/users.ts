import connectDB from "../../../src/middleware/mongodb";
import kraftDB from "../../../src/models";

const handler = async (req: any, res: any) => {
	if (req.method === "POST") {
		// Check if name, email or password is provided
		const { name, email, username } = req.body;
		if (name && email && username) {
			try {
				var user = new kraftDB.User({
					name,
					email,
					username,
				});
                user = await user.save();

				return res.status(200).send({ user: kraftDB.User.find({}) });
			} catch (error: any) {
				return res.status(500).send(error.message);
			}
		} else {
			res.status(422).send("data_incomplete");
		}
	} else {
		res.status(422).send("req_method_not_supported");
	}
};

export default connectDB(handler);
