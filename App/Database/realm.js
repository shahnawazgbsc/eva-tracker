import Realm from 'realm';
import { Schema,SchemaVersion } from '../../src/model';

export default realm = new Realm({

    path: 'evatracker.realm',
    schema: Schema,
    schemaVersion: SchemaVersion
})

                            