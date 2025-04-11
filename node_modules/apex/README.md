# apex

a library for building things


## apex/schema

```
import { Schema } from 'apex/schema';
```

Methods:

`Schema.validate(schema, data)`

validates data against the given schema

`Schema.getPath(schema, data, path)`

returns { schema, value } for the given 'path'

`Schema.get(schema, data, path)`

returns the nested value at 'path'

`Schema.set (schema, data, path, value)`

sets the nested value at 'path'

