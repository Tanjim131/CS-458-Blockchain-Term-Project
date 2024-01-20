
export default function byteToMB(size) {
  const fileSize = parseInt(size, 10);
  return (fileSize / 1024 / 1024).toFixed(3);
}

