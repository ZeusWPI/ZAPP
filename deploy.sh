cd zapp-components
npm run build
cd ..
docker build -t ghcr.io/zeuswpi/zapp:latest .
docker push ghcr.io/zeuswpi/zapp:latest
