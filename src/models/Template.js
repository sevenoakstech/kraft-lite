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
		code: {
			type: Schema.Types.String,
			required: true,
		},
		name: {
			type: Schema.Types.String,
			required: true,
		},
		version: {
			type: Schema.Types.String,
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId, //
			ref: "User",
		},
		properties: {},
	}),
};

mongoose.models = {};

var Model = mongoose.model(model.name, model.schema);

export default Model;
