# cd zapp-components
# npm run build
# cd ..
cd zapp-iframe
bun run build
cd ..
podman build -t ghcr.io/zeuswpi/zapp:latest .
podman push ghcr.io/zeuswpi/zapp:latest
