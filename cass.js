// docker run --name scylla-seed --hostname scylla-seed -p9042:9042 -d scylladb/scylla 

const cassandra = require('cassandra-driver');
const Uuid = require('cassandra-driver').types.Uuid;
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'jpp_core' });

const query = 'SELECT * FROM grant_standard_history WHERE tx_id = ? and tx_time = ? and tx_type = ? ALLOW FILTERING';
async function main() {

    const res = await client.execute(query, [ Uuid.random(), new Date('2018-06-14 13:22:07+0000'), 'std' ]);
    console.log(res.rows);
}
main();