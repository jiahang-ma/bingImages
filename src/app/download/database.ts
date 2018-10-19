import { hostConfig } from '../config/config';
import { MongoClient } from 'mongodb';

MongoClient.connect(hostConfig.hostname, (err, db) => {
    if (err) throw err;
    console.log('数据库已创建!');
    db.close();
})