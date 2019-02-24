import Realm from 'realm';
import { Schema,SchemaVersion } from '../models';

export default realm = new Realm({

    path: 'evatracker.realm',
    schema: Schema,
    schemaVersion: SchemaVersion
})

                            