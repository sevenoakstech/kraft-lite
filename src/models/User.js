import path from "path";
import _ from "lodash";
import mongoose from "mongoose";
import crypto from "crypto";

const Schema = mongoose.Schema;

export const model = {
	name: path.parse(import.meta.url).name,
	schema: new Schema({
		id: {
			type: Schema.Types.String,
			required: true,
			default: () => crypto.randomUUID(),
		},
		name: {
			type: Schema.Types.String,
			required: true,
		},
		username: {
			type: Schema.Types.String,
			required: true,
		},
	}),
};

mongoose.models = {};

var Model = mongoose.model(model.name, model.schema);

export default Model;
