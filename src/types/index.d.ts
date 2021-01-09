import * as mongoose from 'mongoose';

export type Id = mongoose.Schema.Types.ObjectId | string;

export type Ref<T> = T | Id;
