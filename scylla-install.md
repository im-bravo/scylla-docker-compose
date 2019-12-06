

# update gcc version
https://gist.github.com/xiasenhai/918ab482e584ac1f5b48a8c2f78eab36

cd scylla
git submodule update --init --recursive
sudo ./install-dependencies.sh
./configure.py --mode=release

# relogin 
ninja-build ./build/release/scylla

ninja ./build/release/scylla







# [Centos]
https://gist.github.com/alkavan/6c3dfd51353f88bc831c23248b844681
https://repositories.scylladb.com/scylla/repo/034e7e01c68d4fe4400d48ae53744a7d/centos/scylladb-3.0.repo


# [Ubuntu]

#### Request

https://www.scylladb.com/download/open-source/#binary


```sh
# Set Keys
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 6B2BFD3660EF3F5B
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 17723034C56D4B19

# Scylla 3.1 (recommended)
sudo curl -o /etc/apt/sources.list.d/scylla.list -L http://repositories.scylladb.com/scylla/repo/5aca7050-6324-47a9-b6df-bf95419ffb30/ubuntu/scylladb-3.1-bionic.list

sudo apt-get update
sudo apt-get install scylla

# Set Java to 1.8 release
# see: https://www.scylladb.com/download/open-source/scylla-ubuntu-18-04/
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install -y openjdk-8-jre-headless
sudo update-java-alternatives -s java-1.8.0-openjdk-amd64

# Configure and run Scylla on Ubuntu 18.04
# Configure the /etc/scylla/scylla.yaml file with the following parameters:

# Scylla setup
sudo scylla_setup


# 
nodetool status
cqlsh

# cassandra-stress write -mode cql3 native 


```


# using docker
## ports: 10000 9042 9160 7000 7001
```sh
# install docker
snap install docker
# run 
docker run -d --hostname scylla-seed1 --name scylla-seed1 -p 10000:10000 -p 9042:9042 -p 9160:9160 -p 7000:7000 -p 7001:7001 -p 7199:7199 scylladb/scylla
docker run -d --hostname scylla-node-001 --name scylla-node-001 -p 10000:10000 -p 9042:9042 -p 9160:9160 -p 7000:7000 -p 7001:7001 -p 7199:7199 scylladb/scylla

# remove
# docker rm -f scylla-seed1

# log
docker logs scylla-seed1
# cqlsh
docker exec -it scylla-seed1 cqlsh
docker exec -it scylla-node-001 cqlsh


```





# using docker swarm mode

```sh
# on master node
chengri.a.qi@simba-db-test:~$ docker swarm init
#Swarm initialized: current node (prox53rssep7j091tqoytehb9) is now a manager.
#
#To add a worker to this swarm, run the following command:
#
#    docker swarm join --token SWMTKN-1-3ewsb2yly15uit8o8f8wgc9nba88ab8rwnqax7apwow21fps8e-6xtvwrtwrz2jid441xrqc4vyq 10.138.0.13:2377
#
#To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
#
#chengri.a.qi@simba-db-test:~$ 

# on worker node
#
chengri.a.qi@simba-db-test:~$ docker node ls
#ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
#prox53rssep7j091tqoytehb9 *   simba-db-test       Ready               Active              Leader              19.03.5
#uo2655w0m9kesn1fyrljoolxo     simba-db-usw1a-01   Ready               Active                                  19.03.5
#oydanz932e1qe5ze79j9kb4l4     simba-db-usw1a-02   Ready               Active                                  19.03.5
#ndql8y89drqiyjedo6lzq52wf     simba-db-usw1a-03   Ready               Active                                  19.03.5

netstat -tnplu
```

```sh
# root@simba-db-test:~/scylla-cluster# docker stack deploy --compose-file docker-compose.yml scylladb
# Creating network scylladb_default
# Creating service scylladb_scylla


# docker stack ps scylladb_scylla
docker service ls
docker stack ps scylladb
docker stack ps scylladb_scylla
docker service rm scylladb
docker service rm scylladb_scylla
docker pull scylladb/scylla

docker stack deploy --compose-file docker-compose.yml scylladb
docker stack deploy -c docker-compose.yml scylladb
docker stack deploy -c docker-compose2.yml scylladb
docker stack deploy -c docker-compose3.yml scylladb

docker service scale scylladb_scylla=1
docker -H simba-db-usw1a-02 exec -it sz9jw05ql2ky bash
```

git clone https://github.com/herber523/scylla-cluster.git
cd scylla-cluster/
docker build -t 'scylla' scylla

```
sudo apt install -y \
     apt-transport-https \
     ca-certificates \
     curl \
     software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get -y install docker-ce
sudo usermod -aG docker $USER
sudo service docker restart
```

docker node inspect [OPTIONS] self|NODE [NODE...]
docker node inspect --format='{{ .NetworkSettings.IPAddress }}' swarm-manager

describe keyspaces;
docker inspect --format='{{ .NetworkSettings.IPAddress }}' scylla-seed

docker rm -f $(docker ps -q -a)
docker exec -it $(docker ps -q -a) bash
docker exec -it $(docker ps -q -a) cqlsh
docker logs $(docker ps -q -a) | tail

docker run -d --hostname scylla-seed   --name scylla-seed   -p 9100:9100 -p 10000:10000 -p 9042:9042 -p 9160:9160 -p 7000:7000 -p 7001:7001 -p 7199:7199 scylladb/scylla
docker run -d --hostname scylla-node01 --name scylla-node01 -p 9100:9100 -p 10000:10000 -p 9042:9042 -p 9160:9160 -p 7000:7000 -p 7001:7001 -p 7199:7199 scylladb/scylla --seeds 10.138.0.13 
docker run -d --hostname scylla-node02 --name scylla-node02 -p 9100:9100 -p 10000:10000 -p 9042:9042 -p 9160:9160 -p 7000:7000 -p 7001:7001 -p 7199:7199 scylladb/scylla --seeds 10.138.0.13 


docker exec -it scylladb/scylla supervisorctl start scylla

docker exec -it scylla-seed cqlsh
docker exec -it scylla-node01 cqlsh
docker exec -it scylla-node02 cqlsh


10.138.0.8






