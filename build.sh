docker build . -t nats-runner-dummy
docker tag nats-runner-dummy marcelcremer/nats-runner-dummy:latest
docker push marcelcremer/nats-runner-dummy:latest