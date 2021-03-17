# Golang Docker

#### DockerHub Image:
```
docker image pull lucasferraricorrrea/mygolang:prod
```

#### Docker Build Image:
```
docker build -t lucasferraricorrea/mygolang:prod . -f Dockerfile.prod 
```

#### Docker Run Container:
```
docker run -it --name golang-app lucasferraricorrea/mygolang:prod
```